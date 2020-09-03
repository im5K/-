import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from "prop-types"



const Item = Form.Item
const Option = Select.Option
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
       
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {

        const layout = {
            labelCol :{span:4},
            wrapperCol: {span: 15},
        }
        
        const { getFieldDecorator } = this.props.form 


        return (
            <Form>
                <Item label="角色名称" {...layout}>
                {
                    getFieldDecorator("roleName", { 
                        initialValue: '' ,
                        
                        rules: [
                            { required: true, message: '必须输入分类名称' },
                            
                        ],}
                    )(
                        <Input  placeholder='请输入角色名称'></Input>
                    )
                }
                </Item>
            </Form>
        )
    }
}



export default Form.create()(AddForm) 