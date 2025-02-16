import TemplatesTable from "./TemplatesTable";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { UsersContext } from "../../../contexts/UsersContext";
import { useContext, useEffect, useState } from "react";
import templateApi from "../../../utils/templateApi";

function Profile() {
  const { user } = useContext(UsersContext);
  const [templates, setTemplates] = useState([]);

  const getUserTemplates = (user_id) => {
    templateApi
      .getUserTemplates(user_id)
      .then((res) => setTemplates(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    user && getUserTemplates(user.id);
  }, [user]);

  return (
    <>
      <Container fluid className="bg-white px-2 py-4 d-flex flex-column">
        <Row className="mx-auto justify-self-center">
          {user && <h2>Welcome back {user.first_name}!</h2>}
        </Row>

        <Row className="m-0">
          <TemplatesTable templates={templates} />
        </Row>

        <Row className="m-0"></Row>
      </Container>
    </>
  );
}

export default Profile;
