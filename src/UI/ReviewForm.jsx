import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import ComboBox from "./ComboBox";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ReviewForm(props) {
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [rating, setRating] = useState();
  const [workload, setWorkload] = useState();
  const [comment, setComment] = useState();

  function commentInputHandler(event) {
    setComment(event.target.value);
  }

  function ratingInputHandler(event) {
    setRating(event.target.value);
  }

  function courseInputHandler(event) {
    setCourse(event.target.innerText);
  }

  function workloadInputHandler(event) {
    setWorkload(event.target.value);
  }

  function sumbitHandler() {
    const selectedCourseId = course.split("-")[0].replace(/ /g, "");

    const selectedCourse = {
      courseId: selectedCourseId,
      rating: rating,
      workload: workload,
      comment: comment,
    };

    const response = fetch("http://localhost:8080/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCourse),
    });
  }

  return (
    <Form>
      <Form.Group
        onClick={courseInputHandler}
        className="mb-3 mt-3"
        controlId="formBasicCourse"
      >
        <Form.Label>Course</Form.Label>
        <ComboBox data={props.data} />
      </Form.Group>
      <Form.Group
        onChange={ratingInputHandler.bind(this)}
        className="mb-3 mt-3"
        controlId="formBasicRating"
      >
        <Form.Label>Course Rating</Form.Label>
        <Form.Control type="number" placeholder="Enter Rating" />
      </Form.Group>
      <Form.Group
        onChange={workloadInputHandler.bind(this)}
        className="mb-3"
        controlId="formBasicWorkload"
      >
        <Form.Label>Workload</Form.Label>
        <Form.Control type="number" placeholder="Enter Workload" />
      </Form.Group>
      <Form.Group
        onChange={commentInputHandler.bind(this)}
        className="mb-3"
        controlId="formBasicComment"
      >
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={5} placeholder="Enter Comment" />
      </Form.Group>
      <Button onClick={sumbitHandler} type="sumbit" variant="contained">
        Add Review
      </Button>
    </Form>
  );
}
export default ReviewForm;
