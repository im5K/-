
import React, {Component} from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table
} from "antd"

import LinkButton from '../../components/link-button'
import {reqProducts} from '../../api/index.js'
import {PAGE_SIZE} from "../../utils/constants.js"
import {reqSearchProducts} from '../../api/index.js'

const Option = Select.Option
/*
默认子路由界面
*/
export default class ProductHome extends Component{
    state ={
        total: 0,//商品的数量
        products: [],//商品数组
        loading: false,
        searchName:'',
        searchType: 'productName'

    }
    //初始化表格列的数组
    initColums=() => {
        this.columns=[
            {
              title: '商品名称',
              dataIndex: 'name',
              
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              
            },
            {
              title: '价格',
              dataIndex: 'price',
              render: (price) => '¥'+price
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (status) => {
                    return(
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
                
              },
              {
                title: '操作',
                width: 100,
                render: (product) => {
                    return(
                        <span>
                            <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
                
              },
              

          ];
          
    }
    //获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.setState({loading: true})
        const {searchName, searchType} = this.state
        let result
        //如果搜索
        if(searchName){
         result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        } else {
          result = await reqProducts(pageNum,PAGE_SIZE)
          console.log("sadas")
        }
        
        this.setState({loading: false})
        if(result.status===0){
            //取出分页数据，显示分页列表
         const {total,list} = result.data
         this.setState({
             total,
             products: list
         })
        }
    }


 
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getProducts(1)
    }
    render(){
      
        //取出状态数据
        const {products, total,loading, searchName, searchType} = this.state
        const title = (
            <span>
                <Select 
                value={searchType} 
                style={{width:150}} 
                onChange={value => this.setState({searchType:value})}>
                    <Option value='productName' >按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字'
                style={{width:150, margin:'0 15px'}} 
                value={searchName}
                 onChange={event => this.setState({searchName:event.target.value})}
                />
                <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra  = (
            <Button type="primary">
                <Icon type='plus'/>
                添加商品
            </Button>
        )
        return(
            <Card  title={title} extra={extra}>
                <Table bordered
                rowKey='_id'
                loading={loading}
                dataSource={products}
                columns={this.columns}
                pagination={{ total,
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange: this.getProducts

                }}
               
                
                />
            </Card>
        )
    }
}