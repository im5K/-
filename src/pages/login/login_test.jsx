import React from "react"
//后台管理
import {
    Form,
    Input,
    Icon,
    Button,
} from 'antd'


import './login.less'
import logo from "./images/logo.png"
//不能写在import之前
const Item = Form.Item
class Login extends React.Component {
    /*
    登陆
    */
    login = (e) => {
    // 阻止事件默认行为(不提交表单)
    e.preventDefault()
    console.log(this.props.form)
    // 进行表单所有控件的校验
    this.props.form.validateFields(async (err, values) => {
    if (!err) {
    // 校验成功
    const {username, password} = values
    console.log('提交登陆请求', username, password)
    } else {
    // 校验失败
    console.log(err)
    }
    })
    }
    /**
    * 自定义表单的校验规则
    */
    validator = (rule, value, callback) => {
    // console.log(rule, value)
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
    // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
    callback('必须输入密码')
    } else if (length < 4) {
    callback('密码必须大于4 位')
    } else if (length > 12) {
    callback('密码必须小于12 位')
    } else if (!pwdReg.test(value)) {
    callback('密码必须是英文、数组或下划线组成')
    } else {
    callback() // 必须调用callback
    }
}
render() {
const {getFieldDecorator} = this.props.form
return (
<div className='login'>
<header className='login-header'>
<img src={logo} alt="logo"/>
<h1>React 项目: 后台管理系统</h1>
</header>
<section className='login-content'>
<h3>用户登陆</h3>
<Form onSubmit={this.login} className="login-form">
<Item>
{
/*
getFieldDecorator 是一个高阶函数(返回值是一个函数)
getFieldDecorator(标识名称，配置对象)(组件标签) 返回新的标签
经过getFieldDecorator 包装的表单控件会自动添加value 和onChange，数据同步
将被form 接管
*/
getFieldDecorator('username', {
// 根据内置验证规则进行声明式验证
rules: [
{required: true, whitespace: true, message: '必须输入用户名'},
{min: 4, message: '用户名必须大于4 位'},
{max: 12, message: '用户名必须小于12 位'},

]
})(
<Input prefix={<Icon type="user" style={{color:
'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
)
}
</Item>
<Item>
{
getFieldDecorator('password', {
rules: [{validator: this.validator}
]
})(
<Input prefix={<Icon type="lock" style={{color:
'rgba(0,0,0,.25)'}}/>} type="password"
placeholder="密码"/>
)
}
</Item>
<Item>
<Button type="primary" htmlType="submit" className="login-form-button">
登录
</Button>
</Item>
</Form>
</section>
</div>
)
}
}
/*
用户名/密码的的合法性要求
1). 必须输入
2). 必须大于4 位
3). 必须小于12 位
4). 必须是英文、数组或下划线组成
*/
export default Form.create()(Login)