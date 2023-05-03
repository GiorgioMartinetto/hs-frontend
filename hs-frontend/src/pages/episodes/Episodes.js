import './Episodes.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../../config/axiosPrimeConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import MyNavbar from '../../components/Navbar';
import ReactPlayer from "react-player";
const Episodes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(
        () => {
            console.log('get episode content');
            
        }, 
        []
    );

    return(
        <>
            <MyNavbar /> 
            <div className="episode-content">
                <ReactPlayer
                    url={location.state.episode.url}//"https://www.youtube.com/watch?v=nkvXTVQ1lxU"
                    controls={true}
                    width="100%"
                    height="780px"//trovare il modo di farfli occupare il resto dello schermo in modo responsivo (="100%" non funziona)
                    playing={false}
                    muted={false}
                    loop={false}
                    volume={0.5}
                />   
            </div>
        </>
    );
}

export default Episodes;
