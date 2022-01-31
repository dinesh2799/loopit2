import axios from 'axios';
import React from 'react';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const Register = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')
    const [nameError,setNameError] = useState('')
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    const [confirmpasswordError,setConfirmPasswordError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        const data = {
            name : name,
            email : email,
            password : password,
            confirm_password : confirmpassword
        }
        console.log(data)

        axios.post('api/register',data).then(
            res => {
                console.log(res)
                swal("Success!",res.data.message,"success");
                navigate('/login');
            }
        ).catch(
            err => {
                console.log(err.response.data)
                setNameError(err.response.data.message.name)
                setEmailError(err.response.data.message.email)
                setPasswordError(err.response.data.message.password)
                setConfirmPasswordError(err.response.data.message.confirm_password)
            }
        )
        
        
    }
  return  (
    <div className='auth-wrapper'>
    <div className='auth-inner'>

        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className='form-group'>
                <label>Name</label>
                    <input type="text" className='form-control' placeholder='Enter your name'
                    value={name} onChange={(e) => setName(e.target.value)}/>
                    <span className="text-danger">{nameError}</span>
            </div>

            <div className='form-group'>
                <label>Email</label>
                    <input type="email" className='form-control' placeholder='Enter your email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <span> </span>
                    <span className="text-danger">{emailError}</span>
            </div>

            <div className='form-group'>
                <label>Password</label>
                    <input type="password" className='form-control' placeholder='Enter password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="text-danger">{passwordError}</span>
            </div>

            <div className='form-group'>
                <label>Confirm Password</label>
                    <input type="password" className='form-control' placeholder='Confirm password'
                    value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <span className="text-danger">{confirmpasswordError}</span>
            </div><br></br>

            <div className='form-group'>
                <button className='btn btn-primary btn-block form-control' >
                    Sign Up
                </button>
            </div>
            
        </form>

        </div></div>
  );
  
};

export default Register;
