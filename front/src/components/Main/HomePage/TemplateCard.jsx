import Col from "react-bootstrap/esm/Col";
import defaultForm from "../../../assets/form.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

function TemplateCard({ template }) {
  const themes = useContext(ThemeContext);

  return (
    <>
      <Col className="col-6 col-md-4 col-xl-3 justify-content-center px-2 py-1 rounded">
        <Link to={`/${template && template.hash}`}>
          <img
            src={template && template.image ? template.image : defaultForm}
            onError={(e) => (e.currentTarget.src = defaultForm)}
            alt="template"
            className="object-fit-cover border rounded-top w-100 col-12"
            style={{ height: 140 }}
          />
          <p
            style={{ height: 40 }}
            className={`badge ${themes.bg} ${themes.text} fw-semibold fs-6 w-100 m-0 px-2 py-1 text-truncate rounded-0 rounded-bottom`}
          >
            {template ? template.title : "<No title>"} <br />
            <span
              className={`${themes.text2} fw-normal`}
              style={{ fontSize: "0.6rem" }}
            >
              {template &&
                `${template.user.first_name} (${template.user.email})`}
            </span>
          </p>
        </Link>
      </Col>
    </>
  );
}

export default TemplateCard;
