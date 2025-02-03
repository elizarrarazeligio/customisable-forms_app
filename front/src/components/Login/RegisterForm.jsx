import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRef } from "react";

function RegisterForm({ onFormSubmit }) {
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onFormSubmit({
      first_name: nameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Form
      className="d-md-flex flex-column w-75 mx-auto p-1"
      onSubmit={handleSubmit}
    >
      <Container className="p-0 mb-4">
        <Row className="justify-content-md-center mb-4" md="auto">
          <h1>Register</h1>
        </Row>
        <Row>
          <Col>
            <Form.Label className="fw-bold">First Name:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Name"
              name="name"
              ref={nameRef}
              minLength={2}
              maxLength={20}
            />
          </Col>
          <Col>
            <Form.Label className="fw-bold">Last Name:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Last Name"
              name="last-name"
              ref={lastNameRef}
              minLength={2}
              maxLength={40}
            />
          </Col>
        </Row>
      </Container>

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

      <Button variant="primary" type="submit" className="btn btn-lg">
        Sign Up
      </Button>
    </Form>
  );
}

export default RegisterForm;
