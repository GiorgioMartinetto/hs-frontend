import './App.css';
import {Routes,Route} from'react-router-dom';
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
