import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import Collapse from "react-bootstrap/esm/Collapse";
import addTemplate from "../../../assets/add.jpg";
import TemplateCard from "./TemplateCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import templateApi from "../../../utils/templateApi";
import questionApi from "../../../utils/questionApi";
import { toast } from "react-toastify";

function Templates({ templates, user }) {
  const [check, setCheck] = useState(false);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  const onNewTemplate = () => {
    user &&
      templateApi
        .newTemplate(user.id)
        .then((res) => {
          questionApi
            .addQuestion(res.template_id, 1)
            .catch((err) => console.log(err));
          return res;
        })
        .then((res) => {
          toast.success(res.message);
          return res;
        })
        .then((res) => navigate(`/${res.hash}`))
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    templateApi
      .getPopularTemplates()
      .then((res) => setPopular(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row
        className="col-11 mx-auto py-3 px-0 rounded-1"
        style={{ backgroundColor: "#eaeaea" }}
      >
        <Row className="justify-content-center align-items-center col-md-10 col-12 mx-auto py-2">
          <Col className="col-10 fs-5 fw-medium">Latest templates</Col>
          <Col className="col-2">
            <ToggleButton
              className="btn btn-sm m-0 px-1 py-0 float-end"
              id="toggle-check"
              type="checkbox"
              variant="outline-secondary"
              checked={check}
              onChange={() => setCheck(!check)}
            >
              <i className="bi bi-caret-down-fill"></i>
            </ToggleButton>
          </Col>
        </Row>
        <Row className="col-md-10 col-12 pb-2 mx-auto">
          {user && (
            <Col
              className="col-6 col-md-4 col-xl-3 justify-content-center px-2 py-1 rounded"
              onClick={() => onNewTemplate()}
            >
              <Link>
                <img
                  src={addTemplate}
                  alt="template"
                  className="object-fit-cover border rounded-top w-100 col-12"
                  style={{ height: 150 }}
                />
                <p
                  style={{ height: 30 }}
                  className="badge text-dark fw-semibold fs-6 text-bg-light w-100 m-0 text-truncate rounded-0 rounded-bottom"
                >
                  New Template
                </p>
              </Link>
            </Col>
          )}
          {templates &&
            templates.slice(0, 3).map((template) => {
              return (
                <TemplateCard key={template.template_id} template={template} />
              );
            })}

          <Collapse in={check}>
            <div className="m-0 p-0" id="example-collapse-text">
              <Col className="col-10 fs-6 fw-medium ps-3 pt-3 pb-1 text-muted">
                Popular
              </Col>
              <div className="d-flex col-12 flex-wrap m-0 p-0">
                {popular &&
                  popular
                    .filter((template) => template.forms != 0)
                    .map((template, ind) => {
                      return <TemplateCard key={ind} template={template} />;
                    })}
              </div>
            </div>
          </Collapse>
        </Row>
      </Row>
    </>
  );
}

export default Templates;
