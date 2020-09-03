import React, {Component} from 'react'
import {
    Card,
    Button,
    Table,
    Select,
    Modal,
    message
} from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import create from 'antd/lib/icon/IconFont'
import { render } from 'less'

export default class Role extends Component{
    state= {
        roles:[],
        role:{},
        isShowAdd: false,//是否显示添加界面
        isShowAuth: false,//是否显示权限界面

    }

    constructor (props){
        super(props)
        this.auth = React.createRef()
    }
    onRow = (role) => {
        return {
            onClick: event => {
               
                this.setState({role})
            }
         }
    }
    getRoles = async () => {
        const result = await reqRoles()
        if(result.status===0){
        const roles = result.data
        this.setState({roles})
        }
    }
    
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }
    addRole =() => {
        //1.表单验证收集数据
        this.form.validateFields( async (error,values) => {
            if(!error){
                this.setState({
                    isShowAdd:false
                })
                const {roleName} = values
                this.form.resetFields()
                const result = await reqAddRole(roleName);
                if(result.status==0){
                    message.success("新建角色成功!")
                    // this.getRoles()
                    const role = result.data
                    //更新roles
                    // const roles = this.state.roles
                    // roles.push(role)
                    // this.setState({roles})
                    //基于原本的数据更新
                    this.setState(state => ({
                        roles:[...state.roles,role]
                    }))
                }else {
                    message.error('添加角色失败！')
                }
            }
        })

    }
    //如何将子组件的数据传给父组件
    updateRole = async () => {
        this.setState({isShowAuth:false})
        const {role} = this.state
        const menus  = this.auth.current.getMenus()
        role.menus = menus
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        const result = await reqUpdateRole(role)
        console.log(result)
        if(result.status===0){
            message.success("更新权限成功！")
            this.setState({
                roles:[...this.state.roles]
            })
        }else {
            message.error("更新权限失败！")
        }
    }
    componentWillMount(){
        this.initColumn()
    }
    componentDidMount(){
        this.getRoles()
    }
    render(){
        const {roles,role,isShowAdd,isShowAuth} = this.state
        const title =(
            <span>
                <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>创建角色</Button>
                <Button type='primary' onClick={()=>{this.setState({isShowAuth:true})}}
                disabled={!role._id}>设置角色权限</Button>
            </span>
        )

        return(
            <Card  title={title} >
            <Table bordered
            rowKey='_id'
            dataSource={roles}
            columns={this.columns}
            rowSelection={{type:'radio',selectedRowKeys:[role._id]} }
            onRow={this.onRow}
            pagination={{
                defaultPageSize: PAGE_SIZE,
                
            }}                
            />
             <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={()=>{
                        this.setState({
                            isShowAdd: false
                        })
                        this.form.resetFields()
                    }}
                >
                   <AddForm
                   
                    setForm={(form)=>{this.form=form;console.log(form.getFieldsValue())}}></AddForm>
                </Modal>
                
                <Modal
                    title="设置权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={()=>{
                        this.setState({
                            isShowAuth: false
                        })
                        
                    }}
                >
                   <AuthForm role= {role}
                             ref ={this.auth}
                   
                   
                   ></AuthForm>
                </Modal>
        </Card>
            )
    }
}