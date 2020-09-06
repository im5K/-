//用来指定老的state和指定的action生成并返回新得state的函数


import storageUtils from "../utils/storageUtils"
import {combineReducers} from 'redux'

//管理标题
const inintHeadTitle = '首页'
function headTitle(state= inintHeadTitle,action){
switch (action.type){
    default:
        return state
}
}

const initUser = storageUtils.getUser();
function user(state=initUser,action){
    switch(action.type){
        default:
            return state
    }

}

//向外暴露的合并的产生的总的reducer函数，管理总的state
export default combineReducers({
    headTitle,
    user
})