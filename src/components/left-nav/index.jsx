import React,{Component} from 'react'
import {Link, withRouter} from "react-router-dom"
import {Menu,Icon} from "antd"

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuconfig.js'

const SubMenu = Menu.SubMenu
 class LeftNav extends Component{
     //根据menu的数据数组生成标签数组
     //使用map+递归调用
     /*
    getMenuNodes = (menuList)=>{
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                     {this.getMenuNodes(item.children)}   
                    </SubMenu>
                )
            }
        })
    }
    */
    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname
        
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                
                  
                    ))
            }else{
                //更新时需要查找与路径对应
                const CItem = item.children.find(citem=>citem.key===path)
                //如果存在则需要展开
                if(CItem){
                    this.openKey = item.key
                }
                
                pre.push((
                    <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                 {this.getMenuNodes(item.children)}   
                </SubMenu>
                ))
                
            } 

         return pre
        },[])
    }
    //第一次render之前，为第一次render做准备
   componentWillMount(){
       this.menuNodes = this.getMenuNodes(menuList)
   }
    render(){
        //非路由组件不能读取pathname 
        
        const path = this.props.location.pathname
        const openKey = this.openKey
        //会报错
        this.openKey = path
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>我的后台</h1>
                </Link>
            <Menu      
            mode = 'inline'
            theme='dark'
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
            >
               
               {this.menuNodes}
            </Menu>
           
                
            </div>
        )
        
    }
}
//withrouter 是高阶组件
//向包装非路由组件，返回一个组件给与三个新的属性
//变成路由组件
export default withRouter(LeftNav)