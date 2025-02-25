import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Collapse from "react-bootstrap/esm/Collapse";
import Button from "react-bootstrap/esm/Button";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import Comments from "./Comments";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "../../../../contexts/UsersContext";
import formApi from "../../../../utils/formApi";
import answerApi from "../../../../utils/answerApi";
import checkboxApi from "../../../../utils/checkboxApi";
import likeApi from "../../../../utils/likeApi";

function CreateForm() {
  const templateData = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(UsersContext);

  const [check, setCheck] = useState(false);
  const [like, setLike] = useState(null);
  const [likes, setLikes] = useState([]);
  const [formInfo, setFormInfo] = useState(templateData.response);
  const shownQuestions = formInfo.questions.filter((question) => question.show);

  const createNewForm = () => {
    formApi
      .newForm(formInfo.template_id, user.id)
      .then((res) => {
        formInfo.questions
          .filter((question) => question.show)
          .map((question) => {
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

  const handleLike = () => {
    likeApi
      .likeTemplate(templateData.response.template_id, user.id)
      .then(() => setLike(true));
  };

  const handleLikeDelete = () => {
    const like = likes.filter((like) => like.user_id == user.id);
    likeApi
      .deleteLike(like[0].like_id)
      .then(() => setLike(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    likeApi
      .getTemplateLikes(templateData.response.template_id)
      .then((res) => {
        if (res.likes.some((like) => like.user_id == user.id)) setLike(true);
        setLikes(res.likes);
      })
      .catch((err) => err.then((res) => console.log(res)));
  }, []);

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

      {formInfo.questions
        .filter((question) => question.show)
        .map((question, ind) => {
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

      {!user ||
        (user.id != formInfo.user_id && (
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
        ))}

      <Container className="col-lg-6 col-md-8 col-12 flex-column mx-auto bg-white px-md-2 px-0 py-2 rounded mt-2">
        <Row className="m-0 p-0 d-flex align-items-center text-center">
          <Col className="col-1 col-sm-3" />
          <Col className="d-flex align-items-center justify-content-sm-center gap-2 col-sm-6 col-8 ">
            <span className="text-muted fw-semibold">Display comments</span>
            <ToggleButton
              className="btn btn-sm m-0 px-1 py-0"
              id="toggle1"
              type="checkbox"
              variant="outline-secondary"
              checked={check}
              onChange={() => setCheck(!check)}
            >
              <i className="bi bi-caret-down-fill p-0 m-0"></i>
            </ToggleButton>
          </Col>
          <Col className="col-3 d-flex align-items-center justify-content-sm-end justify-content-center">
            <ToggleButton
              className="btn btn-sm m-0 py-0"
              id="toggle2"
              type="checkbox"
              variant="outline-danger"
              checked={like}
              onChange={() => (like ? handleLikeDelete() : handleLike())}
              disabled={user ? false : true}
            >
              <i className="bi bi-heart-fill me-1"></i>
              <span className="p-0 m-0">{likes.length}</span>
            </ToggleButton>
          </Col>
        </Row>
        <Row className="m-0 px-2">
          <Collapse in={check}>
            <div className="m-0 p-0" id="collapse">
              <Comments
                templateId={templateData.response.template_id}
                user={user}
              />
            </div>
          </Collapse>
        </Row>
      </Container>
    </>
  );
}

export default CreateForm;
