import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Firebase-Config";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { AuthProvider, useAuth } from "../Contexts/AuthContexts";
import { Alert } from "bootstrap";
import { Link } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ForgotPassword = () => {
  let navigate = useNavigate();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <React.Fragment>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Reset password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Button disabled={loading} variant="primary" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                {" "}
                <Link to="/forgotpassword">Forgot password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
export default ForgotPassword;
