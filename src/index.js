import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import storageUtils from "../src/utils/storageUtils"
import memoryUtils from "../src/utils/memoryUtils"

//读取local的user
const user = storageUtils.getUser()
memoryUtils.user = user
ReactDOM.render(<App />, document.getElementById('root'))