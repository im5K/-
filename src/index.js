import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './App'
import store from './redux/store'
import storageUtils from "../src/utils/storageUtils"
import memoryUtils from "../src/utils/memoryUtils"


//读取local的user
const user = storageUtils.getUser()
memoryUtils.user = user
ReactDOM.render(
    (<Provider store={store}>
<App />
    </Provider>), 
    document.getElementById('root'))