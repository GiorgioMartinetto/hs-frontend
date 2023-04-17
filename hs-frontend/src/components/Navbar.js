import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const MyNavbar = () => {
    const navigate=useNavigate();
        
    function logout() {
        sessionStorage.clear();
        navigate('/login');
    }

    // function search(){
    //     /*toggle search input form visibility */
    // }
    return (
        
            // <nav className='navbar navbar-expand-sm bg-dark btn-group' id='menu'>
         

               
            //     <button id='film-btn' className='btn btn-dark' onClick={() => navigate('/film')}>Film</button>
          
            //     <button id='tv-series-btn' className='btn btn-dark' onClick={() => navigate('/tv-series')}>TV Series</button>
            
            //     <button id='genres-btn' className='btn btn-dark' onClick={() => navigate('/genres')}>Genres</button>
                
            //     {/* <button id='search-btn' className='btn btn-dark' onClick={search}>Search</button>
            //     <input id='search' placeholder='Titles or Genres' hidden/>
            //     <input className='btn btn-dark' type='submit' value={'go'} hidden/>" */}

            //     <div className="dropdown">
            //     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            //         {sessionStorage.getItem('userName')}
            //     </button>
            //     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            //         <li className='dropdown-item '> Logout </li>
            //     </ul>
            //     </div>
              
            //     <button id='profiles-btn' className='btn btn-dark' onClick={() => navigate('/profiles')}>Change Profile</button>
            // </nav>


            <Navbar bg="dark" expand="sm">


            <Container>
              <Navbar.Brand onClick={() => navigate('/home')}>
                <img id='logo-home' src = {require('./logo_background.png')} className="d-inline-block align-top" alt='Logo Home'/>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
                  <Nav.Link onClick={() => navigate('/series')}>Series</Nav.Link>
                  <Nav.Link href="#link">Films</Nav.Link>
                  <NavDropdown title={sessionStorage.getItem('userName')} id="basic-nav-dropdown">
                    <NavDropdown.Item>Account Settings</NavDropdown.Item>   
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}> Logout </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

            
    
    );
}

export default MyNavbar;