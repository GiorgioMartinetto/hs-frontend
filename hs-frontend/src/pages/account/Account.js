import './Account.css'
import api from '../../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

/* bootstrap components*/
import Accordion from'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ProfileImage from './images/profile.png'

/* custom components */
import MyNavbar from '../../components/Navbar';

const Account = () => {
    const [errMex, setErrMex] = useState();
    const [mex, setMex] = useState();
    const navigate = useNavigate();

    const [showEmail, setShowEmail] = useState(false);
    const handleCloseEmail = () => {setShowEmail(false); setErrMex(''); setMex('');}
    const handleShowEmail = () => setShowEmail(true);

    const [showUserName, setShowUserName] = useState(false);
    const handleCloseUserName = () => {setShowUserName(false); setErrMex(''); setMex('');}
    const handleShowUserName = () => setShowUserName(true);

    const [showPass, setShowPass] = useState(false);
    const handleClosePass = () => {setShowPass(false); setErrMex(''); setMex('');}
    const handleShowPass = () => setShowPass(true);

    const [showProfile, setShowProfile] = useState(false);
    const handleCloseProfile = () => {setShowProfile(false); setErrMex(''); setMex('');}
    const handleShowProfile = () => setShowProfile(true);
    
    const [showRemoveProfile, setShowRemoveProfile] = useState(false);
    const handleCloseRemoveProfile = () => {setShowRemoveProfile(false); setErrMex(''); setMex('');}
    const handleShowRemoveProfile = () => setShowRemoveProfile(true);
    
    const [showCreateProfile, setShowCreateProfile] = useState(false);
    const handleCloseCreateProfile = () => {setShowCreateProfile(false); setErrMex(''); setMex('');}
    const handleShowCreateProfile = () => setShowCreateProfile(true);

    useEffect(() =>{
        load_profiles();
    }, []);

    function load_profiles() {
        if(sessionStorage.getItem('email') == null || sessionStorage.getItem('userName') == null){
            navigate('/home');
        } else {
            try{
                api.post('profile/list', {owner: sessionStorage.getItem('email')})
                .then(response => {
                    if(response.data){
                        const pl = response.data;
                        const jsonArray = JSON.stringify(pl);
                        sessionStorage.setItem('profiles', jsonArray);
                        
                    } else {
                        console.log('qui quo qua');
                    }
                    
                });
            } catch(err){
                console.log(err);
            }
        }  
    }

    function removeProfile(num) {
        if(num > 0 && num < 4 ) {
            try{
                api.post('profile/deleteProfile', 
                    {
                        owner: sessionStorage.getItem('email'),
                        profileName: sessionStorage.getItem('profiles')[num] 
                    })
                    .then(response => {
                        if(response.data){
                            setErrMex('');
                            setMex('Profile deleted successfully');          
                            setTimeout(() => {
                                handleCloseRemoveProfile()
                            }, 1200);
                        } else {
                            setErrMex('Failed to delete Profile');
                        }
                    });
            }catch(err){
                console.log(err);
            }
        }
    }

    function createProfile() {
        
    }

    function setNewPassword() {
        const oldPassword = document.getElementById('account-change-oldpass').value;
        const newPassword = document.getElementById('account-change-newpass').value;
        const repPassword = document.getElementById('account-change-reppass').value;

        if(oldPassword === '' || newPassword === '' || repPassword === ''){
            setErrMex('All fields are required');
        }
        else if(newPassword !== repPassword){
            setErrMex('Passwords do not match');
        }
        else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(newPassword)) 
            && newPassword.length < 8 && newPassword.length > 255){
            setErrMex('Password is not valid');
        } else {
            setErrMex('');
            try{
                api.post('user/updateUserPassword', 
                    {email:sessionStorage.getItem('email'), oldPassword:oldPassword, 
                    newPassword:newPassword})
                    .then(response => {
                        if(response.data){
                            setMex('Password changed successfully');
                            setTimeout(() => {
                                handleClosePass()
                            }, 1200);
                        }
                    });
            } catch(err) {
                console.log(err);
            }

        }
    }


    function setNewUserName() {
        const newUserName = document.getElementById('account-change-newusername').value;
        if(newUserName === '') {
            setErrMex('Please fill in all fields');
        } else {
            setErrMex('');
            try{
                api.post('user/updateUserName', 
                {email:sessionStorage.getItem('email'), newUserName:newUserName})
                .then(response => {
                    if(response.data){
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

    function setNewProfileName() {
        const newProfileName = document.getElementById('account-change-newprofilename').value;
        if(newProfileName === '') {
            setErrMex('Please fill in all fields');
        } else {            
            try{
                api.post('user/updateProfileName', 
                {email:sessionStorage.getItem('email'), owner:sessionStorage.getItem('email'), oldName:"pluto", newName:newProfileName})
                .then(response => {
                    if(response.data){
                        setErrMex('');
                        setMex('Username changed successfully');
                        setTimeout(() => {
                            handleCloseProfile();
                        }, 1200);
                    } else {
                        setErrMex('Failed to update Username');
                    }
                });
            } catch(err) {
                console.log(err);
            }

        }
    }

    function setNewEmail() {
    
        const newEmail = document.getElementById('account-change-newemail').value;

        if(!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newEmail))){
            setErrMex('Email is not valid');
        } else {
            try{
                api.post('user/updateUserEmail', 
                {oldEmail:sessionStorage.getItem('email'), newEmail:newEmail})
                .then(response => {
                    if(response.data){
                            setErrMex('');
                            setMex('Email changed successfully');
                            sessionStorage.setItem('email',newEmail);
                            setTimeout(() => {
                                handleCloseEmail()
                            }, 1200);
                        } else {
                            setErrMex('Failed to change Email');
                        }
                    });
            }catch(err){
                console.log(err);
            }
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
           
                    <input id='account-change-newemail'placeholder='New Email' />
         
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
           
                    <input id='account-change-newusername'placeholder='New User Name' />
         
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
                    <input type='password' id='account-change-oldpass' placeholder='Old Password' />
                    <input type='password' id='account-change-newpass'placeholder='New Password' />
                    <input type='password' id='account-change-reppass'placeholder='Confirm Password' />
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

            {/* CHANGE PROFILE MODAL */}
            <Modal show={showProfile} onHide={handleCloseProfile}>
                <Modal.Header closeButton>
                <Modal.Title>Change Profile Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id='account-change-newprofilename'placeholder='New Profile Name' />
                    <p> {mex} </p>
                    <p> {errMex} </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseProfile}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={setNewProfileName}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* REMOVE PROFILE MODAL */}
            <Modal show={showRemoveProfile} onHide={handleCloseProfile}>
                <Modal.Header closeButton>
                <Modal.Title>Remove Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id='account-change-newprofilename'placeholder='New Profile Name' />
                    <p> {mex} </p>
                    <p> {errMex} </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseProfile}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={setNewProfileName}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* CREATE PROFILE MODAL */}
            <Modal show={showCreateProfile} onHide={handleCloseCreateProfile}>
                <Modal.Header closeButton>
                <Modal.Title>Create Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id='account-create-newprofile'placeholder='Profile Name' />
                    <p> {mex} </p>
                    <p> {errMex} </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseCreateProfile}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={createProfile}>
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
                                <div id='profiles'>
                                    <Card style={{  width: '18rem', 
                                                    backgroundColor:'#2b2f35', 
                                                    display: 'inline-block', 
                                                    margin: '0.5%', 
                                                    visibility: "show"//JSON.parse(sessionStorage.getItem('profiles'))[0] != null ? 'show': 'hidden' 
                                                }}>
                                        <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                                        <Card.Body>
                                            <Card.Title id='profile-0'></Card.Title>
                                            <Button variant="outline-primary" onClick={handleShowProfile}>Change ProfileName</Button>
                                            <Button variant="outline-secondary" onClick={removeProfile(0)}>
                                                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800",}} />
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    {/* <Card style={{  width: '18rem', 
                                                    backgroundColor:'#2b2f35', 
                                                    display: 'inline-block', 
                                                    margin: '0.5%', 
                                                    //visibility: JSON.parse(sessionStorage.getItem('profiles'))[1] != null ? 'show': 'hidden' 
                                                }}>
                                        <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                                        <Card.Body>
                                            <Card.Title id='profile-1'>{JSON.parse(sessionStorage.getItem('profiles'))[1]}</Card.Title>
                                            <Button variant="outline-primary" onClick={handleShowProfile}>Change ProfileName</Button>
                                            <Button variant="outline-secondary" onClick={removeProfile(1)}>
                                                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800",}} />
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    <Card style={{  width: '18rem', 
                                                    backgroundColor:'#2b2f35', 
                                                    display: 'inline-block', 
                                                    margin: '0.5%', 
                                                    //visibility: JSON.parse(sessionStorage.getItem('profiles'))[2] != null ? 'show': 'hidden' 
                                                }}>
                                        <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                                        <Card.Body>
                                            <Card.Title id='profile-2'>{JSON.parse(sessionStorage.getItem('profiles'))[2]}</Card.Title>
                                            <Button variant="outline-primary" onClick={handleShowProfile}>Change ProfileName</Button>
                                            <Button variant="outline-secondary" onClick={removeProfile(2)}>
                                                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800",}} />
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    <Card style={{  width: '18rem', 
                                                    backgroundColor:'#2b2f35', 
                                                    display: 'inline-block', 
                                                    margin: '0.5%', 
                                                    //visibility: JSON.parse(sessionStorage.getItem('profiles'))[3] != null ? 'show': 'hidden' 
                                                }}>
                                        <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                                        <Card.Body>
                                            <Card.Title id='profile-3'>{JSON.parse(sessionStorage.getItem('profiles'))[3]}</Card.Title>
                                            <Button variant="outline-primary" onClick={handleShowProfile}>Change ProfileName</Button>
                                            <Button variant="outline-secondary" onClick={removeProfile(3)}>
                                                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800",}} />
                                            </Button>
                                        </Card.Body>
                                    </Card> */}
                                    <Card style={{ width: '18rem', backgroundColor:'#2b2f35', display: 'inline-block', margin: '0.5%', visibility: JSON.parse(sessionStorage.getItem('profiles'))[3] != null ? 'show': 'hidden' }}>
                                        <Card.Body>
                                            <Button variant="outline-primary" onClick={handleShowCreateProfile}>
                                                <FontAwesomeIcon icon={faCirclePlus} style={{color: "#c64600",}} /> 
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                    
                                </div>
                            </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Account Managment</Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    <div className='change-field-container'>

                                        Email: {sessionStorage.getItem('email')}
                                        
                                        <button type="button" onClick={handleShowEmail}>Change Email</button>
                                    </div>
                                    <div className='change-field-container'>
                                        UserName: {sessionStorage.getItem('userName')}
                                        <button type="button" onClick={handleShowUserName}>Change UserName</button>
                                    </div>
                                    <div className='change-field-container'>
                                        <button type="button" onClick={handleShowPass}>Change Password</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Row>
                    <h3>Subscription</h3>
                    <hr></hr>
                    <Col className='card-container'>
                            <img src={require('./images/netflix.png')} alt='netflix' id='netflix-img'/>
                            
                            <img src={require('./images/primevideo.png')} alt='prime video' id='prime-img'/>  
                    </Col>
                </Row>
            </Container>
        </>
     
    );
}

export default Account;