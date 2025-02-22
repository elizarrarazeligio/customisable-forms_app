import Form from "react-bootstrap/esm/Form";
import FormCheckbox from "./FormCheckbox";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";
import checkboxApi from "../../../../utils/checkboxApi";

function FormQuestionType({
  question,
  formInfo,
  answer,
  setAnswer,
  submitted,
}) {
  const { user } = useContext(UsersContext);
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    if (question.field == "Checkboxes")
      checkboxApi
        .getQuestionCheckboxes(question.question_id)
        .then((res) => setCheckboxes(res.response))
        .catch((err) => err.then((res) => console.log(res)));
  }, []);

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
        ? checkboxes.map((checkbox, ind) => {
            return (
              <FormCheckbox
                key={ind}
                checkbox={checkbox}
                submitted={submitted}
              />
            );
          })
        : renderQuestionType(question.field)}
    </>
  );
}

export default FormQuestionType;
