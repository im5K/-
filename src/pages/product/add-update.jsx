
import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button, Icon, message } from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
import {reqAddOrUpdateProduct} from '../../api'

import PicturesWall from  './pictures-wall'
import RichTextEditor from './rich-text-editor'
import Category from '../category/category'
const { TextArea } = Input


/*
产品添加和更新的子路由组件
*/
class ProductAddUpdate extends Component {
    state = {
        options:[],
    };

    constructor (props) {
        super(props)
        this.pw = React.createRef();
        this.editor = React.createRef();
        //创建用来保存ref的容器
    }



    /*
    获取一级/二级分类列表
    async 函数的值是新的promise对象，promise由async的结果来定
    */
   getCategorys = async (parentId) => {
       
    const result = await reqCategorys(parentId)
    
    if(result.status===0) {
    const categorys = result.data
    
    if(parentId==='0') {
    // 根据一级分类数组初始化生成options 数组
    this.initOptions(categorys)
    } else { // 当前得到是二级分类列表

    // 返回二级分类列表(作为async 函数的promise 对象的成功的value 值)
    return categorys
    }
    }

    }
 initOptions = async (categorys) => {
     //根据categorys生成并更新options数组
     const options = categorys.map(c => ({
         value:c._id,
         label:c.name,
         isLeaf:false,//后面再确定是否是叶子节点
     }))
     const {isUpdate,product} = this
     const {pCategoryId,categoryId} = product

     if(isUpdate && pCategoryId!=='0'){
         //获取对应的二级分类列表
         const subCategorys = await this.getCategorys(pCategoryId)
         //生成二级下拉列表的options
         const childOptions = subCategorys.map(c=> ({
            value:c._id,
            label:c.name,
            isLeaf:true,
        }))
        const TargetOption = options.find(option=>option.value==pCategoryId)
        TargetOption.children = childOptions
     }
     //找到对应的一级options
      

     this.setState({
        options
     })
 }

    loadData =async selectedOptions => {
        //得到选择的option
        const targetOption = selectedOptions[0];
        
        //显示loading
        targetOption.loading = true;
        //根据选中分类获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if(subCategorys && subCategorys.length>0){
            const childOptions = subCategorys.map( c=> ({
                value:c._id,
                label:c.name,
                isLeaf:true,
            }))
            targetOption.children = childOptions
            
        } else {
            targetOption.isLeaf = true;
        }
        this.setState({
            options:[...this.state.options]
        })
       
        // load options lazily
        //异步更新列表
      
    };

    submit = () => {
        //如果通过了发送请求
        this.props.form.validateFields( async (error, values) => {
            if (!error) {
                //1.收集数据
                const {name,desc,price,categoryIds}=values
                
                let pCategoryId,categoryId
                if(categoryIds.length===1){
                    pCategoryId='0'
                    categoryId = categoryIds[0]

                }else {
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const imgs = this.pw.current.getImgs()
                const detail = this.editor.current.getDetail()
                console.log(detail)
                const product = {name,desc,price,imgs,detail,pCategoryId,categoryId}
                console.log(product)
                if(this.isUpdate){
                    product._id = this.product._id
                }
                const result =await reqAddOrUpdateProduct(product)
                if(result.status==0){
                    message.success(`${this.isUpdate?'更新':'添加'}商品成功！`)
                   
                }else{
                    message.error(`${this.isUpdate?'更新':'添加'}商品失败！`)
                }
                //如果是更新需要添加_id

                //2.调用接口请求增加和更新
                //3.根据结果提示
                
               

               
                
            }
        })

    }
    validatePrice = (rule, value, callback) => {
        if (value * 1 > 0)
            callback()//验证通过
        callback('价格必须大于0')//验证不通过
    }
    componentDidMount(){
        this.getCategorys('0');
        
    }
    componentWillMount(){
        const product = this.props.location.state
        this.product = product||{}
        //保存是否是更新的标识
        this.isUpdate = !!product
        console.log(this.isUpdate)
        //保存商品，同时避免报错
      
        
    }
    render() {
        const {isUpdate,product} = this
        const {pCategoryId, categoryId,imgs,detail} = product
        
        const categoryIds = [];
        if(isUpdate){
          
        //获取级联分类id
            
            //商品是一级分类的商品
            // 商品是二级分类的
            if(pCategoryId==='0'){
                categoryIds.push(categoryId);
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
               
            
        }
        
      
       
        const formItemLyout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        }

        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' onClick={this.props.history.goBack} ></Icon>
                    <span>{isUpdate?'修改商品':'添加商品'}</span>
                </LinkButton>
            </span>
        )
        const { getFieldDecorator } = this.props.form
        return (
            <Card
                title={title}

            >
                <Form.Item
                    {...formItemLyout}
                    label="商品名称"
                >
                    {

                        getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [
                                { required: true, message: '必须输入' }
                            ]
                        })
                            (<Input placeholder='请输入商品名称' />)
                    }

                </Form.Item>
                <Form.Item
                    {...formItemLyout}
                    label="商品描述"
                >
                    {

                        getFieldDecorator('desc', {
                            initialValue:product.desc,
                            rules: [
                                { required: true, message: '必须输入商品描述' }
                            ]
                        })
                            (<TextArea placeholder='请输入商品描述' autosize={{ minRows: 2, maxRows: 6 }} />)
                    }


                </Form.Item>
                <Form.Item
                    {...formItemLyout}
                    label="商品价格"
                >
                    {

                        getFieldDecorator('price', {
                            initialValue:product.price,
                            rules: [
                                { required: true, message: '必须输入商品价格' },
                                { validator: this.validatePrice }
                            ]
                        })
                            (<Input placeholder='请输入商品价格' type='number' addonAfter='元' />)
                    }


                </Form.Item>
                <Form.Item
                    {...formItemLyout}
                    label="商品分类"
                >
                    {
                    getFieldDecorator('categoryIds', {
                            initialValue: categoryIds,
                            rules: [
                                
                                { required: true, message: '必须输入商品价格' },
                            ]
                        })
                            (<Cascader
                                placeholder='请输入商品价格'
                        options={this.state.options}//
                        loadData={this.loadData}
                        
                    />)
                    }

                </Form.Item>

                <Form.Item
                    {...formItemLyout}
                    label="商品图片"
                >
                    <PicturesWall ref={this.pw} imgs={imgs}/>
                </Form.Item>
                <Form.Item
                     
                    label="商品详情" 
                    labelCol={{ span: 3 }}
                     wrapperCol={{ span: 20 }} 
                >
                    <RichTextEditor ref={this.editor} detail={product.detail}></RichTextEditor>
                </Form.Item>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)

/*
1.子组件调用父组件的方法,使用函数的方式传递给子组件，子组件可以调用
2.父组件调用子组件的方法在父组件通过ref得到子组件标签对象，调用其方法
*/