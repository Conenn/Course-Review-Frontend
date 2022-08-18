import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import AlertDialogSlide from "../UI/AlertDialogSlide";
import { useAuth } from "../Contexts/AuthContexts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  let content = `This website was created so WGU students can review and rate courses and to keep it organized for incoming students to 
  prepare for upcoming courses by getting a feel of what is expected of them as well the time they might have to dedicate to a given course.\n\n
  The workload for a course is given as the total time it took a student to complete the course and is averaged by all the reviews posted for that course,
  the rating will be 1-5 and will give a quick overview of what past students thought about the course personally. \n\n\n
  ***While posting reviews please keep in mind Western Governors University's Policy on Academic Integrity!***
  `;

  let resources = `***Discord:*** [https://discord.gg/WGU](https://discord.gg/unwgu) \n\n
  ***Github Student Developer pack:*** [https://github.com](https://education.github.com/pack) \n\n
  ***Reddit:*** [https://reddit.com/r/WGU/](https://www.reddit.com/r/WGU/)\n\n
  ***Amazing Google Drive of WGU Courses:*** [https://drive.google.com/WGU](https://drive.google.com/drive/u/4/folders/1sqzEuxJOsouYPLkKUqtSXU_Lp0rVOVg2)
  `

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  async function logoutHandler(e) {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

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
              title={"Resources Recommended by WGU Students"}
              buttonName={"Resources"}
              content={resources}
            />
          </Nav>
          <Nav>
            {!currentUser && <Nav.Link href="/login">Log in</Nav.Link>}
            {currentUser && <Nav.Link href="/profile">Profile</Nav.Link>}
            <Nav.Link target={"_blank"} href="https://github.com/Conenn/Course-Review-Frontend/issues">
              Github
            </Nav.Link>
            {currentUser && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
