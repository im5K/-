/*
进行local数据的存储
*/
import store from "store"
const USER_KEY = "user_key"
export default{
    //保存user
    saveUser(user){
        store.set(USER_KEY,user)
    },
    //读取user
    getUser(user){

        return store.get(USER_KEY)||{}
    },
    removeUser(){
        store.remove(USER_KEY)
    }

    //删除user


}