import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
/*
用来指定商品详情信息的富文本编程器组件
*/
export default class RichTextEditor extends Component {
  
static propTypes = {
    detail: PropTypes.string
}

/*
当输入改变时立即保存状态数据
*/


getDetail = () => {
    const editorState = this.state.editorState
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
}
constructor(props){
    super(props);
    const detail = this.props.detail
    console.log(detail)
    let editorState
    if(detail) { // 如果传入才需要做处理
    const blocksFromHtml = htmlToDraft(detail)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    editorState = EditorState.createWithContent(contentState)
    } else {
    editorState = EditorState.createEmpty()
    }
    // 初始化状态
    this.state = {
    editorState
    }
}
//上传函数
uploadImageCallBack =(file) =>{
    return new Promise(
        (resolve,reject) =>{
            const xhr = new XMLHttpRequest()
            xhr.open('POST','/manage/img/upload')
            xhr.setRequestHeader('Authorization','Client-ID XXXXX')
            const data = new FormData()
            data.append('image',file)
            xhr.send(data)
            xhr.addEventListener('load',() =>{
                const response  = JSON.parse(xhr.responseText)
                const url = response.data.url
                console.log(url)
                resolve({data:{link:url}})
            })
            xhr.addEventListener('error',()=>{
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        }

    )

}


onEditorStateChange = (editorState) => {
    this.setState({
    editorState,
    })
    }
    /*
    得到输入的富文本数据
    */
    
    render() {
    const {editorState} = this.state
    return (
    <Editor
    editorState={editorState}
    editorStyle={{minHeight: 200, border: '1px solid #000', padding: '0 30px'}}
    onEditorStateChange={this.onEditorStateChange}
    toolbar={{
        image:{uploadCallback:this.uploadImageCallBack,alt:{present: true,mandatory:true}}
    }}

    />
    )
    }
    }