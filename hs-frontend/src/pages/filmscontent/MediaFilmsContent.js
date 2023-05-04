import './MediaFilmsContent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MyNavbar from '../../components/navbar/Navbar';

const MediaFilmsContent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <>
            <div className="films-content">
                <MyNavbar/>
                <div className="media-films-container"
                    style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: 'linear-gradient(to bottom, #2b2f35b2, #0000009c), url('+location.state.image.wallpaper+')'
                      }}
                >
                    <Container className='films-element-container' fluid>
                        <Row className='films-row1'>
                            <Col className='films-image-container'>
                                <img className='films-image' src={location.state.image.poster} alt={location.state.image.seriesTitle} />
                            </Col>

                            <Col>
                                <h1 id='films-title'>{location.state.image.title}</h1>
                                <h3 id='films-macro-plot'>{location.state.image.macroPlot}</h3>
                                <div className='films-generality'>
                                    <h6 id='films-cast'>Cast: {location.state.image.cast}</h6>    
                                    <h6 id='films-creator'>Creators: {location.state.image.creators}</h6>
                                    <h6 id='films-genres'>Genres: {location.state.image.tvGenre}</h6> 
                                    <p> {location.state.image.yearPlus} </p>
                                </div>
                                <div>
                                    <button className='film-player-btn'> Watch Now! </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );

}

export default MediaFilmsContent;