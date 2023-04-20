import './MyCard.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProfileImage from './profile.png'
import api from '../config/axiosConfig';
import { useState } from'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';


const MyCard = () => {
 

            function removeProfile(id) {
                if(sessionStorage.getItem('profile'+id) !== null){
                    try{
                        api.post('/profile/deleteProfile', 
                            {owner:sessionStorage.getItem('email'), profileName:sessionStorage.getItem('profile'+id)})
                            .then(res => {
                                console.log(res)
                            })
                    }catch(err){
                        console.log(err)
                    }
                
                }else{  
                    console.log('no profile')
                }
            }



            return(
              <>
                <Card  id='profile-card-0' style={{  width: '18rem', 
                    backgroundColor:'#2b2f35', 
                    display: 'inline-block', 
                    margin: '0.5%', 
                    visibility: sessionStorage.getItem('profile0') == null ? 'hidden' : 'visible', 
                    }}>
                    <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                        <Card.Body>
                            <Card.Title id='profile-0'>{sessionStorage.getItem('profile0')}</Card.Title>
                                <Button variant="outline-primary" >Change ProfileName</Button>
                                <Button variant="outline-secondary" onClick={removeProfile(0)}>
                                    <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                                </Button>
                    </Card.Body>
                </Card>

                <Card id='profile-card-1' style={{  width: '18rem', 
                backgroundColor:'#2b2f35', 
                display: 'inline-block', 
                margin: '0.5%', 
                visibility: sessionStorage.getItem('profile1') == null ? 'hidden' : 'visible', 
                }}>
                <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                    <Card.Body>
                        <Card.Title id='profile-0'>{sessionStorage.getItem('profile1')}</Card.Title>
                            <Button variant="outline-primary" >Change ProfileName</Button>
                            <Button variant="outline-secondary" onClick={removeProfile(1)}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                    </Button>
                </Card.Body>
                </Card>


                    <Card id='profile-card-2' style={{  width: '18rem', 
                                        backgroundColor:'#2b2f35', 
                                        display: 'inline-block', 
                                        margin: '0.5%', 
                                        visibility: sessionStorage.getItem('profile2') == null ? 'hidden' : 'visible', 
                                        }}>
                                        <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                                            <Card.Body>
                                                <Card.Title id='profile-0'>{sessionStorage.getItem('profile2')}</Card.Title>
                                                    <Button variant="outline-primary" >Change ProfileName</Button>
                                                    <Button variant="outline-secondary" >
                                                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                                            </Button>
                                        </Card.Body>
                                    </Card>


                    <Card  id='profile-card-3' style={{  width: '18rem', 
                                        backgroundColor:'#2b2f35', 
                                        display: 'inline-block', 
                                        margin: '0.5%', 
                                        visibility: sessionStorage.getItem('profile3') == null ? 'hidden' : 'visible', 
                                        }}>
                                        <Card.Img variant="top" src={ProfileImage} style={{ width: '100%'}}/>
                                            <Card.Body>
                                                <Card.Title id='profile-0'>{sessionStorage.getItem('profile3')}</Card.Title>
                                                    <Button variant="outline-primary" >Change ProfileName</Button>
                                                    <Button variant="outline-secondary" >
                                                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ff7800"}} />
                                            </Button>
                                        </Card.Body>
                                    </Card>

            </>
            );

          
};

export default MyCard;