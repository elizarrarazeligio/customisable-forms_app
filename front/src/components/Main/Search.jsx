import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import templateApi from "../../utils/templateApi";

function Search({ templates, search }) {
  return (
    <>
      <Container
        fluid
        className={`position-absolute start-50 translate-middle-x m-0 px-3 pt-1 col-sm-8 col-md-6 col-12 ${
          !search && "d-none"
        }`}
        style={{ zIndex: 1 }}
      >
        <ListGroup className="list-group-flush border col-12 mx-0 rounded-1">
          {templates &&
            templates.map((template, ind) => (
              <ListGroup.Item
                key={ind}
                style={{ fontSize: "0.8rem" }}
                action
                href={`/${template.hash}`}
                className="col-12 d-flex"
              >
                <Col className="col-6">{template.title}</Col>
                <Col
                  className="col-6 text-muted d-flex justify-content-end text-truncate align-items-center"
                  style={{ fontSize: "0.7rem" }}
                >
                  <span className="fw-semibold col-3 text-end">Author:</span>{" "}
                  <p className="m-0 p-0 col-3 ms-1">
                    {template.user.first_name}
                  </p>
                </Col>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </>
  );
}

export default Search;
