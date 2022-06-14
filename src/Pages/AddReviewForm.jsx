import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "../UI/ReviewForm";


function AddReviewForm(props) {
  return (
    <React.Fragment>
      <Container className="mt-5">
          <Form data={props.data}/>
      </Container>
    </React.Fragment>
  );
}
export default AddReviewForm;
