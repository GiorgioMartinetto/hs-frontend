import React from 'react';
import './Home.css'
//import session from '../../config/UserSession'
//import { useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbar';
import NetflixContent from '../../components/NetflixContent';
import PrimeContent from '../../components/PrimeContent';

const Home = () => {
    return(
        /*
            TODO:   implement user session data control and display 
                    page only if the user is correctly logged-in
                    otherwise redirect to login page or show different 
                    page for non logged-in users
        */
        <>
            <div className="home">
                <MyNavbar /> 
                <div id='content-container'>
                    {/* TODO: implement content fetch from server and loading */}
                    <h1 className='text-highstreaming-netflix'>
                        Netflix
                    </h1>
                    <NetflixContent/>
                    <h1 className='text-highstreaming-prime'>
                        Amazon Prime
                    </h1>
                    <PrimeContent/>
                </div>
            </div>
        </>
    );
}

export default Home;