import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Col, Row } from "react-bootstrap/";
import CourseTable from '../UI/CourseTable'


function Home(props) {
  return (
    <Container className="mt-5">
      <Row className="align-items-center justify-content-center">
        <Col xs={10}>
        <CourseTable data={props.data} />
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
