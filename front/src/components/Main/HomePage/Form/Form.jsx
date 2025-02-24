import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import FormSelect from "react-bootstrap/esm/FormSelect";
import FormQuestion from "./FormQuestion";
import Tags from "./Tags";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { UsersContext } from "../../../../contexts/UsersContext";
import { toast } from "react-toastify";
import formApi from "../../../../utils/formApi";
import answerApi from "../../../../utils/answerApi";
import topicApi from "../../../../utils/topicApi";

function Form() {
  const { user } = useContext(UsersContext);
  const formData = useLoaderData();

  const [formInfo, setFormInfo] = useState(formData.response);
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState(formData.response.topic_id);
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState(formData.response.tags);

  const questions = formInfo.template.questions;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted([true]);
    formApi
      .updateForm(formInfo.form_id, topic, [])
      .then(() => toast.success("Answers submitted successfully!"))
      .catch((err) => console.log(err));
  };

  const handleAnswerUpdate = (form_id, question_id, answer) => {
    answerApi
      .updateAnswer(form_id, question_id, answer)
      .catch((err) => err.then((res) => console.log(res)));
  };

  useEffect(() => {
    topicApi
      .getAllTopics()
      .then((res) => setTopics(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <form
      className="col-lg-10 col-12 mx-auto d-flex flex-column align-items-center"
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <Container className="flex-column bg-white px-2 py-2 rounded">
        <Row className="m-0 p-md-2 p-0 text-center">
          <h2 className="m-0 pt-1 pb-3">
            {formInfo && formInfo.template.title}
          </h2>
          <hr />
        </Row>

        <Row className="px-lg-5 px-3 m-0 col-12 d-flex flex-column">
          <Row className="d-flex col-md-6 col-sm-10 col-12 align-items-center pb-2">
            <label className="form-label col-2 fw-semibold m-0">Email:</label>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                disabled
                value={formInfo.user.email}
              />
            </div>
          </Row>

          <Row className="d-flex col-md-6 col-sm-10 col-12 align-items-center pb-2">
            <label className="form-label col-2 fw-semibold m-0">Date:</label>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                disabled
                value={`${formInfo.created_at.slice(
                  0,
                  10
                )} at ${formInfo.created_at.slice(11, 19)}`}
              />
            </div>
          </Row>

          <Row className="d-flex col-md-6 col-sm-10 col-12 align-items-center pb-4">
            <label className="form-label col-2 fw-semibold m-0">Topic:</label>
            <div className="col-10">
              <FormSelect
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={
                  user && (user.admin || user.id == formInfo.user_id)
                    ? false
                    : true
                }
              >
                {topics &&
                  topics.map((item, ind) => (
                    <option key={ind} value={item.topic_id}>
                      {item.topic}
                    </option>
                  ))}
              </FormSelect>
            </div>
          </Row>

          <hr />
        </Row>

        <Row className="px-lg-5 px-3 m-0">
          {questions.map((question, ind) => (
            <FormQuestion
              key={ind}
              question={question}
              ind={ind}
              submitted={submitted}
              formInfo={formInfo}
              handleAnswerUpdate={handleAnswerUpdate}
            />
          ))}
        </Row>

        <Row className="px-lg-5 px-3 m-0">
          <Tags tags={tags} setTags={setTags} />
        </Row>
      </Container>

      {user && (user.admin || user.id == formInfo.user_id) && (
        <Container className="m-0 p-0">
          <Button
            className="p-0 d-flex align-items-center justify-content-center ms-auto mt-1 col-md-3 col-sm-6 col-12 float-end"
            style={{
              height: 35,
              backgroundColor: "#0CCA98",
              border: "#0CCA98",
            }}
            type="submit"
          >
            <p className="m-0 p-0 fw-semibold">Submit Answers</p>
          </Button>
        </Container>
      )}
    </form>
  );
}

export default Form;
