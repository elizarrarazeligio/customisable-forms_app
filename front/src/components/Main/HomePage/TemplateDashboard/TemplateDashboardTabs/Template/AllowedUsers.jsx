import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import userApi from "../../../../../../utils/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllowedUsers({ priv, setPriv, allowedUsers, setAllowedUsers }) {
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
    // setEmails([...emails.filter((email, index) => index != ind)]);
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
      <Row className="pt-2 mx-sm-4 mx-3 d-flex flex-row align-items-center justify-content-end">
        <Row className={`col-5 ${priv ? "" : "d-none"}`}>
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

            <DropdownButton variant="outline-secondary" title="allowed users">
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
