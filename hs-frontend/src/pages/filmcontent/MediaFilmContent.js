import './MediaFilmContent.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../../config/axiosPrimeConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MyNavbar from '../../components/Navbar';

const MediaFilmContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <>
            <div className="series-content">
                    <MyNavbar /> 
                    <Container>
                        <Row>
                            <Col>
                                <img src={location.state.image} alt={location.state.title} />
                            </Col>
                            
                            <Col>
                                <h1>{location.state.title}</h1>
                                <h2>{location.state.plot}</h2>
                            </Col>
                        </Row>                
                        <Row></Row>                

                    </Container>
                    
            </div>
        </>
    );
}

export default MediaFilmContent;
