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
        console.log('console logout called');
        navigate('/login');
    }

    // function search(){
    //     /*toggle search input form visibility */
    // }
    return (
        
            <Navbar bg="dark" expand="sm">

            <Container id='navbar-container'>
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
                    <NavDropdown.Item onClick={() => navigate('/account')}>Account Settings</NavDropdown.Item>   
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logout()}> Logout </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

            
    
    );
}

export default MyNavbar;