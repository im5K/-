import React from "react"
//后台管理
import {
    Form,
    Input,
    Icon,
    Button,
    message,
} from 'antd'


import './login.less'
import logo from "./images/logo.png"
import {reqLogin} from '../../api'
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from "../../utils/storageUtils"
import { Redirect } from "react-router-dom"
//不能写在import之前
const Item = Form.Item
class Login extends React.Component {
    login = (e) => {
        // 阻止事件默认行为(不提交表单)
        e.preventDefault()


        this.props.form.validateFields(async (err, values) => {
            if (!err) {
            // 校验成功
            const {username, password} = values
           

                const result = await reqLogin(username,password)
                //console.log('请求成功', username, password,response)
                
                console.log(result)
                if(result.status==0){//登陆成功
                    message.success("登陆成功")
                    const user = result.data//需要保存user

                    memoryUtils.user = user//保存在内存中
                    storageUtils.saveUser(user)//保存到文件(local)中去
                    //replace 和push区别 到了后台不用回去了
                    this.props.history.replace("/")

                }else{//登录失败
                    message.error(result.msg)
                    //跳转

                }

            
        }
           else {
            // 校验失败
            console.log("检验失败",err)
            }
            })

    }
    validator=(rule,value,callback)=>{
        if(!value){
            callback("密码必须输入")
        }else if(value.length<4){
            callback("密码长度不能小于4")
        }else if(value.length>12){
            callback("密码长度不能大于12")

        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("用户名必须是英文、数组或下划线组成")
        }else{
            callback()
        }
    }

    render() {
        //判断用户是否登录
        const user  = memoryUtils.user
        console.log(user)

        if(user&&user._id){
            return <Redirect to="/"/>
        }


        const { getFieldDecorator } = this.props.form
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
                                getFieldDecorator('username', {
                                    //声明式验证，使用说明好的规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '必须输入用户名' },
                                        { min: 4, message: '用户名必须大于4 位' },
                                        { max: 12, message: '用户名必须小于12 位' },
                                        {
                                            pattern: /^[a-zA-Z0-9_]+$/,
                                            message: '用户名必须是英文、数组或下划线组成'
                                        }
                                    ],
                                    

                                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名" />)
                            }




                        </Item>
                        <Item>
                            {getFieldDecorator("password", {
                                rules:[
                                    {validator:this.validator}
                                ]
                            })(<Input prefix={<Icon type="lock" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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


//async 和await
/*
作用
简化promise对象的使用，不用使用.then指定成功失败的回调函数
以同步编码方式实现异步流程
2.哪里写promise
在返回promise的表达式左侧，想要promise异步执行成功的value数据
3.哪里写async？
await所在最近的函数定义的左侧！
*/
