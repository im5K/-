
import React, {Component} from 'react'
import { Card, Icon, List} from 'antd'

/*
Product的详情子组件
*/
export default class ProductDetail extends Component{
    render(){
        const title = (
            <span>
                <Icon type="arrow-left"/>
                <span>商品详情</span>
            </span>
        )
        return(
           <Card title={title} className='product-detail'>
               <List>
                   <List.Item>
                       <span className='left'>商品名称:</span>
                       <span>打酱油</span>
                   </List.Item>
                   <List.Item>
                       <span className='left'>商品描述:</span>
                       <span>打酱油</span>
                   </List.Item>
          
                   <List.Item>
                   <span className='left'>所属分类:</span>
                       <span>电脑笔记本</span>
                   </List.Item>
                   <List.Item>
                   <span className='left'>商品图片:</span>
                   <span>
                        <img className="product-img"
                        src='http://localhost:5000/upload/image-1598629649825.jpg'/>
                        <img className="product-img"
                        src='http://localhost:5000/upload/image-1598629686381.jpg'/>
                   </span>
                        
                   </List.Item>
                   <List.Item>
                   <span className='left'>商品详情:</span>
                       <span dangerouslySetInnerHTML={{__html:'<Button>哈哈哈哈2</Button>'}}></span>
                   </List.Item>
               </List>

           </Card>
        )
    }
}