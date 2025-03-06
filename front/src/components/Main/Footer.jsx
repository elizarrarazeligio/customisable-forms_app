import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Support from "./Support";
import formLogo from "../../assets/form_logo.png";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Footer({ cookies }) {
  const themes = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Container
        fluid
        className={`mt-1 ${themes.bg} py-4 d-flex justify-content-center`}
      >
        <Row className="border-top pt-2 pb-1 m-0 col-10 border-2">
          <Col className="m-0 p-0 d-flex align-items-center justify-content-sm-start justify-content-center col-sm-8 col-12 mt-1">
            <img
              src={formLogo}
              width={25}
              height={25}
              alt="logo"
              className="m-0 p-0 opacity-75"
              style={{ filter: "grayscale(100)" }}
            />
            <p className={`mx-2 my-0 p-0 ${themes.text2}`}>
              &#169; 2025 Eligio Elizarraraz
            </p>
          </Col>
          <Col className="m-0 p-0 d-flex align-items-center justify-content-sm-end justify-content-center gap-1 col-sm-4 col-12 mt-1">
            <div
              className={`${themes.text2} me-3 d-flex align-items-center gap-1`}
              style={{ cursor: "pointer" }}
              onClick={handleShow}
            >
              <span className="fw-semibold" style={{ fontSize: 12 }}>
                Help
              </span>
              <i className={`bi bi-question-circle-fill fs-6 opacity-75`}></i>
            </div>

            <a href="https://www.instagram.com/elizarrarazeligio/">
              <i
                className={`bi bi-instagram fs-4 ${themes.text2} opacity-75`}
              ></i>
            </a>
            <a href="https://github.com/elizarrarazeligio">
              <i className={`bi bi-github fs-4 ${themes.text2} opacity-75`}></i>
            </a>
            <a href="https://www.linkedin.com/in/elizarrarazeligio/">
              <i
                className={`bi bi-linkedin fs-4 ${themes.text2} opacity-75`}
              ></i>
            </a>
          </Col>
        </Row>
      </Container>

      <Support
        showModal={showModal}
        handleClose={handleClose}
        permissions={cookies.permissions?.result}
      />
    </>
  );
}

export default Footer;
