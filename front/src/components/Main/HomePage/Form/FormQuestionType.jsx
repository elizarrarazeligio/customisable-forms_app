import Form from "react-bootstrap/esm/Form";
import FormCheckbox from "./FormCheckbox";
import { useContext, useState } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";

function FormQuestionType({
  question,
  formInfo,
  answer,
  setAnswer,
  submitted,
}) {
  const { user } = useContext(UsersContext);
  const [checkboxes, setCheckboxes] = useState(question.checkboxes);

  const renderQuestionType = (val) => {
    switch (val) {
      case "Single-Line":
        return (
          <Form.Control
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="bg-light"
            disabled={
              user && (user.admin || user.id == formInfo.user_id) ? false : true
            }
            required
          />
        );
      case "Multiple-Line":
        return (
          <Form.Control
            as="textarea"
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="bg-light"
            disabled={
              user && (user.admin || user.id == formInfo.user_id) ? false : true
            }
            required
          />
        );
      case "Positive Integers":
        return (
          <Form.Control
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            min={0}
            placeholder="0, 1, 2, 3..."
            className="bg-light w-25"
            disabled={
              user && (user.admin || user.id == formInfo.user_id) ? false : true
            }
            required
          />
        );
    }
  };

  return (
    <>
      {checkboxes && question.field == "Checkboxes"
        ? checkboxes
            .filter((checkbox) => checkbox.option != "")
            .map((checkbox, ind) => {
              const checkedAnswers = checkbox.checkedanswers.filter(
                (check) => check.form_id == formInfo.form_id
              );
              return (
                <FormCheckbox
                  key={ind}
                  checkbox={checkbox}
                  checkedAnswers={checkedAnswers}
                  submitted={submitted}
                  user={user}
                  formInfo={formInfo}
                />
              );
            })
        : renderQuestionType(question.field)}
    </>
  );
}

export default FormQuestionType;
