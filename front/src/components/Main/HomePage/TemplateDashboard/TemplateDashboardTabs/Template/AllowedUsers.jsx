import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import userApi from "../../../../../../utils/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllowedUsers({
  priv,
  setPriv,
  allowedUsers,
  setAllowedUsers,
  themes,
}) {
  const [users, setUsers] = useState([]);

  const addAllowedUser = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const user = users.filter((user) => user.email == e.target.value);
      if (user.length > 0 && !allowedUsers?.includes(user[0].email)) {
        setAllowedUsers(
          allowedUsers ? [...allowedUsers, user[0].email] : [user[0].email]
        );
        toast.success("User added to list, submit to save changes.");
      } else {
        toast.error("User not found or already added.");
      }
    }
  };

  const deleteAllowedUser = (ind) => {
    setAllowedUsers([...allowedUsers.filter((user, index) => index != ind)]);
  };

  useEffect(() => {
    userApi
      .getAllUsers()
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row className="mt-3 mx-2 d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
        <Col className={`col-lg-5 col-md-9 col-8 ${priv ? "" : "d-none"}`}>
          <InputGroup size="sm">
            <Form.Control
              type="search"
              list="users"
              onKeyDown={(e) => addAllowedUser(e)}
            />
            <datalist id="users">
              {users &&
                users.map((user) => (
                  <option key={user.user_id} value={user.email} />
                ))}
            </datalist>

            <DropdownButton variant={themes.button} title="users">
              {allowedUsers?.map((email, ind) => (
                <Dropdown.Item
                  className="py-0 d-flex justify-content-between align-items-center"
                  style={{ width: 300 }}
                  key={ind}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="my-1">{email}</span>
                  <i
                    className="bi bi-x fs-5"
                    onClick={() => deleteAllowedUser(ind)}
                  ></i>
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Col>

        <Col className="col-lg-2 col-md-3 col-4">
          <Form.Check
            type="switch"
            checked={priv}
            onChange={() => setPriv(!priv)}
            className="d-flex align-items-center gap-1"
            label="Private"
          />
        </Col>
      </Row>
    </>
  );
}

export default AllowedUsers;
