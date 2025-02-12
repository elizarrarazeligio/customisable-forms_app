import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import api from "../../../utils/Api";

function Toolbar({ setStatus }) {
  //   const { handleStatusClick, handleDeleteUser } = useContext(UsersContext);
  const handleClickStatus = (status) => {
    api
      .setUserStatus(status)
      .then((res) => {
        toast.success(res.message);
        setStatus([status]);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-secondary border-secondary border border-3 px-1 py-1 d-flex justify-content-between rounded-2"
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
            // onClick={() => handleDeleteUser()}
          >
            <i className="bi bi-trash-fill fs-6 text-danger px-1"></i>
          </Button>
        </div>
        <div className="d-flex ms-auto me-1">
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-0 me-1"
            type="button"
          >
            <i className="bi bi-person-fill-check fs-5 text-success"></i>
          </Button>
          <Button
            className="btn btn-light btn-lg d-flex align-items-center px-1 py-0"
            type="button"
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
