import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">WGU Course Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/newreview">Add Review</Nav.Link>        
          </Nav>
          <Nav>
            <Nav.Link href=".">Github</Nav.Link>
            <Nav.Link eventKey={2} href="/">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
