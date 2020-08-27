import React, {Component} from 'react'
import { Card, Icon, Button, Table, message } from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategorys} from "../../api"
export default class Category extends Component{
    state = {
        loading:false,
        categorys:[ ],//一级分类列表


    }
 //初始化table所有列的数组
 initColumns=()=>{
    this.columns = [
        {
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '操作',
          width:300,
          render: ()=>(
              <span>
                  <LinkButton>修改分类</LinkButton>
                  <LinkButton>查看子分类</LinkButton>

              </span>
          )
        },
     
      ];

 }
 //为第一次render准备数据
    componentWillMount(){
        this.initColumns();
       
    }
    //执行异步任务
    componentDidMount(){
        this.getCategorys();
       
    }
    getCategorys = async () =>{
        //发请求前loading
        this.setState({loading:true})
        //发异步ajax请求，获取数据
        const result =await reqCategorys('0')
        //完成后，隐藏loading
        this.setState({loading:false})
        if(result.status===0){
                const categorys = result.data
                //更新状态
               

                this.setState({categorys})
        } else {
            message.error('获取分类列表失败')
        }

    }


    render(){
        //card 左侧
       const title ="一级分类列表"
        //card 右侧
       const extra = (
          
           <Button type='primary'>
               <Icon type="plus"></Icon>
               添加
           </Button>
       )

       const {categorys,loading} = this.state
      
     
      
        return(
            
            <Card title={title} extra={extra} >
                <Table 
                bordered 
                rowKey='_id' 
                loading={loading}
                dataSource={categorys} 
                columns={this.columns} 
                pagination={{defaultPageSize:5,showQuickJumper:true}}/>

            </Card>
        )
    }
}