import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import UsersTable from "./UsersTable";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";
import api from "../../../utils/Api";

function UsersManagement() {
  const [allUsers, setAllUsers] = useState([]);

  const setUsers = () => {
    api
      .getAllUsers()
      .then((res) => setAllUsers(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUsers();
  }, []);

  return (
    <>
      <Container
        fluid
        className="bg-white px-2 py-4 d-flex flex-column align-items-center"
      >
        <Row className="m-0 py-2">
          <h3>Users Management</h3>
        </Row>

        <Row className="m-0 col-md-10 col-12">
          <Toolbar />
        </Row>

        <Row className="overflow-auto m-0 col-md-10 col-12">
          <UsersTable users={allUsers} />
        </Row>
      </Container>
    </>
  );
}
export default UsersManagement;
