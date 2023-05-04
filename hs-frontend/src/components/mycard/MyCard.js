import './MyCard.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfileImage from './profile.png';
import api from '../../config/axiosConfig';
import { useState } from'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCirclePlus, faCircleUser} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { createRoot } from 'react-dom/client';

const MyCard = () => {
    const cardRef0 = useRef(null);
    const cardRef1 = useRef(null);
    const cardRef2 = useRef(null);
    const cardRef3 = useRef(null);
    
    const [showCreateProfile, setShowCreateProfile] = useState(false);
    const [errMex, setErrMex] = useState();
    const [mex, setMex] = useState();
    const handleCloseCreateProfile = () => {setShowCreateProfile(false); setErrMex(''); setMex('');}
    const handleShowCreateProfile = () => setShowCreateProfile(true);

    function removeProfile(id) {
        console.log('remove profile called')
        if(sessionStorage.getItem('profile'+id) != null){
            try{
                api.post('/profile/deleteProfile', 
                    {owner:sessionStorage.getItem('email'), profileName:sessionStorage.getItem('profile'+id)})
                    .then(res => {
                        if (res.data) {
                            sessionStorage.setItem('profile' + id, null);
                            switch (id) {
                                case 0:
                                    cardRef0.current.style.display='none';
                                    break;
                                case 1:
                                    cardRef1.current.style.display='none';
                                    break;     
                                case 2:
                                    cardRef2.current.style.display='none';
                                    break;
                                case 3:
                                    cardRef3.current.style.display='none';
                                    break;                    
                                default:
                                    break;
                            }
                            console.log("Removed profile " + id + " successfully");
                            
                        } else {
                            setErrMex('Failed to remove profile');
                            console.log(res.data);
                        }
                    });    
            } catch(err) {
                console.log(err)
            }
        
        } else {  
            console.log('no profile')
        }
    }

    function createProfile() {
        const newProfile = document.getElementById('create-newprofile').value;
        console.log('create profile called');
        let id = 0;
        try {
            api.post(
                '/profile/creation',
                {
                    owner: sessionStorage.getItem('email'),
                    profileName: newProfile  
                }
            ).then ( 
                response => {
                    if (response.data) {
                        for (let i = 3; i >= 0; i--) {
                            if(sessionStorage.getItem('profile' + i) == null) {
                                id = i;
                            }
                        }
                        
                        sessionStorage.setItem('profile'+ id, newProfile);
                        setMex('Profile ' + newProfile + " created successfully");
                        setTimeout(() => {
                            handleCloseCreateProfile()
                            switch (id) {
                                case 0:
                                    cardRef0.current.style.display='inline-block';
                                    break;
                                case 1:
                                    cardRef1.current.style.display='inline-block';
                                    break;
                                        
                                case 2:
                                    cardRef2.current.style.display='inline-block';
                                    break;
                                case 3:
                                    cardRef3.current.style.display='inline-block';
                                    break;                    
                                default:
                                    break;
                            }
                            createRoot(document.getElementById('profile-card-' + id)); 
                        }, 1200);
                        console.log("profile " + id + " created with name " + newProfile);                                   
                    } else {
                        setErrMex('Failed to create profile');
                        console.log(response.data);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }                        
    }

    return(
        <>
            {/* CREATE PROFILE MODAL */}
            <Modal show={showCreateProfile} onHide={handleCloseCreateProfile}>
                <Modal.Header closeButton>
                <Modal.Title>Create Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id='create-newprofile' placeholder='Profile Name' />
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

            <Card ref={cardRef0} id='profile-card-0' style={{  
                width: '18rem', 
                backgroundColor:'#2b2f35', 
                display: sessionStorage.getItem('profile0') == null ? 'none' : 'inline-block', 
                margin: '0.5%',  
            }}>
                <FontAwesomeIcon icon={faCircleUser} size="10x" style={{padding: "10%", color: "#e66100",}} />
                {/* <Card.Img variant="top" src={ProfileImage} style={{ width: '80%', height: 'auto'}}/> */}
                <Card.Body>
                    <Card.Title id='profile-0'>{sessionStorage.getItem('profile0')}</Card.Title>
                    <Button variant="outline-primary" onClick={handleShowCreateProfile}>Change ProfileName</Button>
                    <Button variant="outline-secondary" onClick={() => removeProfile(0)}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                    </Button>
                </Card.Body>
            </Card>

            <Card ref={cardRef1} id='profile-card-1' style={{  
                width: '18rem', 
                backgroundColor:'#2b2f35', 
                display: sessionStorage.getItem('profile1') == null ? 'none' : 'inline-block', 
                margin: '0.5%', 
            }}>
                <FontAwesomeIcon icon={faCircleUser} size="10x" style={{padding: "10%", color: "#e66100",}} />
                {/* <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/> */}
                <Card.Body>
                    <Card.Title id='profile-0'>{sessionStorage.getItem('profile1')}</Card.Title>
                    <Button variant="outline-primary" onClick={handleShowCreateProfile}>Change ProfileName</Button>
                    <Button variant="outline-secondary" onClick={() => removeProfile(1)}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                    </Button>
                </Card.Body>
            </Card>

            <Card ref={cardRef2} id='profile-card-2' style={{  
                width: '18rem', 
                backgroundColor:'#2b2f35', 
                display: sessionStorage.getItem('profile2') == null ? 'none' : 'inline-block', 
                margin: '0.5%', 
            }}>
                <FontAwesomeIcon icon={faCircleUser} size="10x" style={{padding: "10%", color: "#e66100",}} />
                {/* <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/> */}
                <Card.Body>
                    <Card.Title id='profile-0'>{sessionStorage.getItem('profile2')}</Card.Title>
                    <Button variant="outline-primary" onClick={handleShowCreateProfile}>Change ProfileName</Button>
                    <Button variant="outline-secondary" onClick={() => removeProfile(2)}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                    </Button>
                </Card.Body>
            </Card>

            <Card ref={cardRef3} id='profile-card-3' style={{  
                width: '18rem', 
                backgroundColor:'#2b2f35', 
                display: sessionStorage.getItem('profile3') == null ? 'none' : 'inline-block', 
                margin: '0.5%', 
            }}>
                <FontAwesomeIcon icon={faCircleUser} size="10x" style={{padding: "10%", color: "#e66100",}} />
                {/* <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/> */}
                <Card.Body>
                    <Card.Title id='profile-0'>{sessionStorage.getItem('profile3')}</Card.Title>
                    <Button variant="outline-primary" onClick={handleShowCreateProfile}>Change ProfileName</Button>
                    <Button variant="outline-secondary" onClick={() => removeProfile(3)}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                    </Button>
                </Card.Body>
            </Card>
            <Card id='add-profile-card' style={{  
                width: '18rem', 
                backgroundColor:'#2b2f35', 
                display: sessionStorage.getItem('profile0') != null &&
                         sessionStorage.getItem('profile1') != null &&
                         sessionStorage.getItem('profile2') != null &&
                         sessionStorage.getItem('profile3') != null 
                         ? 'none' : 'inline-block', 
                margin: '0.5%', 
            }}>
                <Card.Body>
                    <Button variant="outline-primary" onClick={() => handleShowCreateProfile()} 
                        style={{color: "#ff7800", width:"100%", height:"100%"}}>
                        <FontAwesomeIcon icon={faCirclePlus} size='5x' style={{color: "#ff7800"}} />
                    </Button>
                </Card.Body>
            </Card>
        </>
    );  
};

export default MyCard;