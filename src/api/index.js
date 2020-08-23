//登录
import ajax from "./ajax"

export const reqLogin = (username,password)=>
ajax("/login",{username,password},'POST')
//添加用户
export const ReqAddUser = (user)=>
ajax('/manage/user/add',user,'POST')