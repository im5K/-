import React,{Component} from 'react'
import {Link} from "react-router-dom"
import {Menu,Icon} from "antd"

import './index.less'
import logo from '../../assets/images/logo.png'

const SubMenu = Menu.SubMenu
export default class LeftNav extends Component{
    render(){
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>我的后台</h1>
                </Link>
            <Menu
           
            mode = 'inline'
            theme='dark'
           
            >
                <Menu.Item key="1">
                <Icon type ='pie-chart'/>
                <span>首页</span>
                </Menu.Item>
                <SubMenu
                key="sub1"
                title={
                    <span>
                        <Icon type="mail"/>
                        <span>商品</span>
                    </span>
                }
                >
                <Menu.Item key="5">
                        Icon type="mail"/>
                        <span>品类管理</span>
                </Menu.Item>
                <Menu.Item key="6">
                <       Icon type="mail"/>
                        <span>品类管理</span>
                </Menu.Item>
                <Menu.Item key="7">OPtion 7</Menu.Item>
               </SubMenu>
            </Menu>
           
                
            </div>
        )
        
    }
}