import Offcanvas from "react-bootstrap/esm/Offcanvas";
import ListGroup from "react-bootstrap/esm/ListGroup";
import formLogo from "../../assets/form_logo.png";

function Menu(props) {
  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex gap-2 align-items-center">
            <img src={formLogo} alt="formLogo" width={30} height={30} />
            Forms Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <hr className="mt-0 col-11" />
          <ListGroup className="col-11 list-group-flush">
            <ListGroup.Item action href="home">
              Home Page
            </ListGroup.Item>
            <ListGroup.Item action href="">
              My Profile
            </ListGroup.Item>
            <ListGroup.Item action href="management">
              User Management
            </ListGroup.Item>
            <ListGroup.Item action href="">
              Logout
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;
