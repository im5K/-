//接口请求对象返回promise
//登录
import ajax from "./ajax"
import jsonp from "jsonp";
import { message } from "antd";

export const reqLogin = (username,password)=>
ajax("/login",{username,password},'POST')
//添加用户
export const ReqAddUser = (user)=>
ajax('/manage/user/add',user,'POST')

/*
json请求接口请求函数
ak = EtPfS96G1RFwVjtDmUgr1tRiTxC3coPT
*/
export const reqWeather = (city)=>{
    return new Promise((resolve,reject)=>{
        const url =`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=f24daaa119acdc582e8bb94d0d70c994`;
        jsonp(url,{},(err,data)=>{
            
       if(data.info==="OK"){
           const weather = data.lives[0].weather
           resolve(weather)
    
       } else {
           message.error("获取天气信息失败")
       }
    
    
        })
    })
    
   

}
reqWeather("北京")
