import Offcanvas from "react-bootstrap/esm/Offcanvas";
import ListGroup from "react-bootstrap/esm/ListGroup";
import formLogo from "../../assets/form_logo.png";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";

function Menu(props) {
  const { user } = useContext(UsersContext);

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
            {user && (
              <div className="list-group-flush">
                <ListGroup.Item action href="profile">
                  My Profile
                </ListGroup.Item>
                {user.admin && (
                  <ListGroup.Item action href="management">
                    User Management
                  </ListGroup.Item>
                )}
                <ListGroup.Item action href="">
                  Logout
                </ListGroup.Item>
              </div>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;
