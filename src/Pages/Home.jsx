import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap/";
import { useState } from "react";
import CourseTable from "../UI/CourseTable";
import SearchBar from "../UI/SearchBar";

function Home(props) {
  const [filteredCourses, setFilteredCourses] = useState(props.data);

  //Filter courses by matching first n letters of course by search value
  function filteredDataHandler(event) {
    const filtered = props.data.filter(
      (course) =>
        course.name.toLowerCase().substring(0, event.target.value.length) ===
        event.target.value.toLowerCase()
    );
    setFilteredCourses(filtered);
  }

  return (
    <Container className="mt-5">
      <Row className="align-items-center justify-content-center">
        <Col xs={10}>
          <SearchBar onChange={filteredDataHandler} />
          <CourseTable data={filteredCourses} />
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
