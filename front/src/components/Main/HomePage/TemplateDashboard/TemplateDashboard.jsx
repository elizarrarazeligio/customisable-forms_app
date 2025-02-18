import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import { useParams, Link, Outlet, useOutletContext } from "react-router-dom";

function TemplateDashboard() {
  const { templateHash } = useParams();
  const [template] = useOutletContext();

  return (
    <Container className="col-lg-10 col-12 flex-column mx-auto p-0">
      <Nav
        className="col-lg-10 col-11 mx-auto d-flex justify-content-center border-0 nav-tabs"
        defaultActiveKey="general"
      >
        <Nav.Item>
          <Nav.Link as="div" eventKey="general" className="m-0 p-0">
            <Link to={`/${templateHash}`} className="text-dark nav-link">
              General
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div" eventKey="results" className="m-0 p-0">
            <Link
              to={`/${templateHash}/results`}
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
