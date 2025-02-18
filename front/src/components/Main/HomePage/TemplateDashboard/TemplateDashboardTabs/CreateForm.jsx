import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateForm() {
  const templateData = useLoaderData();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState(templateData.response);
  const [loaded, setLoaded] = useState(false);

  const createNewForm = () => {
    formApi
      .newForm(template.template_id, user.id)
      .then((res) => {
        toast.success(res.message);
        navigate(`/form/${res.hash}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (templateData.status == "success") {
      setLoaded(true);
    } else if (templateData.status == "error") {
      navigate("/home");
      toast.error(templateData.response);
    }
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

      {loaded &&
        formInfo.questions.map((question, ind) => {
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

      <Button
        className="p-0 d-flex align-items-center justify-content-center ms-auto mt-1 mx-auto col-md-2 col-sm-4 col-12"
        style={{
          height: 35,
          backgroundColor: "#0CCA98",
          border: "#0CCA98",
        }}
        type="button"
        onClick={() => console.log("hola")}
      >
        <p className="m-0 p-0 fw-semibold">Create Form</p>
      </Button>
    </>
  );
}

export default CreateForm;
