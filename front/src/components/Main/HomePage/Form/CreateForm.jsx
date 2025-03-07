import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Comments from "./Comments";
import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "../../../../contexts/UsersContext";
import formApi from "../../../../utils/formApi";
import answerApi from "../../../../utils/answerApi";
import checkboxApi from "../../../../utils/checkboxApi";
import defaultImage from "../../../../assets/form.jpg";
import { ThemeContext } from "../../../../contexts/ThemeContext";

function CreateForm() {
  const templateData = useLoaderData();
  const navigate = useNavigate();

  const { user } = useContext(UsersContext);
  const themes = useContext(ThemeContext);

  const [formInfo, setFormInfo] = useState(templateData.response);
  const shownQuestions = formInfo.questions.filter((question) => question.show);

  const createNewForm = () => {
    formApi
      .newForm(formInfo.template_id, user.id)
      .then((res) => {
        formInfo.questions
          .filter((question) => question.show)
          .map(async (question) => {
            if (question.field !== "Checkboxes") {
              await answerApi
                .addAnswerInput(res.form_id, question.question_id)
                .catch((err) => err.then((res) => toast.error(res.message)));
            } else {
              await checkboxApi
                .addFormCheckboxes(res.form_id, question.checkboxes)
                .catch((err) => err.then((res) => toast.error(res.message)));
            }
          });
        return res;
      })
      .then((res) => {
        toast.success(res.message);
        navigate(`/form/${res.hash}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container
        className={`${themes.bg4} ${themes.text} col-lg-10 col-12 flex-column mx-auto px-md-2 px-0 py-2 rounded`}
      >
        <Row className="m-0 p-md-2 p-0 text-center">
          <Col>
            <img
              src={formInfo.image ? formInfo.image : defaultImage}
              onError={(e) => (e.currentTarget.src = defaultImage)}
              alt="template"
              className="object-fit-cover border rounded-top w-100 col-12"
              style={{ height: 70 }}
            />
            <h2 className="m-0 py-1">{formInfo.title}</h2>
            <p className="m-0">{formInfo.description}</p>
          </Col>
        </Row>
      </Container>

      {formInfo.questions
        .filter((question) => question.show)
        .map((question, ind) => {
          return (
            <Container
              key={ind + 1}
              className={`${themes.bg4} ${themes.text} col-lg-10 col-12 flex-column mx-auto px-md-2 px-0 py-2 rounded mt-1`}
            >
              <Row className="m-0 ps-3 py-1">
                <p className="m-0">
                  <span className="m-0 p-0 fw-semibold">
                    Question {ind + 1} -{" "}
                  </span>
                  {question.description}
                </p>
              </Row>
            </Container>
          );
        })}

      {!user ||
        (user.id != formInfo.user_id && (
          <Button
            className="p-0 d-flex align-items-center justify-content-center ms-auto mt-1 mx-auto col-md-2 col-sm-4 col-12"
            style={{
              height: 35,
              backgroundColor: themes.submit,
              border: themes.submit,
            }}
            type="button"
            onClick={() => createNewForm()}
            disabled={shownQuestions.length ? false : true}
          >
            <p className="m-0 p-0 fw-semibold">Create Form</p>
          </Button>
        ))}

      <Container
        className={`${themes.bg4} ${themes.text} col-lg-6 col-md-8 col-12 flex-column mx-auto px-md-2 px-0 py-2 rounded mt-2`}
      >
        <Comments
          templateId={templateData.response.template_id}
          user={user}
          themes={themes}
        />
      </Container>
    </>
  );
}

export default CreateForm;
