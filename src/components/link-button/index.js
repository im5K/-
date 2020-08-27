import React, {Component} from 'react'
import "./index.less"
//函数和类都可以定义组件
/*
外形像链接的按钮
*/
export default function LinkButton(props){
    return <button {...props} className="link-button">{props.children}</button>
}