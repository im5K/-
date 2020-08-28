import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from "prop-types"
const Item = Form.Item
const Option = Select.Option
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categorys: PropTypes.array.isRequired,//一级分类列表
        parentId: PropTypes.array.isRequired,
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        
        const { getFieldDecorator } = this.props.form
        const {categorys,parentId} = this.props


        return (
            <Form>
                <Item>
                    {getFieldDecorator("parentId", { initialValue: parentId })(
                        <Select>
                            <Option value='0'>一级分类</Option>
                            {
                                categorys.map(c=><option value={c._id}>{c.name}</option>)
                            }
                        </Select>
                    )}

                </Item>
                {
                    getFieldDecorator("categoryName", { 
                        initialValue: '' ,
                        rules: [
                            { required: true, message: '必须输入分类名称' },
                            
                        ],}
                    )(
                        <Input placeholder='请输入分类名称'></Input>
                    )
                }

            </Form>
        )
    }
}



export default Form.create()(AddForm) 