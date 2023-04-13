import './Login.css';
import React from'react';
import axios from 'axios';

const Login = () => {


    function sendLogin() {
        const email = document.getElementById('user-login').value;
        const pass = document.getElementById('pass-login').value;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
        axios.post('http://localhost:8080/api/v1/user/login',
            {
                email: email,
                password: pass
            }
        ).then(res => {
            console.log(res.data);
        })
    }

    return(
        <>
            <div className='login-container'>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <img src={require('./images/logo_background.png')} alt='logo'/> 
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                    <input className="form-control-sm" id="user-login" placeholder='Email'/>
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control-sm" id="pass-login" placeholder='Password' />
                                </div>
                                <div className="mb-3 form-check">
                                    <button  className="buttons" id='login-btn' onClick={sendLogin}>Login</button>
                                    <button  className="buttons" id='register-btn'>Register</button>  
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Login;


