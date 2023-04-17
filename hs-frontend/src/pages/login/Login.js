import './Login.css';
import React from'react';
import session from '../../config/userSession';
import api from '../../config/axiosConfig'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    
    const navigate = useNavigate();
    const [response,setResponse] = useState();
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
                    console.log(response)
                    console.log(response.data)
                    setResponse(response.data);
                })
            }catch(err){
                console.log(err);
            }
            if(response){
                session.set('user',response.data);
                navigate('/home');
            } else {
                setMex('Invalid email or password');
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
                                        <p id='mex'> {mex} </p>   
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


