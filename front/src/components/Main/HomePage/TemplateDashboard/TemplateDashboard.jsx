import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
  Link,
  Outlet,
} from "react-router-dom";
import { toast } from "react-toastify";

function TemplateDashboard() {
  const navigate = useNavigate();
  const { templateHash } = useParams();
  const templateData = useLoaderData();

  const [template, setTemplate] = useState(templateData.response);

  useEffect(() => {
    if (templateData.status == "success") {
      setTemplate(templateData.response);
    } else if (templateData.status == "error") {
      toast.error(templateData.response);
      navigate("/home");
    }
  }, [templateData]);

  return (
    <Container className="col-lg-10 col-12 flex-column mx-auto p-0">
      <Nav
        className="col-10 mx-auto d-flex justify-content-center border-0 nav-tabs"
        defaultActiveKey="general"
      >
        <Nav.Item>
          <Nav.Link as="div" eventKey="general" className="m-0 p-0">
            <Link to={`/${templateHash}`} className="text-dark nav-link">
              General Settings
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div" eventKey="results" className="m-0 p-0">
            <Link
              to={`/${templateHash}/forms`}
              className="text-dark nav-link"
              data-toggle="tab"
            >
              Forms Results
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div" eventKey="summary" className="m-0 p-0">
            <Link
              to={`/${templateHash}/summary`}
              className="text-dark nav-link"
              data-toggle="tab"
            >
              Summary
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet context={[template]} />
    </Container>
  );
}

export default TemplateDashboard;
