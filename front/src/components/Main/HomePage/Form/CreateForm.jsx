import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "../../../../contexts/UsersContext";
import formApi from "../../../../utils/formApi";
import answerApi from "../../../../utils/answerApi";
import checkboxApi from "../../../../utils/checkboxApi";

function CreateForm() {
  const templateData = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(UsersContext);

  const [formInfo, setFormInfo] = useState(templateData.response);
  const [loaded, setLoaded] = useState(false);
  const shownQuestions = formInfo.questions.filter((question) => question.show);

  const createNewForm = () => {
    formApi
      .newForm(formInfo.template_id, user.id)
      .then((res) => {
        shownQuestions.map((question) => {
          if (question.field !== "Checkboxes") {
            answerApi
              .addAnswerInput(res.form_id, question.question_id)
              .catch((err) => err.then((res) => toast.error(res.message)));
          } else {
            checkboxApi
              .addFormCheckboxes(res.form_id, question.checkboxes)
              .catch((err) => err.then((res) => toast.error(res.message)));
          }
        });
        toast.success(res.message);
        navigate(`/form/${res.hash}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (templateData.status == "success") {
      setLoaded(true);
      setFormInfo(templateData.response);
    } else if (templateData.status == "error") {
      navigate("/home");
      toast.error(templateData.response);
    }
  }, [templateData]);

  return (
    <>
      <Container className="col-lg-10 col-12 flex-column mx-auto bg-white px-md-2 px-0 py-2 rounded">
        <Row className="m-0 p-md-2 p-0 text-center">
          <Col>
            <img
              src={formInfo.image}
              alt="template"
              className="object-fit-cover border rounded-top w-100 col-12"
              style={{ height: 70 }}
            />
            <h2 className="m-0 py-1">{formInfo.title}</h2>
            <p className="m-0">{formInfo.description}</p>
          </Col>
        </Row>
      </Container>

      {loaded &&
        shownQuestions.map((question, ind) => {
          return (
            <Container
              key={ind + 1}
              className="col-lg-10 col-12 flex-column mx-auto bg-white px-md-2 px-0 py-2 rounded mt-1"
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

      {user.id != formInfo.user_id && (
        <Button
          className="p-0 d-flex align-items-center justify-content-center ms-auto mt-1 mx-auto col-md-2 col-sm-4 col-12"
          style={{
            height: 35,
            backgroundColor: "#0CCA98",
            border: "#0CCA98",
          }}
          type="button"
          onClick={() => createNewForm()}
          disabled={shownQuestions.length ? false : true}
        >
          <p className="m-0 p-0 fw-semibold">Create Form</p>
        </Button>
      )}
    </>
  );
}

export default CreateForm;
