import Form from "react-bootstrap/esm/Form";
import FormQuestionType from "./FormQuestionType";
import { useEffect, useState } from "react";
import answerApi from "../../../../utils/answerApi";

function FormQuestion({ ind, question, formInfo }) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    answerApi
      .getFormQuestionAnswer(formInfo.form_id, question.question_id)
      .then((res) => setAnswer(res.response.answer))
      .catch((err) => {
        answerApi
          .addAnswerInput(formInfo.form_id, question.question_id)
          .then(() => setAnswer(""))
          .catch((err) => err.then((res) => toast.error(res.message)));
      });
  }, []);

  return (
    <>
      <Form.Group className="mb-4 mt-2">
        <Form.Label className="fw-semibold">
          {ind + 1} - {question.description}
        </Form.Label>
        <FormQuestionType
          question={question}
          formInfo={formInfo}
          answer={answer}
          setAnswer={setAnswer}
        />
      </Form.Group>

      {formInfo.template.questions.length != ind + 1 && <hr />}
    </>
  );
}

export default FormQuestion;
