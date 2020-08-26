import React, {Component} from 'react'
import {reqWeather} from "../../api/index"
export default class Category extends Component{
    render(){
       
        const weather =  reqWeather("合肥")
           
        console.log(weather)
       
        return(
            <span>
             


            </span>
        )
    }
}