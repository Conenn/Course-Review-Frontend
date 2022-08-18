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
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { AuthProvider } from "./Contexts/AuthContexts";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://wgu-course-review-api.herokuapp.com/api/courses")
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
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <AuthProvider>
        <Header />
        <Routes>
          {!isLoading && <Route path="/" element={<Home data={data} />} />}
          <Route path="course/:id" element={<CourseDetails />} />
          <Route
            path="/newreview"
            element={
              <PrivateRoute>
                <AddReviewForm data={data} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </React.Fragment>
  );
}
export default App;
