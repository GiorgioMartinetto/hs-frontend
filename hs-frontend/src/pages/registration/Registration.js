import './Registration.css';
import React from'react';


const Registration = () => {
    

    function sendRegistration() {
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:email, userName:username, password:password })
        };

        fetch('http://localhost:8080/api/v1/user/sign-up', requestOptions)
            .then(response => response.json())
            .then(response => console.log(response));
           
      
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
                                <div className=' field-container'>
                                    <div>
                                        <input className="form-control-sm" id="email" placeholder='Email'/>
                                    </div>
                                    <div>
                                        <input className="form-control-sm" id="username" placeholder='Username'/>
                                    </div>
                                    <div>
                                        <input type="password" className="form-control-sm" id="password" placeholder='Password' />
                                    </div>
                                    <div className='buttons-container'>    
                                        <button type="button" id='register-btn' onClick={sendRegistration}>
                                            Register
                                        </button>  
                                        <button type="button" id='login-btn' >
                                            Login
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


