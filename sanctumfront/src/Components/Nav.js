// import { render } from '@testing-library/react';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// const Nav = () => 
export default class Nav extends Component{
    
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null)
    }

    render() {

        let buttons;
        if(this.props.user)
        {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                        <Link className="nav-link" to={'/'} onClick={ this.handleLogout }>Logout </Link>
                    </li>
                </ul> 
            );
        }
        else{
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                        <Link className="nav-link" to={'/login'}>Login </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/register'}>Register</Link>
                    </li>
                </ul>
            );
        }
    
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
        <div className='container'>
            <Link className="navbar-brand" to={'/home'}>Home</Link>
            <div className="collapse navbar-collapse" >
                {buttons}
            </div>
        </div>

        </nav>
        </div>
        
    );
}
};

// export default Nav;
