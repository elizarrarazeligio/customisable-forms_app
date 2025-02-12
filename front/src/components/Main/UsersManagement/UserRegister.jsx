import Form from "react-bootstrap/Form";

function UserRegister({ user, handleCheckUser }) {
  return (
    <>
      <tr>
        <td>
          <Form>
            <Form.Check
              type="checkbox"
              className="ms-1"
              id={user.user_id}
              checked={user.checked}
              onChange={(e) => handleCheckUser(e)}
            />
          </Form>
        </td>
        <td>
          {user.first_name} {user.last_name}
        </td>
        <td>{user.email}</td>
        <td>
          {user.admin ? (
            <p className="my-1 bg-primary text-white text-center">True</p>
          ) : (
            <p className="my-1">False</p>
          )}
        </td>
        <td>
          {user.status ? (
            <p className="my-1 bg-danger text-white text-center">Blocked</p>
          ) : (
            <p className="my-1 bg-success text-white text-center">Active</p>
          )}
        </td>
      </tr>
    </>
  );
}
export default UserRegister;
