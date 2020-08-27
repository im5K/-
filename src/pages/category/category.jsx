import React, { Component } from 'react'
import { Card, Icon, Button, Table, message, Modal } from 'antd'

import LinkButton from '../../components/link-button'
import { reqCategorys } from "../../api"
export default class Category extends Component {
    state = {
        loading: false,
        categorys: [],//一级分类列表
        subCategorys: [],//二级分类列表
        parentId: '0',//当前需要显示的分类列表的parentId
        parentName: '',//当前需要显示的父分类的名字
        showStatus:0,//添加/更新的确认框是否显示，0:都不显示，1显示添加，2:显示修改

    }
    //初始化table所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>
                        {/* 不能直接调用this.subcategory(para)，因为在渲染时就会调用
                        我们希望在点击的时候才使用相应的值 */}
                        {/* 如何向事件回调函数传递参数 ，先定义匿名函数，再再函数调用处理的函数中传递参数*/}
                        {
                            this.state.parentId === '0' ?
                                <LinkButton onClick={() => { this.shwowSubCategorys(category) }}>查看子分类</LinkButton> :
                                null
                        }

                    </span>
                )
            },

        ];

    }

    //获取1或2级分类列表
    getCategorys = async () => {
        //发请求前loading
        this.setState({ loading: true })
        const { parentId } = this.state
        //发异步ajax请求，获取数据
        const result = await reqCategorys(parentId)
        //完成后，隐藏loading
        this.setState({ loading: false })
        if (result.status === 0) {
            //可能是一级也可能是二级的
            const categorys = result.data
            //更新状态
            if (parentId === '0') {
                this.setState({ categorys })

            } else {
                this.setState({ subCategorys: categorys })
            }


        } else {
            message.error('获取分类列表失败')
        }

    }
    //显示二级分类列表
    shwowSubCategorys = (category) => {
        //代码执行完了才更新状态,第二个参数(回调函数)会在重新render之后执行
        this.setState({
            parentId: category._id,
            parentName: category.name,
        }, () => { this.getCategorys() })
        //获取二级分类列表


    }
    showCategorys = () => {
        //代码执行完了才更新状态,第二个参数(回调函数)会在重新render之后执行
        this.setState({
            categorys: [],
            subCategorys: [],
            parentId: '0',
        }, () => { this.getCategorys() })



    }

    // 响应点击取消：隐藏确认框
    handleCancel = () => {
        this.setState({
            showStatus:0
        })
    }
    //显示添加
    showAdd = () => {
        this.setState({
            showStatus:1
        })
    }

    //添加分类
    addCategory = () => {
        console.log("addCategory")
    }
    //显示更新确认框
    showUpdate= () => {
        this.setState({
            showStatus:2
        })
    }
    //更新分类
    updateCategory = () => {
        console.log("updateCategory")
    }

    //为第一次render准备数据
    componentWillMount() {
        this.initColumns();

    }
    //执行异步任务
    componentDidMount() {
        //获取一级分类列表
        this.getCategorys();

    }
    render() {
        //card 左侧
        const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state
        const title = parentId === '0' ? "一级分类列表" : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{ marginRight: 10, color: "grey" }} />
                <span>{parentName}</span>
            </span>
        )
        //card 右侧
        const extra = (

            <Button type='primary' onClick={this.showAdd}>
                <Icon type="plus"></Icon>
               添加
            </Button>
        )




        return (

            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }} />
                {/* 添加分类 */}
                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

            </Card>
        )
    }
}