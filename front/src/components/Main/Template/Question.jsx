import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

function Question() {
  return (
    <>
      <Container fluid className="bg-white px-2 py-4 mb-1 rounded">
        <Row className="mx-sm-4 mx-1">
          <Col className="col-12 col-md-7">
            <Form.Group className="my-2" controlId="">
              <Form.Control
                type="text"
                placeholder="Question Title"
                className="fw-semibold border-0 border-bottom border-1 bg-light rounded-0"
              />
            </Form.Group>
          </Col>
          <Col className="col-8 col-md-3 d-flex align-items-center">
            <Form.Select style={{ height: 40 }} className="rounded-1">
              <option>Single-Line</option>
              <option value="1">Multiple-Line</option>
              <option value="2">Positive Integers</option>
              <option value="3">Checkboxes</option>
            </Form.Select>
          </Col>
          <Col className="col-4 col-md-2 d-flex align-items-center">
            <Form.Check // prettier-ignore
              type={"checkbox"}
              id=""
              className="me-1 p-0"
            />
            <p className="m-0 mb-1 p-0">Show?</p>
          </Col>
        </Row>
        <Row className="mx-sm-4 mx-1">
          <Col>
            <Form.Group className="my-2" controlId="">
              <Form.Control
                type="text"
                placeholder="Question"
                className="fw-semibold border-0 border-bottom border-1 bg-light rounded-0"
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Question;
