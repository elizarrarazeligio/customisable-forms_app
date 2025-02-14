import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import formLogo from "../../assets/form_logo.png";
import { toast } from "react-toastify";
import userApi from "../../utils/userApi.js";

function LoginForm() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginSubmit = (userData) => {
    userApi
      .loginUser(userData)
      .then((res) => toast.success(res.message))
      .then(() => navigate("/home"))
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLoginSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Container className="h-100 mx-auto d-flex flex-column justify-content-center align-items-center">
      <Row className="mb-1 col-sm-4 col-6 mx-auto">
        <img src={formLogo} alt="" />
      </Row>
      <Row className="mb-1">
        <h2 className="">Sign In</h2>
      </Row>

      <Form className="d-flex flex-column col-sm-10 col-12 mx-auto">
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
              required
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

        <Button
          variant="primary"
          type="submit"
          className="btn btn-md"
          onClick={(evt) => handleSubmit(evt)}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
