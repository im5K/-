import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

import {formateDate} from "../../utils/dateUtils"
import memoryUtils from "../../utils/memoryUtils.js"
import{reqWeather} from "../../api/index.js" 
import menuList from '../../config/menuconfig'
import "./index.less"
class Header extends Component{
    state={
        currentTime: formateDate(Date.now()),
        weather: "",
    }
    getTime=()=>{
        setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather=async ()=>{
    //
    const weather = await reqWeather('北京')
    this.setState({weather})

    }
    getTitle(){
        const path = this.props.location.pathname;
        let title
        menuList.forEach(item=>{
            if(item.key===path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    /*
    第一次执行render之后
    一般在此执行异步操作：发ajax请求定时器
    */
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    render(){
        const {currentTime,weather}=this.state
        const username = memoryUtils.user.username;
        const title = this.getTitle();//每次更新都要用，不能放在render中
        
        return (
            <div className="header">
              <div className='header-top'>
                  <span>欢迎，{username}</span>
                  <a href="javascript:">退出</a>
              </div>
              <div className="header-bottom">
                  <div className="header-bottom-left">{title}</div>
                  <div className="header-bottom-right">
                      <span>{currentTime}</span>
                      <span> {weather}</span>
                  </div>
              </div>
            </div>
        )
    }
}

export default withRouter(Header)