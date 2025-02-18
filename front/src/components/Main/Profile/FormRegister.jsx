import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import formApi from "../../../utils/formApi";

function FormRegister({ form, setManageChange }) {
  const navigate = useNavigate();

  const handleDeleteTemplate = (e) => {
    e.stopPropagation();
    formApi
      .deleteForm(form.form_id)
      .then((res) => {
        setManageChange([true]);
        toast.success(res.message);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  return (
    <>
      <tr onClick={() => navigate(`/form/${form.hash}`)}>
        <td>Form from "{form.template.title}"</td>
        <td>
          {`${form.created_at.slice(0, 10)} at 
          ${form.created_at.slice(11, 19)}`}
        </td>
        <td onClick={(e) => handleDeleteTemplate(e)}>
          <CloseButton></CloseButton>
        </td>
      </tr>
    </>
  );
}

export default FormRegister;
