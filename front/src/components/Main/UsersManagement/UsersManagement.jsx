import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import UsersTable from "./UsersTable";
import Toolbar from "./Toolbar";
import { useContext, useEffect, useState } from "react";
import userApi from "../../../utils/userApi.js";
import { ThemeContext } from "../../../contexts/ThemeContext.js";

function UsersManagement() {
  const themes = useContext(ThemeContext);

  const [allUsers, setAllUsers] = useState([]);
  const [check, setCheck] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [status, setStatus] = useState([]);

  const setUsers = () => {
    userApi
      .getAllUsers()
      .then((res) => setAllUsers(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUsers();
  }, [check, checkAll, status]);

  return (
    <>
      <Container
        fluid
        className={`${themes.bg3} ${themes.text} px-2 py-4 d-flex flex-column align-items-center`}
      >
        <Row className="m-0 py-2">
          <h3>Users Management</h3>
        </Row>

        <Row className="m-0 col-md-10 col-12">
          <Toolbar setStatus={setStatus} themes={themes} />
        </Row>

        <Row className="overflow-auto m-0 col-md-10 col-12">
          <UsersTable
            users={allUsers}
            check={check}
            setCheck={setCheck}
            checkAll={checkAll}
            setCheckAll={setCheckAll}
            themes={themes}
          />
        </Row>
      </Container>
    </>
  );
}
export default UsersManagement;
