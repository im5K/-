import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import  {Modal} from 'antd'

import {formateDate} from "../../utils/dateUtils"
import memoryUtils from "../../utils/memoryUtils.js"
import storageUtils from "../../utils/storageUtils.js"
import{reqWeather} from "../../api/index.js" 
import menuList from '../../config/menuconfig'
import "./index.less"
import LinkButton from '../link-button'
class Header extends Component{
    state={
        currentTime: formateDate(Date.now()),
        weather: "",
    }
    getTime=()=>{
      this.IntervalId = setInterval(()=>{
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
    logout = () => {
        Modal.confirm({
        content: '确定退出吗?',
        onOk: () => {
        console.log('OK')
        // 移除保存的user
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
        }
        })
    }

    /*
    第一次执行render之后
    一般在此执行异步操作：发ajax请求定时器
    */
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    /*
    当前组件卸载之前调用
    */
    componentWillUnmount(){
    //清楚定时器
    clearInterval(this.IntervalId)
    }
    render(){
        const {currentTime,weather}=this.state
        const username = memoryUtils.user.username;
        const title = this.getTitle();//每次更新都要用，不能放在render中
        
        return (
            <div className="header">
              <div className='header-top'>
                  <span>欢迎，{username}</span>
                  <LinkButton href="javascript:" onClick={this.logout}>退出</LinkButton>
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