import './Account.css'
import api from '../../config/axiosConfig';
import React, { useEffect, useState, useRef } from 'react';


/* bootstrap components*/
import Accordion from'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/* custom components */
import MyNavbar from '../../components/navbar/Navbar';
import MyCard from '../../components/mycard/MyCard';

const Account = () => {
    const [errMex, setErrMex] = useState();
    const [mex, setMex] = useState();

    const netflixBtn = useRef(null);
    const primeBtn = useRef(null);

    const [showEmail, setShowEmail] = useState(false);
    const handleCloseEmail = () => {setShowEmail(false); setErrMex(''); setMex('');}
    const handleShowEmail = () => setShowEmail(true);

    const [showUserName, setShowUserName] = useState(false);
    const handleCloseUserName = () => {setShowUserName(false); setErrMex(''); setMex('');}
    const handleShowUserName = () => setShowUserName(true);

    const [showPass, setShowPass] = useState(false);
    const handleClosePass = () => {setShowPass(false); setErrMex(''); setMex('');}
    const handleShowPass = () => setShowPass(true);
    let profileList =[];
    
    /* add subscriptions */
    const [showSubNetflix, setShowSubNetflix] = useState(false);
    const handleCloseSubscriptionNetflix = () => {setShowSubNetflix(false); setErrMex(''); setMex('');}
    const handleShowSubscriptionNetflix = () => setShowSubNetflix(true);
    const [showSubPrime, setShowSubPrime] = useState(false);
    const handleCloseSubscriptionPrime = () => {setShowSubPrime(false); setErrMex(''); setMex('');}
    const handleShowSubscriptionPrime = () => setShowSubPrime(true);

    /* remove subscriptions */
    const [showRemoveSubPrime, setShowRemoveSubPrime] = useState(false);
    const handleCloseRemoveSubscriptionPrime = () => {setShowRemoveSubPrime(false); setErrMex(''); setMex('');}
    const handleShowRemoveSubscriptionPrime = () => setShowRemoveSubPrime(true);
    const [showRemoveSubNetflix, setShowRemoveSubNetflix] = useState(false);
    const handleCloseRemoveSubscriptionNetflix = () => {setShowRemoveSubNetflix(false); setErrMex(''); setMex('');}
    const handleShowRemoveSubscriptionNetflix = () => setShowRemoveSubNetflix(true);
    

    
    useEffect(() => {
        let i = 0;
        while(sessionStorage.getItem('profile'+i)!==null) {
            profileList[i] = {id:i, name:sessionStorage.getItem('profile'+i)};
            i++;
        }
        console.log(sessionStorage);

        console.log(sessionStorage.getItem('prime') === 'true');
        console.log(sessionStorage.getItem('prime'));
        console.log(sessionStorage.getItem('netflix') === 'true');
        console.log(sessionStorage.getItem('netflix'));
    });
    

    function setNewPassword() {
        const oldPassword = document.getElementById('account-change-oldpass').value;
        const newPassword = document.getElementById('account-change-newpass').value;
        const repPassword = document.getElementById('account-change-reppass').value;

        if (oldPassword === '' || newPassword === '' || repPassword === '') {
            setErrMex('All fields are required');
        }
        else if (newPassword !== repPassword) {
            setErrMex('Passwords do not match');
        }
        else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(newPassword)) 
            && newPassword.length < 8 && newPassword.length > 255) {
            setErrMex('Password is not valid');
        } else {
            setErrMex('');
            try {
                api.post(
                    'user/updateUserPassword', 
                    {
                        email:sessionStorage.getItem('email'), 
                        oldPassword:oldPassword, 
                        newPassword:newPassword
                    }
                ).then(
                    response => {
                        if (response.data) {
                            setMex('Password changed successfully');
                            setTimeout(() => {
                                handleClosePass()
                            }, 1200);
                        }
                    }
                );
            } catch(err) {
                console.log(err);
            }

        }
    }


    function setNewUserName() {
        const newUserName = document.getElementById('account-change-newusername').value;
        if (newUserName === '') {
            setErrMex('Please fill in all fields');
        } else {
            setErrMex('');
            try {
                api.post('user/updateUserName', 
                {email:sessionStorage.getItem('email'), newUserName:newUserName})
                .then(response => {
                    if (response.data) {
                        setMex('Username changed successfully');
                        sessionStorage.setItem('userName',newUserName);
                        setTimeout(() => {
                            handleCloseUserName()
                        }, 1200);
                    }
                });
            } catch(err) {
                console.log(err);
            }  
        }
    }



    function setNewEmail() {
    
        const newEmail = document.getElementById('account-change-newemail').value;

        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newEmail))) {
            setErrMex('Email is not valid');
        } else {
            try {
                api.post(
                    'user/updateUserEmail', 
                    {
                        oldEmail:sessionStorage.getItem('email'), 
                        newEmail:newEmail
                    }
                ).then(
                    response => {
                        if (response.data) {
                            setErrMex('');
                            setMex('Email changed successfully');
                            sessionStorage.setItem('email', newEmail);
                            setTimeout(() => {
                                handleCloseEmail()
                            }, 1200);
                        } else {
                            setErrMex('Failed to change Email');
                        }
                    }
                );
            } catch(err) {
                console.log(err);
            }
        }
    }


    function addSubscription(provider) {
        
        const email = document.getElementById('provider-email').value;
        const pass = document.getElementById('provider-password').value;

        try {
            api.post(
                '/subscription/addSubscription', 
                {
                    emailPlatform:sessionStorage.getItem('email'), 
                    provider:provider, providerEmail:email, 
                    password:pass
                }
            ).then(
                response => {
                    if (response.data) {
                        setErrMex('');
                        setMex('Subscription Added');

                        if (provider === 'netflix') {
                            sessionStorage.setItem('netflix', 'true');
                            netflixBtn.current.style.mixBlendMode = 'overlay';
                            netflixBtn.current.onClick = handleShowRemoveSubscriptionNetflix;
                            
                            setTimeout(() => {
                                handleCloseSubscriptionNetflix();
                                window.location.reload();     
                            }, 1200);
                        }

                        if (provider === 'prime') {
                            sessionStorage.setItem('prime', 'true');
                            primeBtn.current.style.mixBlendMode = 'overlay';
                            primeBtn.current.onClick = handleShowRemoveSubscriptionPrime;
                            setTimeout(() => {
                                handleCloseSubscriptionPrime();
                                window.location.reload();
                            }, 1200);
                        }
                        
                    } else {
                        setErrMex('Failed to add '+provider+' subscription');
                    }
                }
            );
        } catch(err) {
            console.log(err);
        }
    }

    function removeSubscription(platform) {
        try {
            api.post(
                '/subscription/removeSubscription', 
                {
                    email:sessionStorage.getItem('email'), 
                    platform: platform
                }
            ).then(
                response => {
                    if (response.data) {
                        setErrMex('');
                        setMex('Subscription Removed');
                        
                        if (platform === 'netflix') {
                            sessionStorage.setItem('netflix', 'false');
                            console.log(sessionStorage.getItem('netflix'))
                            netflixBtn.current.style.mixBlendMode = 'overlay';
                            setTimeout(() => {
                                handleCloseRemoveSubscriptionNetflix()
                                netflixBtn.current.onClick = handleShowSubscriptionNetflix;
                                window.location.reload();
                            }, 1200);
                        }

                        if (platform === 'prime') {
                            sessionStorage.setItem('prime', 'false');
                            console.log(sessionStorage.getItem('prime'))
                            primeBtn.current.style.mixBlendMode = 'overlay';
                            setTimeout(() => {
                                handleCloseRemoveSubscriptionPrime()
                                primeBtn.current.onClick = handleShowSubscriptionPrime;
                                window.location.reload();
                            }, 1200);
                        }
                        
                    } else {
                        setErrMex('Failed to remove ' + platform + ' subscription');
                    }
                }
            );
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <MyNavbar />

            {/* CHANGE EMAIL MODAL */}
            <Modal show={showEmail} onHide={handleCloseEmail}>
                <Modal.Header closeButton>
                <Modal.Title>Change Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
           
                    <input id='account-change-newemail' placeholder='New Email' />
         
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseEmail}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={setNewEmail}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* CHANGE USERNAME MODAL */}
            <Modal show={showUserName} onHide={handleCloseUserName}>
                <Modal.Header closeButton>
                <Modal.Title>Change UserName</Modal.Title>
                </Modal.Header>
                <Modal.Body>
           
                    <input id='account-change-newusername' placeholder='New User Name' />
         
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseUserName}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={setNewUserName}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* CHANGE PASSWORD MODAL */}
            <Modal show={showPass} onHide={handleClosePass}>
                <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type = 'password' id='account-change-oldpass' placeholder='Old Password' />
                    <input type = 'password' id='account-change-newpass' placeholder='New Password' />
                    <input type = 'password' id='account-change-reppass' placeholder='Confirm Password' />
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClosePass}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={setNewPassword}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL ADDSUBSCRIPTION NETFLIX*/}
            <Modal show={showSubNetflix} onHide={handleCloseSubscriptionNetflix}>
                <Modal.Header closeButton>
                <Modal.Title>Netflix Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id='provider-email' placeholder='Netflix Email' />
                    <input type = 'password' id='provider-password' placeholder='Password' />
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseSubscriptionNetflix}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={()=>addSubscription('netflix')}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>


            {/* MODAL ADDSUBSCRIPTION PRIME*/}
            <Modal show={showSubPrime} onHide={handleCloseSubscriptionPrime}>
                <Modal.Header closeButton>
                <Modal.Title>Prime Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id='provider-email' placeholder='Prime Email' />
                    <input type = 'password' id='provider-password' placeholder='Password' />
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseSubscriptionPrime}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={()=>addSubscription('prime')}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
            
            {/* MODAL REMOVESUBSCRIPTION NETFLIX*/}
            <Modal show={showRemoveSubNetflix} onHide={handleCloseRemoveSubscriptionNetflix}>
                <Modal.Header closeButton>
                <Modal.Title>Remove Netflix Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseRemoveSubscriptionNetflix}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={()=>removeSubscription('netflix')}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL REMOVESUBSCRIPTION PRIME*/}
            <Modal show={showRemoveSubPrime} onHide={handleCloseRemoveSubscriptionPrime}>
                <Modal.Header closeButton>
                <Modal.Title>Remove Prime Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> {mex} </p>
                    <p> {errMex} </p>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseRemoveSubscriptionPrime}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={()=>removeSubscription('prime')}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            <Container id='account-container'>
                <h1>Hi, {sessionStorage.getItem('userName')}!</h1>
                <Accordion bg='hide' defaultActiveKey='0'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Profiles</Accordion.Header>
                            <Accordion.Body>
                                <MyCard />

                            </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Account Managment</Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    <div className = 'change-field-container'>

                                        Email: {sessionStorage.getItem('email')}
                                        
                                        <button type="button" onClick={handleShowEmail}>Change Email</button>
                                    </div>
                                    <div className = 'change-field-container'>
                                        UserName: {sessionStorage.getItem('userName')}
                                        <button type="button" onClick={handleShowUserName}>Change UserName</button>
                                    </div>
                                    <div className = 'change-field-container'>
                                        <button type="button" onClick={handleShowPass}>Change Password</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Row>
                    <h3>Subscription</h3>
                    <hr></hr>
                    <Col className = 'card-container'>
                        <button 
                            type="button" 
                            id='netflix-sub-btn' 
                            onClick={sessionStorage.getItem('netflix') === 'true'? handleShowRemoveSubscriptionNetflix : handleShowSubscriptionNetflix} 
                        >
                            <img 
                                ref={netflixBtn} 
                                alt='netflix btn' 
                                id='netflix-img' 
                                src={require('./images/netflix.png')} 
                                style={{mixBlendMode : sessionStorage.getItem('netflix') === 'true' ? 'none' : 'overlay'}}
                            />
                        </button>  

                        <button 
                            ref={primeBtn} 
                            type="button" 
                            id='prime-sub-btn' 
                            onClick={sessionStorage.getItem('prime') === 'true' ? handleShowRemoveSubscriptionPrime : handleShowSubscriptionPrime}
                        >  
                            <img 
                                src={require('./images/primevideo.png')} 
                                id='prime-img' 
                                alt='prime video' 
                                style={{mixBlendMode : sessionStorage.getItem('prime') === 'true' ? 'none' : 'overlay'}}
                            />  
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
     
    );
    
}

export default Account;