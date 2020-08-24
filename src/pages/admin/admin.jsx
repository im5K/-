import React ,{Component} from "react"
import { Redirect } from "react-router-dom"
import {Layout} from 'antd'

import memoryUtils from "../../utils/memoryUtils"
import LeftNav from "../../components/left-nav"
 import Header from "../../components/header"

const{Footer,Sider,Content}=Layout

export default class Admin extends React.Component{

    render(){
        const user = memoryUtils.user
        //如果内存没有user ==>当前没有登录
        if(!user||!user._id){
            //自动跳转到登录
            return <Redirect to ="/login"></Redirect>
        }
        return(
            <Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
            <Header>Header</Header>
            <Content style={{backgroundColor: "white"}}>Content</Content>
            <Footer style={{textAlign: "center",color: "#cccccc"}} >推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
            </Layout>
        )
    }
}