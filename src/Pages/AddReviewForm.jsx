import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "../UI/ReviewForm";
import ReactMarkdown from 'react-markdown'

function AddReviewForm(props) {
  const title = ` # Sorry For the Confusion! 
  But please wrap any links that you wish to share like this...\n\n
  [LinkName]-(https://example.com) But With No Dash or Spacing in Between!\n\n 
  Full link with protocol such as Https is necessary to create a url.\n\n
  To create a Header/H1 use a hashtag like this \n\n 
  #-ExampleHeader Again no Dash but spacing is necessary!`

  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row>
          <Col>
            <ReactMarkdown 
            linkTarget={"_blank"}
            children={title}/>
          </Col>
          <Col xs={12} >
            <Form data={props.data} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default AddReviewForm;
