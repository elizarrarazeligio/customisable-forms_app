import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Templates from "./Templates";
import { UsersContext } from "../../../contexts/UsersContext";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

function HomePage() {
  const { user } = useContext(UsersContext);
  const themes = useContext(ThemeContext);
  const templatesData = useLoaderData();
  const [allTemplates, setAllTemplates] = useState(templatesData);

  useEffect(() => {
    setAllTemplates(templatesData);
  }, [templatesData]);

  return (
    <>
      <Container fluid className={`${themes.bg3} px-2 py-4`}>
        <Row className="m-0">
          <Templates templates={allTemplates} user={user} />
        </Row>

        <Row className="m-0"></Row>
      </Container>
    </>
  );
}

export default HomePage;
