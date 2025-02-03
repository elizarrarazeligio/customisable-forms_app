import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useRef } from "react";

function LoginForm({ onLoginSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLoginSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Container>
      <Row className="mb-4" sm={3}>
        {/* <img alt="login-logo" className="object-fit-contain mx-auto" /> */}
      </Row>
      <Row className="justify-content-md-center mb-4" md="auto">
        <h1>Sign In</h1>
      </Row>

      <Form className="d-md-flex flex-column w-75 mx-auto p-1">
        <Form.Group className="mb-4" id="email">
          <Form.Label className="fw-bold">Email Address:</Form.Label>
          <InputGroup>
            <InputGroup.Text id="email">
              <i className="bi bi-person-circle"></i>
            </InputGroup.Text>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Your email"
              name="email"
              ref={emailRef}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-5" id="password">
          <Form.Label className="fw-bold">Password: </Form.Label>
          <InputGroup>
            <InputGroup.Text id="password">
              <i className="bi bi-key-fill"></i>
            </InputGroup.Text>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Your password"
              name="password"
              ref={passwordRef}
            />
          </InputGroup>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="btn btn-lg"
          onClick={(evt) => handleSubmit(evt)}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
