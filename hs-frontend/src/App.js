import './App.css';
import {Routes,Route} from'react-router-dom';
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';


function App() {
  return (
    <>
      <div className='app-container'>
        
      </div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
