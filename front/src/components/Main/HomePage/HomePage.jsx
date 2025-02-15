import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Templates from "./Templates";
import { UsersContext } from "../../../contexts/UsersContext";
import { useContext, useEffect, useState } from "react";
import templateApi from "../../../utils/templateApi";

function HomePage() {
  const { user } = useContext(UsersContext);
  const [templates, setTemplates] = useState([]);

  const getTemplates = (user_id) => {
    templateApi
      .getUserTemplates(user_id)
      .then((res) => setTemplates(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    user && getTemplates(user.id);
  }, [user]);

  return (
    <>
      <Container fluid className="bg-white px-2 py-4">
        <Row className="m-0">
          <Templates templates={templates} user={user} />
        </Row>

        <Row className="m-0"></Row>
      </Container>
    </>
  );
}

export default HomePage;
