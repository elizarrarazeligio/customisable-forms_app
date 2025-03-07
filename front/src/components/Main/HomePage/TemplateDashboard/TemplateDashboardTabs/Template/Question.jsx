import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import QuestionType from "./QuestionType";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import questionApi from "../../../../../../utils/questionApi";
import checkboxApi from "../../../../../../utils/checkboxApi";

function Question({
  question,
  ind,
  arr,
  handleQuestionUpdate,
  submitted,
  setSubmitted,
  setChange,
  themes,
}) {
  const [questionTitle, setQuestionTitle] = useState(question.title);
  const [questionDescription, setQuestionDescription] = useState(
    question.description
  );
  const [show, setShow] = useState(question.show);
  const [questionType, setQuestionType] = useState(question.field);
  const [checkboxChange, setCheckboxChange] = useState(false);

  const handleDeleteQuestion = () => {
    questionApi
      .deleteQuestion(question.question_id)
      .then((res) => {
        toast.success(res.message);
        setChange([true]);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const handleAddCheckbox = () => {
    checkboxApi
      .addCheckbox(question.question_id)
      .then(() => setCheckboxChange([true]))
      .catch((err) => err.then(console.log(err)));
  };

  useEffect(() => {
    if (!submitted) return;
    handleQuestionUpdate(question.question_id, {
      field: questionType,
      number: ind + 1,
      title: questionTitle,
      description: questionDescription,
      show,
    });
  }, [submitted]);

  return (
    <>
      <Container fluid className={`${themes.bg3} p-2 mb-1 rounded`}>
        <Row className="mx-sm-4 mx-1">
          <Col className="col-12 col-md-7">
            <Form.Group className="my-2">
              <Form.Control
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                type="text"
                placeholder="Question Title"
                className="fw-semibold border-0 border-bottom border-1 bg-light rounded-0"
                required
              />
            </Form.Group>
          </Col>
          <Col className="col-8 col-md-3 d-flex align-items-center">
            <Form.Select
              style={{ height: 40 }}
              className="rounded-1"
              onChange={(e) => setQuestionType(e.target.value)}
              defaultValue={questionType}
            >
              <option value="Single-Line">Single-Line</option>
              <option value="Multiple-Line">Multiple-Line</option>
              <option value="Positive Integers">Positive Integers</option>
              <option value="Checkboxes">Checkboxes</option>
            </Form.Select>
          </Col>
          <Col className="col-4 col-md-2 d-flex align-items-center">
            <Form.Check
              checked={show}
              onChange={() => setShow(!show)}
              type={"checkbox"}
              className="me-1 p-0"
            />
            <p className="m-0 mb-1 p-0">Show?</p>
          </Col>
        </Row>

        <Row className="mx-sm-4 mx-1">
          <Form.Group className="my-2">
            <Form.Control
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
              type="text"
              placeholder="Question"
              className="border-0 border-bottom border-1 bg-light rounded-0"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mx-sm-4 mx-1">
          <QuestionType
            questionType={questionType}
            questionId={question.question_id}
            checkboxChange={checkboxChange}
            setCheckboxChange={setCheckboxChange}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        </Row>

        <Row className="mx-sm-4 mx-1 ps-1">
          {questionType == "Checkboxes" && (
            <Button
              className="ms-5 bg-secondary border-secondary"
              style={{ width: 130 }}
              onClick={() => handleAddCheckbox()}
            >
              <i className="bi bi-plus-circle-fill"></i> Add option
            </Button>
          )}

          <Button
            className="m-0 p-1 bg-secondary border-secondary ms-auto me-3"
            style={{ width: 35 }}
            onClick={() => handleDeleteQuestion()}
            disabled={arr.length == 1 ? true : false}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default Question;
