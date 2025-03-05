import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import errorApi from "../../utils/errorApi";

function Support({ showModal, handleClose }) {
  const location = useLocation();

  const [summary, setSummary] = useState("");
  const [severity, setSeverity] = useState(5);

  const handleErrorSubmit = (e) => {
    e.preventDefault();
    errorApi
      .postIssueTicket({ path: location.pathname, summary, severity })
      .then((res) => {
        toast.success(res.message);
      })
      .finally(() => {
        setSummary("");
        setSeverity(5);
        handleClose();
      });
  };

  return (
    <Modal centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Support</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => handleErrorSubmit(e)}>
        <Modal.Body className="d-flex flex-column align-items-center col-12">
          <Row className="pb-4 col-12 col-sm-11">
            <Form.Label
              className="m-0 p-0 mb-1 fw-semibold"
              style={{ fontSize: "0.9rem" }}
            >
              Write a detailed description of the issue:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              size="sm"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </Row>

          <Row className="pb-2 col-12 col-sm-11">
            <Form.Label
              className="m-0 p-0 mb-1 fw-semibold"
              style={{ fontSize: "0.9rem" }}
            >
              Choose the error severity level:
            </Form.Label>
            <Form.Select
              size="sm"
              onChange={(e) => setSeverity(e.target.value)}
              defaultValue={severity}
            >
              <option value={5}>Very Low</option>
              <option value={4}>Low</option>
              <option value={3}>Mid</option>
              <option value={2}>High</option>
              <option value={1}>Very High</option>
            </Form.Select>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column justify-content-center">
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Support;
