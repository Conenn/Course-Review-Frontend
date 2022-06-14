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
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/courses")
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


  return (
    <React.Fragment>
      <Header />
      <Routes>
        {!isLoading && <Route path="/" element={<Home data={data} />} />}
        <Route path="course/:id" element={<CourseDetails/>}/>
        <Route path="newreview" element={<AddReviewForm data={data}/>}/>
      </Routes>
    </React.Fragment>
  );
}
export default App;
