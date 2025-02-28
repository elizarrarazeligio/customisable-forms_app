import { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import {
  useParams,
  Link,
  Outlet,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { ThemeContext } from "../../../../contexts/ThemeContext";

function TemplateDashboard() {
  const { templateHash } = useParams();
  const location = useLocation();
  const themes = useContext(ThemeContext);

  const [template] = useOutletContext();
  const [defaultTab, setDefaultTab] = useState(
    location.pathname.split("/")[2] || "general"
  );

  return (
    <Container
      className={`${themes.text} col-lg-10 col-12 flex-column mx-auto p-0`}
    >
      <Nav
        className="col-lg-10 col-11 mx-auto d-flex justify-content-center border-0 nav-tabs"
        defaultActiveKey={defaultTab}
      >
        <Nav.Item>
          <Nav.Link
            as="div"
            eventKey="general"
            className={`m-0 p-0 ${defaultTab == "general" && themes.tab}`}
          >
            <Link
              to={`/${templateHash}`}
              className={`${themes.text} nav-link`}
              onClick={() => setDefaultTab("general")}
            >
              General
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as="div"
            eventKey="results"
            className={`m-0 p-0 ${defaultTab == "results" && themes.tab}`}
          >
            <Link
              to={`/${templateHash}/results`}
              className={`${themes.text} nav-link`}
              onClick={() => setDefaultTab("results")}
            >
              Forms Results
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as="div"
            eventKey="summary"
            className={`m-0 p-0 ${defaultTab == "summary" && themes.tab}`}
          >
            <Link
              to={`/${templateHash}/summary`}
              className={`${themes.text} nav-link`}
              onClick={() => setDefaultTab("summary")}
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
