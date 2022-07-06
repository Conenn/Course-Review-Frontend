import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import ComboBox from "./ComboBox";
import "bootstrap/dist/css/bootstrap.min.css";

function ReviewForm(props) {
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState();
  const [workload, setWorkload] = useState();
  const [difficulty, setDifficulty] = useState();
  const [comment, setComment] = useState();
  const [posted, setPosted] = useState(false);
  const [link, setLink] = useState();
  const [header, setHeader] = useState();

  function commentInputHandler(event) {
    setComment(event.target.value);
  }

  function courseInputHandler(event) {
    setCourse(event.target.innerText);
  }

  function ratingInputHandler(event) {
    if (event.target.value > 5) {
      setRating(5);
    } else if (event.target.value < 1) {
      setRating(1);
    } else {
      setRating(event.target.value);
    }
  }

  function workloadInputHandler(event) {
    if (event.target.value > 60) {
      setWorkload(60);
    } else if (event.target.value < 1) {
      setWorkload(1);
    } else {
      setWorkload(event.target.value);
    }
  }

  function difficultyInputHandler(event) {
    if (event.target.value > 5) {
      setDifficulty(5);
    } else if (event.target.value < 1) {
      setDifficulty(1);
    } else {
      setDifficulty(event.target.value);
    }
  }

  function onLinkChange(event) {
    setLink(event.target.value);
  }

  function onHeaderChange(event) {
    setHeader(event.target.value);
  }

  function linkify() {
    //hack to get hostname of a url without jquery/regex
    var pattern = /^https:\/\//i;
    var a = document.createElement("a");
    a.href = link;

    // Check if pattern is there in the string
    // or not with .test() method
    if (pattern.test(link)) {
      setLink(`[${a.hostname}](${link})`);
    } else {
      setLink(`[${a.hostname}](https://${link})`);
    }
  }

  function headify() {
    setHeader(`# ${header}`);
  }

  function sumbitHandler() {
    const selectedCourseId = course.split("-")[0].replace(/ /g, "");

    const selectedCourse = {
      courseId: selectedCourseId,
      rating: rating,
      workload: workload,
      comment: comment,
    };

    fetch("https://wgu-course-review-api.herokuapp.com/api/post/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCourse),
    }).then((res) => {
      if (res.ok) {
        setPosted(true);
      } else {
        console.log("Error", res);
      }
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
        <Form.Control
          value={rating}
          min="1"
          max="5"
          type="number"
          placeholder="How would you rate this course 1/5?"
        />
      </Form.Group>
      <Form.Group
        onChange={workloadInputHandler.bind(this)}
        className="mb-3"
        controlId="formBasicWorkload"
      >
        <Form.Label>Total Time For Completion</Form.Label>
        <Form.Control
          value={workload}
          min="1"
          max="120"
          type="number"
          placeholder="How long did it take you to finish?"
        />
      </Form.Group>
      <Form.Group
        onChange={difficultyInputHandler.bind(this)}
        className="mb-3"
        controlId="formBasicDifficulty"
      >
        <Form.Label>Difficulty</Form.Label>
        <Form.Control
          value={difficulty}
          min="1"
          max="5"
          type="number"
          placeholder="How hard would you say this course was 1/5?"
        />
      </Form.Group>
      <Form.Group
        onChange={commentInputHandler.bind(this)}
        className="mb-3"
        controlId="formBasicComment"
      >
        <Form.Label>Comment</Form.Label>
        <Button onClick={linkify}>Create Link</Button>
        <input
          style={{ width: "20%" }}
          onChange={onLinkChange}
          value={link}
          type="text"
          placeholder="Enter link"
        />
        <Button onClick={headify}>Create Header</Button>
        <input
          style={{ width: "15%" }}
          onChange={onHeaderChange}
          value={header}
          type="text"
          placeholder="Enter Header"
        />
        <Form.Control as="textarea" rows={7} placeholder="Enter Comment" />
      </Form.Group>
      <Button onClick={sumbitHandler} type="sumbit" variant="contained">
        Add Review
      </Button>
      {posted && <div className="mt-2">Sumbitted Review!</div>}
    </Form>
  );
}
export default ReviewForm;
