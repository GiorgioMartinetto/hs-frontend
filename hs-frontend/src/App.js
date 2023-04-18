import './App.css';
import {Routes,Route} from'react-router-dom';
import Login from './pages/login/Login';
import Reset from './pages/login/Reset';
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import Series from './pages/series/Series';


function App() {
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
      </Routes>
    </>
  );
}

export default App;
