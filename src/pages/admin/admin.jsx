import React  from "react"
import { Redirect,Route,Switch} from "react-router-dom"
import {Layout} from 'antd'

import memoryUtils from "../../utils/memoryUtils"
import LeftNav from "../../components/left-nav"
import Header from "../../components/header"

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from "../role/role"
import User from '../user/user'
import Pie from '../chart/pie'
import Bar from '../chart/bar'
import Line from '../chart/line'



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
            <Layout style={{minHeight:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
            <Header>Header</Header>
            <Content style={{backgroundColor: 'white', margin: '20px 20px 0',height:"100%"}}>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/category' component={Category}/>
                    <Route path='/product' component={Product}/>
                    <Route path='/role' component={Role}/>
                    <Route path='/user' component={User}/>
                    <Route path='/charts/bar' component={Bar}/>
                    <Route path='/charts/line' component={Line}/>
                    <Route path='/charts/pie' component={Pie}/>
                    {/* {不是请求首页就返回home用redirect} */}
                    <Redirect to='/home' />
                </Switch>
                
            </Content>
            <Footer style={{textAlign: "center",color: "#cccccc"}} >推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
            </Layout>
        )
    }
}