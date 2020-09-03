import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers, reqDeleteUsers, reqAddOrUpdateUser } from '../../api'
import UserForm from './user-form'

export default class User extends Component {
    state = {
        users:[],//所有的用户列表
        roles:[],//所有角色的列表
        isShow: false,//是否显示确认框
    }
    initColumn = () => {
        this.columns =[
            {
                title: '用户名',
                dataIndex:'username'
            },
            {
                title: '邮箱',
                dataIndex:'email'
            },
            {
                title: '电话',
                dataIndex:'phone'
            },
            {
                title: '注册时间',
                dataIndex:'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex:'role_id',
                render:(role_id) => 
                    role_id==undefined ? '':this.roleNames[role_id]
                
            },
            {
                title: '操作',
               render:(user) =>(
                   <span>
                       <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                       <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>

                   </span>
               )
            },
        ]
    }
    initRoleNames=(roles) => {
        /*
        根据role的数组，生成包含所有角色的对象(属性名用角色id)

        */
       const roleNames = roles.reduce((pre,role)=>{
           pre[role._id] = role.name;
           return pre;
       },[])
       //保存起来
       this.roleNames = roleNames
       console.log('rolename',roleNames)
    }
    addOrUpdateUser = async () => {
        this.setState({isShow:false})
        //1.收集数据
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        //如果是更新，需要给user指定_id
       if(this.user){
           user._id = this.user._id
       }
        //2.提交请求
       
        const result = await reqAddOrUpdateUser(user)
        //3.更新列表
        if(result.status===0){
            message.success(`${this.user?'修改':'更新'}用户成功！`)
            this.getUsers()

        }


    }
    getUsers = async () => {
        const result = await reqUsers()
        if(result.status === 0){
           const {users,roles}=result.data
           this.initRoleNames(roles)
           this.setState({users,roles})
           console.log(users)
        }
    }
    /*
    显示添加界面
    */
   showAdd= () => {
       this.user = null //去除this中的user
       this.setState({isShow:true})
   }
    /*
    显示修改界面
    */
   showUpdate =(user) => {
    this.user = user//保存user
    this.setState({isShow:true})

   }
    //删除用户
    deleteUser =(user) => {
        Modal.confirm({
            title: `确认删除${user.username}么？`,
           
            onOk: async ()=>{
              console.log('OK');
             const result = await reqDeleteUsers(user._id)
             if(result.status===0){
                 message.success('删除用户成功')
                 this.getUsers();
                }
             else {message.error('删除用户失败！')}
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    componentWillMount(){
        console.log(this.roleNames)
        this.initColumn()
    }
    componentDidMount(){
        this.getUsers()
    }
    render() {
        const {users,isShow,roles} = this.state
        const user = this.user
        const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
        return (
            <Card title={title}>
                <Table bordered
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    
                    pagination={{
                        defaultPageSize: PAGE_SIZE,

                    }}
                />
                <Modal
                    title={user?'修改用户':'添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {
                       
                        this.setState({
                            isShow: false
                        })
                        this.form.resetFields()

                    }}
                   
                >
                    <div>
                    <UserForm roles={roles} setForm={(form)=>{this.form = form}} user = {user}></UserForm>
                    </div>
                </Modal>
            </Card>
        )
    }
}