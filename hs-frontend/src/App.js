import './App.css';
import {Routes,Route} from'react-router-dom';
import Login from './pages/login/Login';
import Reset from './pages/login/Reset';
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import Series from './pages/series/Series';
import React, { Component } from 'react';
import SeriesContent from './pages/seriescontent/MediaSeriesContent';
import FilmContent from './pages/filmcontent/MediaFilmContent';

function App () {
    return (
      <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/home' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/series' element={<Series />} />
          <Route path='/seriescontent' element={<SeriesContent />} />
          <Route path='/filmcontent' element={<FilmContent />} />
        </Routes>
      </>
    );
}

export default App;
