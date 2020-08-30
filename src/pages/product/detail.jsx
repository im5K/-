
import React, {Component} from 'react'
import { Card, Icon, List} from 'antd'
import LinkButton from '../../components/link-button'
import {BASE_IMG_URL} from "../../utils/constants.js"
import {reqCategory} from "../../api/index.js"
/*
Product的详情子组件
*/
export default class ProductDetail extends Component{

    state={
        cName1: '',//一级分类名称
        cName2: '',//二级分类名称
    }
    async componentDidMount(){
        const {pCategoryId, categoryId} = this.props.location.state.product
        if(pCategoryId==='0'||null){//一级分类下商品
            console.log(pCategoryId,categoryId)
            const result = await reqCategory(categoryId)
            console.log(result.data)
            const cName1 = result.data.name
            this.setState({cName1})
        } else {//二级分类下商品
            /*
           const result1 = await reqCategory(pCategoryId)//请求一级分类
           const result2 = await reqCategory(categoryId)//请求二级分类
        //通过多个await 后一个在前一个成功后返回
        */
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
          
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
           this.setState({
               cName1,
               cName2
            })

        }
    }
    render(){
       const {name,desc,price,detail,imgs} = this.props.location.state.product
       const {cName1, cName2} =this.state
        const title = (
            <span>
                
                <LinkButton>
                <Icon type="arrow-left" 
                style={{color:"green",marginRight: 15,fontSize: 20}}
                onClick={this.props.history.goBack}
                />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return(
           <Card title={title} className='product-detail'>
               <List>
                   <List.Item>
                       <span className='left'>商品名称:</span>
                       <span>{name}</span>
                   </List.Item>
                   <List.Item>
                       <span className='left'>商品描述:</span>
                       <span>{desc}</span>
                   </List.Item>
                   <List.Item>
                       <span className='left'>商品价格:</span>
                       <span>{price}</span>
                   </List.Item>
          
                   <List.Item>
                   <span className='left'>所属分类:</span>
        <span>{cName1} {cName2?('-->'+cName2):''}</span>
                   </List.Item>
                   <List.Item>
                   <span className='left'>商品图片:</span>
                   <span>{
                            imgs.map(img => (
                                <img className="product-img" src={BASE_IMG_URL+img} alt='img'/>
                            ))
                        }
                        </span>    
                   </List.Item>
                   <List.Item>
                   <span className='left'>商品详情:</span>
                       <span dangerouslySetInnerHTML={{__html:detail}}></span>
                   </List.Item>
               </List>

           </Card>
        )
    }
}