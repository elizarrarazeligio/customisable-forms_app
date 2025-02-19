import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import FormQuestion from "./FormQuestion";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { UsersContext } from "../../../../contexts/UsersContext";

function Form() {
  const formData = useLoaderData();
  const { user } = useContext(UsersContext);

  const [formInfo, setFormInfo] = useState(formData.response);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("hola");
  };

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

        <Row className="px-lg-5 px-3 m-0">
          {formInfo &&
            formInfo.template.questions.map((question, ind) => (
              <FormQuestion
                key={ind}
                question={question}
                ind={ind}
                formInfo={formInfo}
              />
            ))}
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
