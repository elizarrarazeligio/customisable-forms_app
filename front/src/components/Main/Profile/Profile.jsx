import ProfileTable from "./ProfileTable";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { UsersContext } from "../../../contexts/UsersContext";
import { useContext, useEffect, useState } from "react";
import templateApi from "../../../utils/templateApi";
import formApi from "../../../utils/formApi";
import { ThemeContext } from "../../../contexts/ThemeContext";

function Profile() {
  const { user } = useContext(UsersContext);
  const themes = useContext(ThemeContext);

  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  const [manageChange, setManageChange] = useState([]);

  const getUserTemplates = (user_id) => {
    templateApi
      .getUserTemplates(user_id)
      .then((res) => setTemplates(res))
      .catch((err) => console.log(err));
  };

  const getUserForms = (user_id) => {
    formApi
      .getUserForms(user_id)
      .then((res) => setForms(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      getUserTemplates(user.id);
      getUserForms(user.id);
    }
  }, [user, manageChange]);

  return (
    <>
      <Container fluid className={`${themes.bg3} px-2 py-4 d-flex flex-column`}>
        <Row className={`${themes.text} mx-auto justify-self-center`}>
          {user && <h2>Welcome back {user.first_name}!</h2>}
        </Row>

        <Row className="m-0">
          <ProfileTable
            title="My created templates"
            array={templates}
            setManageChange={setManageChange}
            themes={themes}
          />
        </Row>

        <hr className="hr col-9 align-self-center mt-5" />

        <Row className="m-0">
          <ProfileTable
            title="My answered forms"
            array={forms}
            setManageChange={setManageChange}
            themes={themes}
          />
        </Row>
      </Container>
    </>
  );
}

export default Profile;
