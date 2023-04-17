import './Registration.css';
import React from'react';
import api from '../../config/axiosConfig'
import { useState } from'react';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
    const navigate = useNavigate();
    const [mexErr,setErrMex] = useState();
    const [mex,setMex] = useState();
    function sendRegistration() {
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (email === '' || username === '' || password === '' || confirmPassword === '') {
            setErrMex('Some fields are missing');
        } 
        else if(!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
            setErrMex('Email is not valid');
        }
        else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) 
        && password.length < 8 && password.length > 255){
            setErrMex('Password is not valid');
        }
        else {
            if (password === confirmPassword) {
                setErrMex('');
                try{
                    api.post('user/sign-in', { email: email, userName: username, password: password })
                    .then(response => {
                        console.log(response);
                        console.log(response.data);
                        if(response)
                        {   
                            setMex('Registration successful');
                            setTimeout(() => {
                                navigate('/login') }, 1500)
                        }
                    })
    
                }catch(error){
                    console.log(error);
                }
                
                
                
            } else {
                setErrMex('Passwords do not match');
            } 
        }
                  
      
    }

    return(
        <>
            <div className='login-container'>
                <div className="text-center ">
                    <form>
                        <div className='row'>
                            <div className='col' id='col1'>
                                <img className='logo1' src={require('../images/logo_background.png')} alt='logo'/> 
                            </div>
                            <div className='col' id='col2'>
                                <div className='register-field-container'>
                                    <div>
                                        <input className="form-control-sm" id="email" placeholder='Email'/>
                                    </div>
                                    <div>
                                        <input className="form-control-sm" id="username" placeholder='Username'/>
                                    </div>
                                    <div>
                                        <input type="password" className="form-control-sm" id="password" placeholder='Password' />
                                    </div>
                                    <div>
                                        <input type="password" className="form-control-sm" id="confirmPassword" placeholder='Reapet Password' />
                                    </div>
                                    
                                    <div>
                                        <p id='err-mex'>{mexErr}</p>
                                        <p id='mex'>{mex}</p>  
                                    </div>
                                    
                                    <div className='buttons-container'>    
                                        <button type="button" id='register-btn' onClick={sendRegistration}>
                                            Submit
                                        </button>
                                        <button type="button" id='register-btn' onClick={() => navigate('/login')}>
                                            Back
                                        </button>   
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div> 
        </>
    );
}

export default Registration;


