import './MediaSeriesContent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Accordion from 'react-bootstrap/esm/Accordion';
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
                    <Container className='series-element-container' fluid>
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
                                    <p>{location.state.image.yearPlus}</p>
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
                                                                            <Col className='episode-generality' xs={9}>
                                                                                <h3>Episode {episode.episodeNumber}: {episode.title}</h3>
                                                                                <p>{episode.episodePlot}</p>
                                                                            </Col>
                                                                            <Col className='video-player-container'>
                                                                            <button className='player-btn'
                                                                                style={
                                                                                    {
                                                                                        display: sessionStorage.getItem(location.state.image.provider) === 'true' ? 'none':'inline',
                                                                                    }
                                                                                }
                                                                                onClick={() => navigate('/account')}
                                                                            >
                                                                                Add Subscription
                                                                            </button>
                                                                                
                                                                                
                                                                                <button className='player-btn'
                                                                                    style={
                                                                                        {
                                                                                            display: sessionStorage.getItem(location.state.image.provider) === 'false' ? 'none':'inline'
                                                                                        }
                                                                                    } 
                                                                                    disabled={episode.url === null ? true : false}
                                                                                    onClick={() => navigate('/episodes', {state:{url:episode.url}})}>
                                                                                    {episode.url === null ? 'Coming Soon' : 'Watch Now'}
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
