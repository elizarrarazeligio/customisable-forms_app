import Form from "react-bootstrap/esm/Form";
import FormQuestionType from "./FormQuestionType";

function FormQuestion({ ind, question, formInfo }) {
  return (
    <>
      <Form.Group className="mb-4 mt-2">
        <Form.Label className="fw-semibold">
          {ind + 1} - {question.description}
        </Form.Label>
        <FormQuestionType question={question} formInfo={formInfo} />
      </Form.Group>

      {formInfo.template.questions.length != ind + 1 && <hr />}
    </>
  );
}

export default FormQuestion;
