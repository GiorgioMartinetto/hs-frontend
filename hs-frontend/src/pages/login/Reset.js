import './Login.css';
import React from'react';
import api from '../../config/axiosConfig'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Reset = () => {
    
    const navigate = useNavigate();
    const [mex,setMex] = useState();
    const [mexErr, setErrMex] = useState();

    function sendReset() {

        const email = document.getElementById('email-check').value;
        const pass = document.getElementById('password-reset').value;
        const passConfirm = document.getElementById('pass-confirm-reset').value;

        if (email === ''  || pass === '' || passConfirm === '') {
            setErrMex('Some fields are missing');
        } 

        else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass)) 
        && pass.length < 8 && pass.length > 255){
            setErrMex('Password is not valid');
        }  
        else if (pass === passConfirm){
            try{
                api.post('user/resetPassword', { email:email, newPassword:pass })
                .then(response => {
                    console.log(response.data)
                    if(response.data){
                        setMex('Password reset successfully');
                        setTimeout(() => {
                        navigate('/login');}, 1500);

                    } else {
                        console.log('Something went wrong')
                    }
                });
            }catch(err){
                console.log(err);
            }
        } else {
            setErrMex('Passwords do not match');
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
                                        <input className="form-control-sm" id="email-check" placeholder='Email'/>
                                    </div>
                                    <div>
                                        <input type="password" className="form-control-sm" id="password-reset" placeholder='Password' />
                                    </div>
                                    <div>
                                        <input type="password" className="form-control-sm" id="pass-confirm-reset" placeholder='Reapet Password' />
                                    </div>
                                    
                                    <div>
                                        <p id='err-mex'>{mexErr}</p>
                                        <p id='mex'>{mex}</p>  
                                    </div>
                                    
                                    <div className='buttons-container'>    
                                        <button type="button" id='register-btn' onClick={sendReset}>
                                            Reset
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

export default Reset;


