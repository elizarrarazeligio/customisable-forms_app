import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Templates from "./Templates";
import TemplatesTable from "./TemplatesTable";

function HomePage() {
  return (
    <>
      <Container fluid className="bg-white px-2 py-4">
        <Row className="m-0">
          <Templates />
        </Row>
        
        <Row className="m-0">
          <TemplatesTable />
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
