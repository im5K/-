import axios from "axios"
import {message} from "antd"

export default function ajax(url, data = {}, method = 'GET'){
    return new Promise((resolve,reject) => {
        //1.执行异步ajax异常
        //1.可以优化不返回异常，去catch-error
        //2.优化直接返回data
        let promise



        if(method==="GET"){
            promise = axios.get(url, {
                params:data
    
            })
        
        
        }else{
            promise = axios.post(url,data)
        }
        //2.成功则调用resolve
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            message.error('请求出错了:'+error.mesage)

        })
        //3.不成功也不调用reject
    }
    )
  

}


