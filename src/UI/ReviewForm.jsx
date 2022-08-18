import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import ComboBox from "./ComboBox";
import { useAuth } from "../Contexts/AuthContexts";
import { useRef } from "react";
import RowRadioButtonsGroup from "./RadioButton";
import { useNavigate } from "react-router-dom";

function ReviewForm(props) {
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState();
  const [difficulty, setDifficulty] = useState();
  const [posted, setPosted] = useState(false);
  const [link, setLink] = useState();
  const [header, setHeader] = useState();
  const [token, setToken] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const workloadRef = useRef();
  const commentRef = useRef();
  let navigate = useNavigate();

  function courseInputHandler(event) {
    setCourse(event.target.innerText);
  }

  function onLinkChange(event) {
    setLink(event.target.value);
  }

  function onHeaderChange(event) {
    setHeader(event.target.value);
  }

  function ratingChangeHandler(e) {
    setRating(e.target.value);
  }
  function difficultyChangeHandler(e) {
    setDifficulty(e.target.value);
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

  // Get user access token and set state
  useAuth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      setToken(idToken);
    })
    .catch(function (error) {
      console.log(error);
    });

  // Get current user to send email in post request
  const user = useAuth().currentUser;
  function sumbitHandler(e) {
    e.preventDefault();

    const selectedCourseId = course.split("-")[0].replace(/ /g, "");
    const selectedCourse = {
      email: user.email,
      courseId: selectedCourseId,
      difficulty: difficulty,
      rating: rating,
      workload: workloadRef.current.value,
      comment: commentRef.current.value,
    };

    fetch("https://wgu-course-review-api.herokuapp.com/api/post/reviews", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCourse),
    })
      .then((res) => {
        if (res.ok) {
          setPosted(true);
          navigate("/");
          window.location.reload();
        } else {
          console.log(res);
          setError(true);
          setErrorMsg("Failed to post review");
        }
      })
      .catch((error) => {
        console.log(error);
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
        onChange={ratingChangeHandler}
        className="mb-3 mt-3"
        controlId="formRating"
      >
        <Form.Group
          onChange={ratingChangeHandler}
          className="mb-3 mt-3"
          controlId="formRating"
        ></Form.Group>
        <RowRadioButtonsGroup label="Rating" />
      </Form.Group>
      <Form.Group
        onChange={difficultyChangeHandler}
        className="mb-3 mt-3"
        controlId="formDifficulty"
      >
        <RowRadioButtonsGroup label="Difficulty" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWorkload">
        <Form.Label>Total Time For Completion</Form.Label>
        <Form.Control
          ref={workloadRef}
          min="1"
          max="200"
          type="number"
          placeholder="How long did it take you to finish?"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicComment">
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
        <Form.Control
          ref={commentRef}
          as="textarea"
          rows={7}
          placeholder="Enter Comment"
        />
      </Form.Group>
      <Button onClick={sumbitHandler} type="sumbit" variant="contained">
        Add Review
      </Button>
      {error && <div className="mt-2">{errorMsg}</div>}
      {posted && !error && <div className="mt-2">Sumbitted Review!</div>}
    </Form>
  );
}
export default ReviewForm;
