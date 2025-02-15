import Col from "react-bootstrap/esm/Col";
import defaultForm from "../../../assets/form.jpg";
import { Link } from "react-router-dom";

function FormTemplate({ template }) {
  return (
    <>
      <Col className="col-6 col-md-4 col-xl-3 justify-content-center px-2 py-1 rounded">
        <Link to={`/${template && template.hash}`}>
          <img
            src={template && template.image ? template.image : defaultForm}
            alt="template"
            className="object-fit-cover border rounded-top w-100 col-12"
            style={{ height: 150 }}
          />
          <p className="badge text-dark fw-semibold fs-6 text-bg-light w-100 m-0 pt-2 text-truncate rounded-0 rounded-bottom">
            {template ? template.title : "<No title>"}
          </p>
        </Link>
      </Col>
    </>
  );
}

export default FormTemplate;
