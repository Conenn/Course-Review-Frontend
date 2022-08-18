import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContexts";
import { Link } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();

  // Only allow wgu.edu domains
  function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@wgu\.edu$/.test(email);
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (!validateEmail(emailRef.current.value)) {
      return setError("wgu.edu email is required");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
      setError("Failed to create account");
      console.log(err);
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
              {error && <p>{error}</p>}
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Confirm password"
                  />
                </Form.Group>
                <Button disabled={loading} variant="primary" type="submit">
                  Sign up
                </Button>
              </Form>
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
export default Signup;
