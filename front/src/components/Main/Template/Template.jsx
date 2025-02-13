import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Question from "./Question";
import { useState } from "react";

function Template() {
  const [questions, setQuestions] = useState(1);

  return (
    <Form className="col-lg-10 col-12 flex-column mx-auto">
      <Container fluid className="bg-white px-2 pt-2 pb-4  rounded mb-1">
        <Form.Group className="my-2 mx-sm-4 mx-3" controlId="">
          <Form.Control
            type="text"
            placeholder="Template Title"
            className="fw-bold fs-3 border-0 border-bottom border-2 rounded-0"
          />
        </Form.Group>
        <Form.Group className="mt-1 mx-sm-4 mx-3" controlId="">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Template description"
            className="fw-semibold border-0 border-bottom border-2 rounded-0"
          />
        </Form.Group>
      </Container>

      {Array.from({ length: questions }).map((i) => {
        return <Question />;
      })}

      <Button
        className="w-100 bg-secondary border-secondary p-0 d-flex align-items-center justify-content-center"
        onClick={() => setQuestions(questions + 1)}
        style={{ height: 35 }}
      >
        <i className="bi bi-plus-circle-fill text-white fs-5"></i>
        <p className="m-0 ms-2 p-0">Add question</p>
      </Button>
    </Form>
  );
}

export default Template;
