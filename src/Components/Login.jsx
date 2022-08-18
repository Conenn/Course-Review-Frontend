import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Firebase-Config";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { AuthProvider, useAuth } from "../Contexts/AuthContexts";
import { Alert } from "bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, currentUser, sendVerificationEmail } = useAuth();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  function sendEmailHandler(e) {
    sendVerificationEmail(currentUser);
  }

  if (currentUser && !currentUser.emailVerified) {
    return (
      <React.Fragment>
        <p>Verify Email </p>
        <button onClick={sendEmailHandler}>verify</button>
      </React.Fragment>
    );
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
              {currentUser && !currentUser.emailVerified && (
                <p>Please verify email</p>
              )}
              <h2 className="text-center mb-4">Login</h2>
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
                <Button disabled={loading} variant="primary" type="submit">
                  Log in
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                {" "}
                <Link to="/forgotpassword">Forgot password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
export default Signup;
