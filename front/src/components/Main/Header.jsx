import Navbar from "react-bootstrap/esm/Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import formLogo from "../../assets/form_logo.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleUserLoginClick = (evt) => {
    navigate("/");
  };

  return (
    <>
      <Navbar className="d-block bg-light p-2 mb-1 navbar-light navbar-expand">
        <Row className="d-flex m-0 align-items-center">
          <Col className="col-3">
            <Row className="d-flex align-items-center">
              <Col className="col-sm-2 col-5 ps-0 me-1">
                <span
                  className="navbar-toggler-icon p-2"
                  style={{ cursor: "pointer" }}
                ></span>
              </Col>
              <Navbar.Brand
                href="home"
                className="d-flex align-items-center p-0 m-0 col-4"
              >
                <img
                  src={formLogo}
                  alt="formLogo"
                  width={35}
                  height={35}
                  className=""
                />
                <h2 className="fs-4 fw-normal m-0 ps-2 d-sm-inline d-none">
                  Forms
                </h2>
              </Navbar.Brand>
            </Row>
          </Col>
          <Col className="col-6 justify-self-center">
            <Form>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="rounded-pill form-control-md"
              />
            </Form>
          </Col>
          <Col className="col-3">
            <i
              className="bi bi-person-circle fs-4 float-end"
              style={{ color: "#673AB7", cursor: "pointer" }}
              onClick={() => handleUserLoginClick()}
            ></i>
          </Col>
        </Row>
      </Navbar>
    </>
  );
}

export default Header;
