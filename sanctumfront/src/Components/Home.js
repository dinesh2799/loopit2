import { Button } from "bootstrap";
import React, {Component} from "react";
import { Link } from "react-router-dom";
// import axios from 'axios'
export default class Home extends Component{

    
    render()
    {
        console.log(this.props.user);
        if(this.props.user){
            console.log(this.props.user.role);
            if(this.props.user.role == 1)
            { return(<h2>Hi {this.props.user.name} , <Link to='../cars'>cars</Link></h2>)
                
            }

            return(
                <h2>Hi {this.props.user.name} , <Link to='../cars/all'>CARS</Link></h2>
                
            )
        }
        return(
            <h2>You are not logged in</h2>
        )
    }

}