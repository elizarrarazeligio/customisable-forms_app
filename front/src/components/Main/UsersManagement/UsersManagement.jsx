import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import UsersTable from "./UsersTable";
import Toolbar from "./Toolbar";

function UsersManagement() {
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

        <Row
          className="overflow-auto m-0 col-md-10 col-12"
          // style={{ maxHeight: 400 }}
        >
          <UsersTable />
        </Row>
      </Container>
    </>
  );
}
export default UsersManagement;
