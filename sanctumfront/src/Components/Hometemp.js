import React, {Component} from "react";
// import axios from 'axios'
export default class Hometemp extends Component{

    
    render()
    {
        if(this.props.user){
            return(
                <h2>Hi {this.props.user.name}  </h2>
            )
        }
        return(
            <h2>You are not logged in</h2>
        )
    }
}