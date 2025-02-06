import Col from "react-bootstrap/esm/Col";
import defaultForm from "../../../assets/form.jpg";

function FormTemplate({ value }) {
  const foto = "";
  const titulo = "";

  return (
    <>
      <Col
        className="col-6 col-md-4 col-xl-3 justify-content-center px-2 py-1 rounded"
        key={value}
      >
        <img
          src={foto ? foto : defaultForm}
          alt="template"
          className="object-fit-cover border rounded-top w-100 col-12"
          style={{ height: 150 }}
        />
        <p className="badge text-dark fw-semibold fs-6 text-bg-light w-100 m-0 pt-2 text-truncate rounded-0 rounded-bottom">
          {titulo ? titulo : "<No title>"}
        </p>
      </Col>
    </>
  );
}

export default FormTemplate;
