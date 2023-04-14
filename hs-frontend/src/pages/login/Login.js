import './Login.css';
import React from'react';


const Login = () => {
    

    function sendLogin() {
        const email = document.getElementById('user-login').value;
        const pass = document.getElementById('pass-login').value;
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:email, password:pass })
        };
        fetch('http://localhost:8080/api/v1/user/login', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
      
    }

    return(
        <>
            <div className='login-container peppereppe'>
                <div className="text-center">
                    <form className="form-inline">
                        <div>
                            <img className="logo" src={require('./images/logo_background.png')} alt='logo'/> 
                            <div className='buttons'>

                            <input className="form-control-sm" id="user-login" placeholder='Email'/>
                            <input type="password" className="form-control-sm" id="pass-login" placeholder='Password' />
                            </div>
                            <div className='buttons'>
                                <button type="button" className="form-control-sm " id='login-btn' onClick={sendLogin}>Login</button>
                                <button type="button" className="form-control-sm" id='register-btn'>Register</button>  
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
        </>
    );
}

export default Login;


