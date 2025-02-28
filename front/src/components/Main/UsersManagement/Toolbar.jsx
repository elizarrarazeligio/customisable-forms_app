import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import userApi from "../../../utils/userApi.js";

function Toolbar({ setStatus, themes }) {
  const handleClickStatus = (status) => {
    userApi
      .setUserStatus(status)
      .then((res) => {
        toast.success(res.message);
        setStatus([status]);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const handleAdminStatus = (status) => {
    userApi
      .setAdminStatus(status)
      .then((res) => {
        toast.success(res.message);
        setStatus([status]);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  const handleDeleteUser = () => {
    userApi
      .deleteUser()
      .then((res) => {
        toast.success(res.message);
        setStatus([res.affectedRows]);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="px-2 py-2 d-flex justify-content-between rounded-top-2"
        style={{ backgroundColor: themes.bg2 }}
      >
        <div className="d-flex">
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-1 me-1"
            type="button"
            onClick={() => handleClickStatus(true)}
          >
            <i className="bi bi-lock-fill fs-6 text-secondary px-1"></i>
            <p className="fs-6 m-0 pl-1 me-2 text-secondary">Block</p>
          </Button>
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-1 me-1"
            type="button"
            onClick={() => handleClickStatus(false)}
          >
            <i className="bi bi-unlock-fill fs-6 text-secondary px-1"></i>
          </Button>
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-1 me-1"
            type="button"
            onClick={() => handleDeleteUser()}
          >
            <i className="bi bi-trash-fill fs-6 text-danger px-1"></i>
          </Button>
        </div>
        <div className="d-flex ms-auto me-1">
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-0 me-1"
            type="button"
            onClick={() => handleAdminStatus(true)}
          >
            <i className="bi bi-person-fill-check fs-5 text-success"></i>
          </Button>
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-0"
            type="button"
            onClick={() => handleAdminStatus(false)}
          >
            <i className="bi bi-person-fill-x fs-5 text-danger"></i>
          </Button>
        </div>

        <Form.Control
          type="search"
          placeholder="Filter"
          className="w-25"
          aria-label="Search"
        />
      </Navbar>
    </>
  );
}
export default Toolbar;
