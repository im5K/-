import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from "prop-types"
/*
添加和修改用户的form
*/


const Item = Form.Item
const Option = Select.Option
class UserForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired,
       
    }
    componentWillMount(){
    this.props.setForm(this.props.form)
    }
    render() {
        const {roles} = this.props
        const user = this.props.user||{}
        const layout = {
            labelCol :{span:4},
            wrapperCol: {span: 15},
        }
        
        const { getFieldDecorator } = this.props.form 


        return (
            <Form  {...layout}>
                <Item label="用户名">
                {
                    getFieldDecorator("username", { 
                        initialValue: user.username ,
                        
                        rules: [
                            { required: true, message: '必须输入用户名称' },
                            
                        ],}
                    )(
                        <Input  placeholder='请输入用户'></Input>
                    )
                }
                </Item>
                {user._id?null: 
                <Item label="密码">
                {
                    getFieldDecorator("password", { 
                        initialValue: user.password ,
                        
                        rules: [
                            { required: true, message: '必须输入密码' },
                            
                        ],}
                    )(
                        <Input  type = 'password' placeholder='请输入密码'></Input>
                    )
                }
                </Item>}
               
                <Item label="手机号">
                {
                    getFieldDecorator("phone", { 
                        initialValue: user.phone ,
                        
                        }
                    )(
                        <Input  placeholder='请输入密码'></Input>
                    )
                }
                </Item>
                <Item label="邮箱">
                {
                    getFieldDecorator("email", { 
                        initialValue: user.email ,
                        
                        }
                    )(
                        <Input  placeholder='请输入邮箱'></Input>
                    )
                }
                </Item>
                <Item label="角色">
                {
                    getFieldDecorator("role_id", { 
                        initialValue: user.role_id ,
                        
                        }
                    )(
                        <Select>
                            {roles.map(role =><Option key ={role._id} value={role._id}>{role.name}</Option>)}
                        </Select>
                    )
                }
                </Item>
            </Form>
        )
    }
}



export default Form.create()(UserForm) 