import './App.css';
import {Routes,Route} from'react-router-dom';
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration';


function App() {
  return (
    <>
      <div className='app-container'>
        
      </div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
