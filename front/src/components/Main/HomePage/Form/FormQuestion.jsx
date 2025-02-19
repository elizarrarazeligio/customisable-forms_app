import Form from "react-bootstrap/esm/Form";
import { useContext } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";

function FormQuestion({ ind, question, formInfo }) {
  const { user } = useContext(UsersContext);

  const renderQuestionType = (val) => {
    switch (val) {
      case "Single-Line":
        return (
          <Form.Control
            type="text"
            placeholder="Enter your answer"
            className="bg-light"
            disabled={user.admin || user.id == formInfo.user_id ? false : true}
          />
        );
      case "Multiple-Line":
        return (
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your answer"
            className="bg-light"
            disabled={user.admin || user.id == formInfo.user_id ? false : true}
          />
        );
      case "Positive Integers":
        return (
          <Form.Control
            type="number"
            min={0}
            placeholder="0, 1, 2, 3..."
            className="bg-light w-25"
            disabled={user.admin || user.id == formInfo.user_id ? false : true}
          />
        );
      case "Checkboxes":
        return;
    }
  };

  return (
    <>
      <Form.Group className="mb-4 mt-2" controlId="">
        <Form.Label className="fw-semibold">
          {ind + 1} - {question.description}
        </Form.Label>
        {renderQuestionType(question.field)}
      </Form.Group>
      <hr />
    </>
  );
}

export default FormQuestion;
