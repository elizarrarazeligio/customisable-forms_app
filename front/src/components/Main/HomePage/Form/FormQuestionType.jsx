import Form from "react-bootstrap/esm/Form";
import { useContext } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";

function FormQuestionType({ question, formInfo }) {
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
            required
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
            required
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
            required
          />
        );
      case "Checkboxes":
        return;
    }
  };

  return <>{renderQuestionType(question.field)}</>;
}

export default FormQuestionType;
