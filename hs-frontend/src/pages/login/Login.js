import './Login.css';
import React from'react';
import api from '../../config/axiosConfig'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    
    const navigate = useNavigate();
    const [mex,setMex] = useState();


    

    function sendLogin() {

        const email = document.getElementById('user-login').value;
        const pass = document.getElementById('pass-login').value;
        
        if(email === '' || pass === ''){
            setMex('Please fill all fields');
        } else {
            try{
                api.post('user/login', { email:email, password:pass })
                .then(response => {
                    console.log(response.data)
                    if(response.data){
                        sessionStorage.setItem('userName', response.data.userName);
                        sessionStorage.setItem('email', response.data.email);
                        navigate('/home');

                    } else {
                        console.log('Something went wrong')
                    }
                    
                })
                .then(  res => {
                    try{
                        api.post('profile/list', {owner: sessionStorage.getItem('email')})
                        .then(response => {
                        
                            if(response.data){ 
                                let i = 0;
                                while(response.data[i]!== undefined){
                                    sessionStorage.setItem('profile'+i, response.data[i]);
                                    i++;
                                }
                            } else {
                                console.log('Something went wrong');
                            }
                            
                        });
                    } catch(err){
                        console.log(err);
                    }
                })
                .then(  res => {
                    try{
                        api.post('subscription/listSubscriptions', {owner: sessionStorage.getItem('email')})
                        .then(response => {
                            console.log(response.data)
                            if(response.data){
                                sessionStorage.setItem('netflix', response.data.netflix);
                                sessionStorage.setItem('prime', response.data.prime);
                            } else {
                                console.log('Something went wrong');
                            }
                            
                        });
                    } catch(err){
                        console.log(err);
                    }
                });
            }catch(err){
                console.log(err);
            }
        }
    }



    return(
        <>
            <div className='login-container'>
                <div className="text-center ">
                    <form>
                        <div className='row'>
                            <div className='col' id='first-col'>
                                <img className='logo' src={require('../images/logo_background.png')} alt='logo'/> 
                            </div>
                            <div className='col' id='second-col'>
                                <div className=' field-container'>
                                    <div>
                                        <input className="form-control-sm" id="user-login" placeholder='Email'/>
                                    </div>
                                    <div>
                                        <input type="password" className="form-control-sm" id="pass-login" placeholder='Password' />
                                    </div>
                                    
                                    <div>
                                        <a id='forgot-password' href='/reset' > Forgot password?  </a>
                                    </div>

                                    <div>
                                        <p id='err-mex'> {mex} </p>   
                                    </div>
                                    <div className='buttons-container'>    
                                        <button type="button" id='login-btn' onClick={sendLogin}>
                                            Login
                                        </button>
                                        <button type="button" id='register-btn' onClick={() => navigate('/registration')}>
                                            Register
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

export default Login;


