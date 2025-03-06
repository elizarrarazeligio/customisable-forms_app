import Offcanvas from "react-bootstrap/esm/Offcanvas";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Form from "react-bootstrap/esm/Form";
import formLogo from "../../assets/form_logo.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { toast } from "react-toastify";
import userApi from "../../utils/userApi.js";
import { ThemeContext } from "../../contexts/ThemeContext.js";

function Menu(props) {
  const { user } = useContext(UsersContext);
  const themes = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userApi
      .logoutUser()
      .then((res) => {
        navigate("/");
        props.removeCookie("permissions");
        toast.success(res.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleHide}>
        <Offcanvas.Header
          closeButton
          closeVariant={themes.close}
          className={`${themes.bg} ${themes.text}`}
        >
          <Offcanvas.Title className="d-flex gap-2 align-items-center">
            <img src={formLogo} alt="formLogo" width={30} height={30} />
            Forms Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={`pt-0 ${themes.bg}`}>
          <hr className={`mt-0 col-11 ${themes.text}`} />

          <div className="d-flex flex-column">
            <ListGroup className="col-11 list-group-flush">
              <ListGroup.Item
                action
                href="/home"
                className={`${themes.bg} ${themes.text}`}
              >
                Home Page
              </ListGroup.Item>
              {user && (
                <div className="list-group-flush">
                  <ListGroup.Item
                    action
                    href="/profile"
                    className={`${themes.bg} ${themes.text}`}
                  >
                    My Profile
                  </ListGroup.Item>
                  {user.admin && (
                    <ListGroup.Item
                      action
                      href="/management"
                      className={`${themes.bg} ${themes.text}`}
                    >
                      User Management
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item
                    action
                    onClick={() => handleLogout()}
                    className={`${themes.bg} ${themes.text}`}
                  >
                    Logout
                  </ListGroup.Item>
                </div>
              )}
            </ListGroup>

            <div className="mt-3 col-11 align-self-center">
              <Form.Check
                type="switch"
                checked={props.theme == "light" ? false : true}
                onChange={() =>
                  props.setTheme(props.theme == "light" ? "dark" : "light")
                }
                className={`d-flex align-items-center gap-2 py-1 ${themes.text}`}
                label="Dark Mode"
              />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;
