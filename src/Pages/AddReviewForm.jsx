import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "../UI/ReviewForm";
import ReactMarkdown from "react-markdown";

function AddReviewForm(props) {
  const title = ` # Sorry For the Confusion! 
  But please use the Create Link and Create Header button\n\n
  to make your links clickable and to add headers to your comments.\n\n
  Copy paste result after creating link/header`;

  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row>
          <Col>
            <ReactMarkdown children={title} />
          </Col>
          <Col xs={12}>
            <Form data={props.data} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default AddReviewForm;
