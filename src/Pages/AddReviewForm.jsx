import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "../UI/ReviewForm";
import { Typography } from "@mui/material";

function AddReviewForm(props) {
  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row>
          <Col>
            <Typography>
              To create links use this format -> [LinkName](https://example.com)
            </Typography>
            <Typography>
              {" "}
              To create headers use this format -> # HeaderText
            </Typography>
            <Typography>
              {" "}
              To create bold text use this format -> ***Text to Be Bolded***
            </Typography>
            <br />
            <Typography>
              {" "}
              You can also use the create link/header buttons by pasting in text
              and the copying result.
            </Typography>
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
