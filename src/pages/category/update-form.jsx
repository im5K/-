import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
class UpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired
    }
    render() {
        const {categoryName} = this.props 
        const { getFieldDecorator } = this.props.form

        return (

            <Form>
                
                {
                    getFieldDecorator("categoryName", { initialValue: categoryName })(
                        <Input placeholder='请输入分类名称'></Input>
                    )
                }

            </Form>
        )
    }
}



export default Form.create()(UpdateForm) 