import './MediaSeriesContent.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../../config/axiosPrimeConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Accordion from 'react-bootstrap/esm/Accordion';

import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MyNavbar from '../../components/Navbar';
const MediaSeriesContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <>
            <div className="series-content">
                    <MyNavbar /> 
                    <Container>
                        <Row>
                            <Col>
                                <img src={location.state.image.seriesImage} alt={location.state.image.seriesTitle} />
                                <div>Genres: {location.state.image.tvGenre}</div>

                            </Col>
                            
                            <Col>
                                <h1>{location.state.image.seriesTitle}</h1>
                                <h3>{location.state.image.macroPlot}</h3>
                                <h6>Cast: {location.state.image.cast}</h6>    
                                <h6>Creators: {location.state.image.creators}</h6>    
                            </Col>
                        </Row>                
                        <Row>
                            <Col>
                                <Accordion bg='hide' defaultActiveKey='0'>
                                {
                                    location.state.image.seasons.map(
                                        season => (
                                                <Accordion.Item eventKey={location.state.image.id}>
                                                    <Accordion.Header>{season.name}</Accordion.Header>
                                                    <Accordion.Body>
                                                        {
                                                            season.episodes.map(
                                                                episode => (
                                                                    <div>
                                                                        <h3>Episode {episode.episodeNumber}: {episode.title}</h3>
                                                                        <h4>{episode.episodePlot}</h4>
                                                                    </div>
                                                                )
                                                            )
                                                        }
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            
                                        )
                                    )
                                }
                                </Accordion>
                                
                            </Col>
                        </Row>                

                    </Container>
                    
            </div>
        </>
    );
}

export default MediaSeriesContent;
