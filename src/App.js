import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Navigation/Header";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseDetails from "./Pages/CourseDetails";
import Home from "./Pages/Home";
import AddReviewForm from "./Pages/AddReviewForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetch("https://wgu-course-review-api.herokuapp.com/courses")
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
  }, []);

  // useEffect(() => {
  //   fetch(`https://wgu-course-review-api.herokuapp.com/api/reviews/`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .then((res) => {
  //       setReviews(res);
  //     })
  //     .catch((error) => {
  //       console.log("Error: ", error);
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoadingReviews(false);
  //     });
  // }, []);

  //Calculate averages until backend method is fixed
  // for (let course in data) {
  //   let counter = 0;
  //   for (const review in reviews) {
  //     if (data[course].id === reviews[review].courseId) {
  //       counter += 1;
  //       data[course].rating = parseFloat(
  //         reviews[review].rating / counter
  //       ).toFixed(1);
  //       data[course].avgWorkload = parseFloat(
  //         reviews[review].workload / counter
  //       ).toFixed(1);
  //       data[course].difficulty = parseFloat(reviews[review].difficulty / counter).toFixed(1)
  //     }
  //   }
  // }

  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        {!isLoading && <Route path="/" element={<Home data={data} />} />}
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="newreview" element={<AddReviewForm data={data} />} />
      </Routes>
    </React.Fragment>
  );
}
export default App;
