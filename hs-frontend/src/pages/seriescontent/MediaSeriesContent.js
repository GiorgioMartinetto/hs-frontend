import './MediaSeriesContent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Accordion from 'react-bootstrap/esm/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MyNavbar from '../../components/navbar/Navbar';
const MediaSeriesContent = () => {
 
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <>
            <div className="series-content">
                    <MyNavbar /> 
                    <div className='media-series-container' 
                        style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: 'linear-gradient(to bottom, #2b2f35b2, #0000009c), url('+location.state.image.wallpaper+')'
                          }}
                    >
                    <Container className='series-element-container'>
                        <Row className='series-row1'>
                            <Col className='series-image-container'>
                                <img className='series-image' src={location.state.image.seriesImage} alt={location.state.image.seriesTitle} />
                            </Col>
                            
                            <Col>
                                <h1 id='series-title'>{location.state.image.seriesTitle}</h1>
                                <h3 id='series-macro-plot'>{location.state.image.macroPlot}</h3>
                                <div className='series-generality'>
                                    <h6 id='series-cast'>Cast: {location.state.image.cast}</h6>    
                                    <h6 id='series-creator'>Creators: {location.state.image.creators}</h6>
                                    <h6 id='series-genres'>Genres: {location.state.image.tvGenre}</h6> 
                                </div>
                            </Col>
                        </Row>                
                        <Row className='series-row2'>
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
                                                                    <>
                                                                        <Row>
                                                                            <Col className='episode-generality'>
                                                                                <h3>Episode {episode.episodeNumber}: {episode.title}</h3>
                                                                                <p>{episode.episodePlot}</p>
                                                                            </Col>
                                                                            <Col className='video-player-container'>
                                                                                <button className='player-btn' onClick={() => navigate('/episodes', {state: {episode}})}>
                                                                                    <FontAwesomeIcon 
                                                                                        icon={faCirclePlay} 
                                                                                        size='5x'
                                                                                        style={{color: "#c64600",}} 
                                                                                    /> 
                                                                                </button>
                                                                            </Col>
                                                                        </Row>
                                                                    </>
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
            </div>
        </>
    );
}

export default MediaSeriesContent;
