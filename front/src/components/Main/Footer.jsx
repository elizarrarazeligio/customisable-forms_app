import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import formLogo from "../../assets/form_logo.png";

function Footer() {
  return (
    <>
      <Container
        fluid
        className="mt-1 bg-light py-4 d-flex justify-content-center"
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
            <p className="mx-2 my-0 p-0 text-muted">
              &#169; 2025 Eligio Elizarraraz
            </p>
          </Col>
          <Col className="m-0 p-0 d-flex align-items-center justify-content-sm-end justify-content-center gap-1 col-sm-4 col-12 mt-1">
            <i class="bi bi-instagram fs-4 text-muted opacity-75"></i>
            <i class="bi bi-github fs-4 text-muted opacity-75"></i>
            <i class="bi bi-linkedin fs-4 text-muted opacity-75"></i>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
