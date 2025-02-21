import formLogo from "../../../../../../assets/form_logo.png";
import { useNavigate } from "react-router-dom";

function FormResultRegister({ form }) {
  const navigate = useNavigate();

  return (
    <>
      <tr onClick={() => navigate(`/form/${form.hash}`)}>
        <td className="py-1 text-center">
          <img src={formLogo} alt="form-icon" style={{ width: 25 }} />
        </td>
        <td>
          {form.user.first_name} {form.user.last_name}
        </td>
        <td>{form.user.email}</td>
        <td>{`${form.created_at.slice(0, 10)} at 
          ${form.created_at.slice(11, 19)}`}</td>
      </tr>
    </>
  );
}

export default FormResultRegister;
