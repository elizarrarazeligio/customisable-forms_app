import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Question from "./Question";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Template() {
  const navigate = useNavigate();
  const templateData = useLoaderData();

  const [template, setTemplate] = useState(templateData.response);
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description);
  const [image, setImage] = useState(template.image);
  const [questions, setQuestions] = useState(1);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const handleTemplateSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (templateData.status == "success") {
      setTemplate(templateData.response);
    } else if (templateData.status == "error") {
      toast.error(templateData.response);
      navigate("/home");
    }
  }, [templateData]);

  return (
    <Form
      className="col-lg-10 col-12 flex-column mx-auto"
      onSubmit={(e) => handleTemplateSubmit(e)}
    >
      <Container fluid className="bg-white px-2 pt-2 pb-4  rounded mb-1">
        <Form.Group className="my-2 mx-sm-4 mx-3" id="title">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            ref={titleRef}
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
            ref={descriptionRef}
            placeholder="Template description"
            className="fw-semibold border-0 border-bottom border-2 rounded-0"
            required
          />
        </Form.Group>
        <Form.Group className="my-2 mx-sm-4 mx-3 w-75" id="image">
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="url"
            name="image"
            ref={imageRef}
            placeholder="Image URL (optional)"
            className="border-0 border-bottom border-1 rounded-0"
          />
        </Form.Group>
      </Container>

      {Array.from({ length: questions }).map((i, ind) => {
        return <Question key={ind} />;
      })}

      <Button
        className="w-100 bg-secondary border-secondary p-0 d-flex align-items-center justify-content-center"
        onClick={() => setQuestions(questions + 1)}
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
  );
}

export default Template;
