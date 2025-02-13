import TemplatesTable from "./TemplatesTable";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function Profile() {
  return (
    <>
      <Container fluid className="bg-white px-2 py-4">
        <Row className="m-0">
          <TemplatesTable />
        </Row>

        <Row className="m-0">
          <TemplatesTable />
        </Row>
      </Container>
    </>
  );
}

export default Profile;
