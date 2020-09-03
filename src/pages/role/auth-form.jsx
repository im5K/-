import React, { Component } from 'react'
import { Form, Select, Input, Tree } from 'antd'
import PropTypes from "prop-types"
import menuList from '../../config/menuconfig'


const Item = Form.Item
const Option = Select.Option
const { TreeNode } = Tree

export default class AuthForm extends Component {
    
    static propTypes = {
        role: PropTypes.object
    }
    
constructor (props) {
    super(props)
    //只有第一次产生，需要在更新才出现
    const {menus} = this.props.role
    this.state = {
        checkedKeys:menus
    }
}   
    //为父组件获取最新menus的方法
    getMenus = () => this.state.checkedKeys

    getTreeNodes=(menuList) => {
        return menuList.reduce((pre,item)=>{
            pre.push(<TreeNode title={item.title} key={item.key} >
                {item.children?this.getTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }
    //选中某个node进行回调
    onCheck  = (checkedKeys)=> {
        this.setState({checkedKeys})

    }
    componentWillMount(){
        this.TreeNodes = this.getTreeNodes(menuList)
    }
    //组件接收到新的属性自动调用,第一次不用调用
    componentWillReceiveProps(nextprops){
       const menus =  nextprops.role.menus
       this.setState({
           checkedKeys:menus
       })
    }
    render() {

        const { role } = this.props
        console.log(role)
        const {checkedKeys} = this.state
        console.log("checkedkeys",checkedKeys)
       
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },
        }



        return (
            <div>
                <Item label="角色名称" {...layout}>

                    <Input initialValue='说啥呢' placeholder='请输入角色名称' disabled></Input>
                    <Tree title='平台权限' key='all'
                        checkable
                        defaultExpandAll={true}
                        checkedKeys={checkedKeys}
                        onCheck={this.onCheck}>
                       
                        {this.TreeNodes}
                    </Tree>

                </Item>
            </div>
        )
    }
}



