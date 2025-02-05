import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Link, Outlet } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="d-flex flex-row align-items-center align-content-center vh-100">
        <Container
          fluid
          className="p-5 rounded-2 bg-light col-sm-12 col-md-6 col-xxl-3 d-flex flex-column mx-auto my-auto"
        >
          <Row className="col-12 mx-auto">
            <Outlet />
          </Row>
          <Row className="mx-auto pt-3 col-4">
            <ButtonGroup className="p-0 d-flex flex-column flex-sm-row justify-content-center">
              <Link to="register" className="col-sm-8 col-12">
                <Button
                  variant="dark"
                  type="button"
                  className="btn btn-sm rounded-end-0 col-12"
                >
                  Register
                </Button>
              </Link>

              <Link to="" className="col-sm-8 col-12">
                <Button
                  variant="secondary"
                  type="button"
                  className="btn btn-sm w-100 rounded-start-0 col-12"
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
