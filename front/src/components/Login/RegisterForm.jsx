import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import api from "../../utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onRegisterSubmit = (userData) => {
    api
      .registerUser(userData)
      .then((res) => toast.success(res.message))
      .then(() => navigate("/"))
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegisterSubmit({
      first_name: nameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Container className="p-0 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-sm-center mb-2" sm="auto">
        <h2>Register</h2>
      </Row>

      <Form
        className="d-flex flex-column col-sm-10 col-12 mx-auto p-1"
        onSubmit={handleSubmit}
      >
        <Row className="mb-2 d-flex flex-column flex-sm-row">
          <Col className="input-group-sm col-sm-6">
            <Form.Label className="fw-bold ms-1 my-0">First Name:</Form.Label>
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
          <Col className="input-group-sm col-md-6">
            <Form.Label className="fw-bold ms-1 my-0">Last Name:</Form.Label>
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

        <Form.Group className="mb-2" id="email">
          <Form.Label className="fw-bold ms-1 my-0">Email Address:</Form.Label>
          <InputGroup className="input-group-sm">
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

        <Form.Group className="mb-4" id="password">
          <Form.Label className="fw-bold ms-1 my-0">Password: </Form.Label>
          <InputGroup className="input-group-sm">
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

        <Button variant="primary" type="submit" className="btn btn-md">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterForm;
