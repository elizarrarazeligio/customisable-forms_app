import Navbar from "react-bootstrap/esm/Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import formLogo from "../../assets/form_logo.png";
import Menu from "./Menu";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import templateApi from "../../utils/templateApi";
import { ThemeContext } from "../../contexts/ThemeContext";

function Header({ theme, setTheme }) {
  const navigate = useNavigate();
  const { user } = useContext(UsersContext);
  const themes = useContext(ThemeContext);

  const [show, setShow] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const handleUserLoginClick = (evt) => {
    navigate("/");
  };

  useEffect(() => {
    templateApi.getAllTemplates().then((res) => setTemplates(res));
  }, []);

  return (
    <>
      <Navbar
        className={`d-block ${themes.bg} p-2 mb-1 navbar-light navbar-expand`}
      >
        <Row className="d-flex m-0 align-items-center">
          <Col className="col-3">
            <Row className="d-flex align-items-center">
              <Col className="col-sm-2 col-5 ps-0 me-1">
                <span style={{ cursor: "pointer" }} onClick={handleShow}>
                  <i className={`bi bi-list fs-4 ${themes.text}`}></i>
                </span>
              </Col>
              <Menu
                show={show}
                handleHide={handleHide}
                theme={theme}
                setTheme={setTheme}
              />
              <Navbar.Brand
                href="/home"
                className="d-flex align-items-center p-0 m-0 col-4"
              >
                <img src={formLogo} alt="formLogo" width={35} height={35} />
                <h2
                  className={`fs-4 fw-normal m-0 ps-2 d-sm-inline d-none ${themes.text}`}
                >
                  Forms
                </h2>
              </Navbar.Brand>
            </Row>
          </Col>
          <Col className="col-6 justify-self-center">
            <Form className="d-flex flex-column">
              <Form.Control
                type="search"
                placeholder="Search"
                className="rounded-pill form-control-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                <Search
                  templates={templates}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
            </Form>
          </Col>
          <Col className="col-3">
            {user ? (
              <p className={`text-end text-truncate m-0 ${themes.text}`}>
                Hi, {user.first_name}!
              </p>
            ) : (
              <i
                className="bi bi-person-circle fs-4 float-end"
                style={{ color: "#673AB7", cursor: "pointer" }}
                onClick={() => handleUserLoginClick()}
              ></i>
            )}
          </Col>
        </Row>
      </Navbar>
    </>
  );
}

export default Header;
