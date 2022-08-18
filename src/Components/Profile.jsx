import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import CommentCard from "../UI/CommentCard";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://wgu-course-review-api.herokuapp.com/api/reviews`)
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

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          {data.map((review) => {
            // Display user created reviews
            if (review.email === currentUser.email) {
              return (
                <Row key={review.id} className="mt-3">
                  <CommentCard course={2} data={review} />
                </Row>
              );
            }
          })}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
