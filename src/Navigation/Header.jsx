import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import AlertDialogSlide from "../UI/AlertDialogSlide";

function Header() {
  let content = `This website was created so WGU students can review and rate courses and to keep it organized for incoming students to 
  prepare for upcoming courses by getting a feel of what is expected of them as well the time they might have to dedicate to a given course.\n\n
  The workload for a course is given as the total time it took a student to complete the course and is averaged by all the reviews posted for that course,
  the rating will be 1-5 and will give a quick overview of what past students thought about the course personally. \n\n\n
  ***While posting reviews please keep in mind Western Governors University's Policy on Academic Integrity!***
  `;

  let updates = `***29th June*** - I've added a difficulty field to the courses and updated type to display WGU as 
                i will be adding courses from SDC, Straigtherline and Sophia as well.`

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">WGU Course Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/newreview">Add Review</Nav.Link>
            <AlertDialogSlide
              title={"Why and How This Works"}
              buttonName={"Learn More"}
              content={content}
            />
            <AlertDialogSlide
              title={"App Updates"}
              buttonName={"What's New"}
              content={updates}
            />
          </Nav>
          <Nav>
            <Nav.Link target={"_blank"} href="https://github.com/Conenn">
              Github
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
