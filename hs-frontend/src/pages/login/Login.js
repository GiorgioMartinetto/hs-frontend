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
            .then(response => console.log(response));
           
      
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
                                    <div className='buttons-container'>    
                                        <button type="button" id='login-btn' onClick={sendLogin}>
                                            Login
                                        </button>
                                        <button type="button" id='register-btn'>
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


