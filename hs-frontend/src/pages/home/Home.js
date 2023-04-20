import React from 'react';
import './Home.css'
//import session from '../../config/UserSession'
//import { useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbar';



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

                </div>
            </div>
        </>
    );
}

export default Home;