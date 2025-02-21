import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

function QuestionType({ questionType }) {
  const renderQuestionType = (val) => {
    switch (val) {
      case "Single-Line":
        return (
          <Form.Control
            type="text"
            placeholder="Single-Line Answer"
            className="border-0 border-bottom border-1 bg-white rounded-0 w-50"
            disabled
          />
        );
      case "Multiple-Line":
        return (
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Multiple-Line Answer"
            className="border-0 border-bottom border-1 bg-white rounded-0"
            disabled
          />
        );
      case "Positive Integers":
        return (
          <Form.Control
            type="number"
            placeholder="0, 1, 2, 3..."
            className="border-0 border-bottom border-1 bg-white rounded-0 w-25"
            disabled
          />
        );
      case "Checkboxes":
        return (
          <Form.Group className="ms-3 d-flex align-items-center pt-1">
            <Form.Check type="checkbox" disabled />
            <Form.Control
              type="text"
              placeholder="Checkbox Option"
              className="bg-white rounded-0 w-75 ms-2"
            />
            <Button
              className="m-0 p-1 bg-white border-white"
              style={{ width: 35 }}
              onClick={() => console.log("hola")}
              // disabled={arr.length == 1 ? true : false}
            >
              <i className="bi bi-trash-fill text-danger mx-0"></i>
            </Button>
          </Form.Group>
        );
    }
  };

  return (
    <>
      <Form.Group className="my-2">
        {renderQuestionType(questionType)}
      </Form.Group>
    </>
  );
}

export default QuestionType;
