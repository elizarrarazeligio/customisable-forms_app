import Form from "react-bootstrap/esm/Form";
import CheckboxOption from "./CheckboxOption";
import { useEffect, useState } from "react";
import checkboxApi from "../../../../../../utils/checkboxApi";

function QuestionType({
  questionType,
  questionId,
  checkboxChange,
  setCheckboxChange,
  submitted,
}) {
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    if (questionType == "Checkboxes")
      checkboxApi
        .getQuestionCheckboxes(questionId)
        .then((res) => setCheckboxes(res.response))
        .catch((err) => {
          checkboxApi
            .addCheckbox(questionId)
            .then(() => setCheckboxChange([true]))
            .catch((err) => err.then(console.log(err)));
        });
  }, [questionType, checkboxChange]);

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
    }
  };

  return (
    <>
      <Form.Group className="my-2">
        {checkboxes && questionType == "Checkboxes"
          ? checkboxes.map((checkbox, ind) => {
              return (
                <CheckboxOption
                  key={ind}
                  checkbox={checkbox}
                  setCheckboxChange={setCheckboxChange}
                  checkboxes={checkboxes}
                  submitted={submitted}
                />
              );
            })
          : renderQuestionType(questionType)}
      </Form.Group>
    </>
  );
}

export default QuestionType;
