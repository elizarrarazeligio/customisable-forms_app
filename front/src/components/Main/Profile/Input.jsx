import Form from "react-bootstrap/esm/Form";
import Col from "react-bootstrap/esm/Col";

function Input({ type, label, option, value }) {
  return (
    <>
      {option == 1 ? (
        <Form.Group className="mb-2 d-flex align-items-center gap-4 col-12 col-sm-11">
          <Col className="col-1 text-center">
            <Form.Label className="m-0 p-0" style={{ fontSize: "0.9rem" }}>
              {label}
            </Form.Label>
          </Col>
          <Col className="col-10">
            <Form.Control
              type={type}
              size="sm"
              disabled={type == "email" ? true : false}
              value={value}
            />
          </Col>
        </Form.Group>
      ) : (
        <Form.Group className="mb-2 px-0 d-flex justify-content-center col-6">
          <Col className="col-11">
            <Form.Label className="m-0 p-0 pb-1" style={{ fontSize: "0.9rem" }}>
              {label}
            </Form.Label>
            <Form.Control type={type} size="sm" value={value} />
          </Col>
        </Form.Group>
      )}
    </>
  );
}

export default Input;
