import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useLoaderData } from "react-router-dom";

function Form() {
  const formData = useLoaderData();
  const [formInfo, setFormInfo] = useState(formData.response);

  console.log(formInfo);

  return (
    <Container className="col-lg-10 col-12 flex-column mx-auto bg-white px-2 py-2 rounded">
      Hola
    </Container>
  );
}

export default Form;
