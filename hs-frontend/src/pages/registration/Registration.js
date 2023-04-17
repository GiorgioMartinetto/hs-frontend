import './Registration.css';
import React from'react';
import api from '../../config/axiosConfig'
import { useState } from'react';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
    const navigate = useNavigate();
    const [response,setResponse] = useState();
    const [mex,setMex] = useState();
    
    function sendRegistration() {
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password === confirmPassword) {
            setMex('');
            try{
                api.post('user/sign-in', { email: email, userName: username, password: password })
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    setResponse(response.data);
                })

            }catch(error){
                console.log(error);
            }
            if(response)
            {
                navigate('/login');
            }
            
        } else {
            setMex('Passwords do not match');
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


