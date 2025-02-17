import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Question from "./Question";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import templateApi from "../../../../../utils/templateApi";
import questionApi from "../../../../../utils/questionApi";

function Template() {
  const [template] = useOutletContext();
  const questionsData = useLoaderData();

  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description);
  const [image, setImage] = useState(template.image);
  const [questions, setQuestions] = useState(questionsData.response);
  const [submitted, setSubmitted] = useState([]);
  const [change, setChange] = useState([]);

  const handleTemplateSubmit = (e) => {
    e.preventDefault();
    templateApi
      .updateTemplateInfo(template.hash, {
        title,
        description,
        image,
      })
      .then((res) => toast.success(res.message))
      .catch((err) => console.log(err));
    setSubmitted([true]);
  };

  const handleQuestionUpdate = (question_id, data) => {
    questionApi
      .updateQuestion(question_id, data)
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const addQuestion = () => {
    questionApi
      .addQuestion(template.template_id, questions.length + 1)
      .then(() => setChange([true]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    questionApi
      .getTemplateQuestions(template.hash)
      .then((res) => setQuestions(res.response));
  }, [change]);

  return (
    <>
      <Form onSubmit={(e) => handleTemplateSubmit(e)}>
        <Container fluid className="bg-white px-2 pt-2 pb-4  rounded mb-1">
          <Form.Group className="my-2 mx-sm-4 mx-3" id="title">
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Template Title"
              className="fw-bold fs-3 border-0 border-bottom border-2 rounded-0"
              required
            />
          </Form.Group>
          <Form.Group className="mt-1 mx-sm-4 mx-3" id="description">
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={1}
              name="description"
              placeholder="Template description"
              className="fw-semibold border-0 border-bottom border-2 rounded-0"
              required
            />
          </Form.Group>
          <Form.Group className="my-2 mx-sm-4 mx-3" id="image">
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="url"
              name="image"
              placeholder="Image URL (optional)"
              className="border-0 border-bottom border-1 rounded-0"
            />
          </Form.Group>
        </Container>

        {questions.map((question, ind, arr) => {
          return (
            <Question
              key={question.question_id}
              question={question}
              ind={ind}
              arr={arr}
              handleQuestionUpdate={handleQuestionUpdate}
              submitted={submitted}
              setChange={setChange}
            />
          );
        })}

        <Button
          className="w-100 bg-secondary border-secondary p-0 d-flex align-items-center justify-content-center"
          onClick={() => addQuestion()}
          style={{ height: 35 }}
          type="button"
        >
          <i className="bi bi-plus-circle-fill text-white fs-5"></i>
          <p className="m-0 ms-2 p-0">Add question</p>
        </Button>

        <Button
          className="p-0 d-flex align-items-center justify-content-center ms-auto mt-1"
          style={{
            height: 35,
            width: 120,
            backgroundColor: "#0CCA98",
            border: "#0CCA98",
          }}
          type="submit"
        >
          <p className="m-0 p-0 fw-semibold">Publish</p>
        </Button>
      </Form>
    </>
  );
}

export default Template;
