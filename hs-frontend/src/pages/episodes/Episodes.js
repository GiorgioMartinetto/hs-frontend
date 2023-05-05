import './Episodes.css';
import {useLocation } from 'react-router-dom';
import MyNavbar from '../../components/navbar/Navbar';
import ReactPlayer from "react-player";

const Episodes = () => {

    const location = useLocation();

    return(
        <>
            <MyNavbar /> 
            <div className="episode-content">
                <ReactPlayer
                    url={location.state.url}
                    controls={true}
                    width='100%'
                    height='100%'//trovare il modo di farfli occupare il resto dello schermo in modo responsivo (="100%" non funziona)
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
