
import React, {Component} from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from "antd"

import LinkButton from '../../components/link-button'
import {reqProducts} from '../../api/index.js'
import {PAGE_SIZE} from "../../utils/constants.js"
import {reqSearchProducts} from '../../api/index.js'
import {reqUpadateStatus} from '../../api/index.js'

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
    //更新状态
    UpadateStatus= async (productId,status) => {
        const result = await reqUpadateStatus(productId,status)
        if(result.status===0){
            message.success("更新商品成功")
            this.getProducts(this.pageNum)
        }
        
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
                //dataIndex: 'status',
                render: (product) => {
                    const {status,_id} = product
                    console.log(status,_id)
                    return(
                        <span>
                            <Button type='primary'
                            onClick={()=>{this.UpadateStatus(_id,status===1?2:1)}}
                            > 
                            {status===1?'下架':'上架'}
                            </Button>
                    <span style={{color:status===1?'green':'red'}}>{status===1?'在售':'已下架'}</span>
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
        //让其他方法看得见，保存pageNum
        this.pageNum = pageNum
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
            <Button type="primary" onClick={()=>this.props.history.push('/product/addupdate')}>
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