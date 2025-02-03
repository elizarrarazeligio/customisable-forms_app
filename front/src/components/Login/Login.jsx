import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Link, Outlet } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="d-flex flex-row vh-100">
        <Container
          fluid="sm"
          className="mx-auto p-5 rounded-3 bg-light w-50 d-md-flex flex-column align-self-center"
        >
          <Row className="h-75">
            <Outlet />
          </Row>
          <Row className="w-25 h-25 mx-auto pt-3">
            <ButtonGroup className="p-0 d-flex">
              <Link to="register" className="w-100">
                <Button
                  variant="dark"
                  type="button"
                  className="btn btn-sm w-100 rounded-end-0"
                >
                  Register
                </Button>
              </Link>

              <Link to="" className="w-100">
                <Button
                  variant="secondary"
                  type="button"
                  className="btn btn-sm w-100 rounded-start-0"
                >
                  Sign In
                </Button>
              </Link>
            </ButtonGroup>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
