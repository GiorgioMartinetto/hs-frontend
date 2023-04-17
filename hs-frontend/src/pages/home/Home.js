import React from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate();
    function logout() {
        /*
            TODO: eliminate user session data
        */
        navigate('/login');
    }

    function search(){
        /*toggle search input form visibility */
    }

    return(
        /*
            TODO:   implement user session data control and display 
                    page only if the user is correctly logged-in
                    otherwise redirect to login page or show different 
                    page for non logged-in users
        */
        <div className="home">
            <nav className='navbar navbar-expand-sm bg-dark btn-group' id='menu'>
                <button id='home-btn' className='btn btn-dark' onClick={() => navigate('/home')}>Home</button>
                {/* TODO: create film page */}
                <button id='film-btn' className='btn btn-dark' onClick={() => navigate('/film')}>Film</button>
                {/* TODO: create tv-series page */}
                <button id='tv-series-btn' className='btn btn-dark' onClick={() => navigate('/tv-series')}>TV Series</button>
                {/* TODO: create genres page */}
                <button id='genres-btn' className='btn btn-dark' onClick={() => navigate('/genres')}>Genres</button>
                {/* TODO: create search page */}
                <button id='search-btn' className='btn btn-dark' onClick={search}>Search</button>
                <input id='search' placeholder='Titles or Genres' hidden/>
                <input className='btn btn-dark' type='submit' value={'go'} hidden/>
                {/* TODO: create profiles page */}
                <button id='profiles-btn' className='btn btn-dark' onClick={() => navigate('/profiles')}>Change Profile</button>
                {/* TODO: create account page */}
                <button id='account-btn' className='btn btn-dark' onClick={() => navigate('/account')}>Account</button>
                <button id='logout-btn' className='btn btn-dark' onClick={logout}>Logout</button>
            </nav>
            <div id='content-container'>
                {/* TODO: implement content fetch from server and loading */}
            </div>
        </div>
    );
}

export default Home;