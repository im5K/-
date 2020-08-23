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
    login = (e) => {
        // 阻止事件默认行为(不提交表单)
        e.preventDefault()
    

    const form = this.props.form;
    console.log();
        

    }

    render() {

       
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>

                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username',{})( <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名" />)
                            }
                           
                         
                            
                           
                        </Item>
                        <Item>
                            {getFieldDecorator("password",{})(<Input prefix={<Icon type="lock" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password" placeholder="密码" />)}
                            
        
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

//1.高阶函数和2.高阶组件
//2.本质上是一个函数
// 包装Form组件生成一个新的组件
//父组件给子组件传递了新的功能
// 
const WrapLogin = Form.create()(Login)
export default WrapLogin
// 1.前台表单验证
// 2.收集表单输入数据
