import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import prueba from "../../../assets/add.jpg";

function Templates() {
  return (
    <>
      <Row
        className="col-11 mx-auto py-3 px-0"
        style={{ backgroundColor: "#eaeaea" }}
      >
        <Row className="justify-content-center col-md-10 col-12 mx-auto py-2">
          <Col className="col-7 fs-5 fw-medium">Initiate a new form</Col>
          <Col className="col-5"></Col>
        </Row>
        <Row className="col-md-10 col-12 pb-2 mx-auto">
          <Col className="col-6 col-md-4 col-xl-3 justify-content-center px-2 py-1 rounded">
            <img
              src={prueba}
              alt="template"
              className="object-fit-cover border rounded w-100 col-12"
              style={{ height: 150 }}
            />
            <p className="badge text-dark fw-semibold fs-6 text-bg-light w-100 m-0 pt-2 text-truncate">
              Formulario en blanco
            </p>
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default Templates;
