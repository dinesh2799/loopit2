import axios from 'axios';
import React from 'react';
import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';

const Login = ({setUser}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        const data = {
            email : email,
            password : password,
        }

        axios.post('api/login',data).then(
            res => {
                // console.log(res)
                // if(res.data.success)
                // {
                    localStorage.setItem('token',res.data.data.token)
                    localStorage.setItem("isLoggedIn", true);
                    setUser(res.data.data)
                    swal("Success!",res.data.message,"success");
                    navigate('/home', { state: setUser });
                // }
                
            }
        ).catch(
            err => {
                // console.log(err)
                // console.log(err.response.data)
                setEmailError(err.response.data.message.email)
                setPasswordError(err.response.data.message.password)
                if(err.response.data.data.error)
                {
                    swal("Error",err.response.data.message,"error");
                }
            }
        )
    }

  return(
            <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <div className='form-group'>
                    <label>Email</label>
                    <input type="email" className='form-control' placeholder='Enter your email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="text-danger">{emailError}</span>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type="password" className='form-control' placeholder='Enter password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="text-danger">{passwordError}</span>
                </div><br></br>
                <button className='btn btn-primary btn-block form-control' >
                    Login
                </button>
            </form>
  );
};


export default Login;
