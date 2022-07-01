import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import CommentCard from "../UI/CommentCard";

function CourseDetails(props) {
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currCourse = {
    id: state.id,
    name: state.name,
    avgWorkload: state.avgWorkload,
    rating: state.rating,
    type: state.type,
  };

  useEffect(() => {
    fetch(
      `https://wgu-course-review-api.herokuapp.com/courses/${currCourse.id}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currCourse.id]);

  if (!isLoading && data.length === 0) {
    return (
      <React.Fragment>
        <Container>
          <Typography
            mt={15}
            className="text-center align-items-center"
            variant="h2"
          >
            {" "}
            No Reviews Yet...{" "}
          </Typography>
        </Container>
      </React.Fragment>
    );
  }

  if (!isLoading && data.length > 0) {
    return (
      <Container className="mt-5">
        {data.map((review) => {
          return (
            <Row key={review.id} className="mt-3">
              <CommentCard course={currCourse.name} data={review} />
            </Row>
          );
        })}
      </Container>
    );
  }
}
export default CourseDetails;
