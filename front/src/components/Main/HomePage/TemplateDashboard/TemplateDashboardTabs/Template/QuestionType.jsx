import Form from "react-bootstrap/esm/Form";

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
        return;
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
