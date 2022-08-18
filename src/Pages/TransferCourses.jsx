import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap/";
import React, { useState } from "react";
import SearchBar from "../UI/SearchBar";
import Transfer from "../UI/Transfer";

function TransferCourses(props) {
  const [filteredCourses, setFilteredCourses] = useState(props.data);

  //Filter courses by matching first n letters of course by search value
  function filteredDataHandler(event) {
    console.log(event.target.value);
    const filtered = props.data.filter(
      (course) =>
        course.name.toLowerCase().substring(0, event.target.value.length) ===
        event.target.value.toLowerCase()
    );
    setFilteredCourses(filtered);
  }

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col xs={10}>
          <SearchBar onChange={filteredDataHandler} />
          <Transfer data={filteredCourses} />
        </Col>
      </Row>
    </Container>
  );
}
export default TransferCourses;
