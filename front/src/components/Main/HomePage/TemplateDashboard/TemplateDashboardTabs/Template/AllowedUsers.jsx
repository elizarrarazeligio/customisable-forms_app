import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

function AllowedUsers({ priv, setPriv, allowedUsers }) {
  return (
    <>
      <Row className="pt-2 mx-sm-4 mx-3 d-flex flex-row align-items-center justify-content-end">
        <Row className={`col-5 ${priv ? "" : "d-none"}`}>
          <InputGroup size="sm">
            <Form.Control type="search" />
            <DropdownButton variant="outline-secondary" title="allowed users">
              <Dropdown.Item
                className="py-0 d-flex justify-content-between align-items-center"
                style={{ width: 300 }}
              >
                <span className="my-1">eligio2008</span>
                <i
                  className="bi bi-x fs-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("hola");
                  }}
                ></i>
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Row>

        <Form.Check
          type="switch"
          checked={priv}
          onChange={() => setPriv(!priv)}
          className="col-2 d-flex align-items-center gap-1 py-1"
          label="Private template"
        />
      </Row>
    </>
  );
}

export default AllowedUsers;
