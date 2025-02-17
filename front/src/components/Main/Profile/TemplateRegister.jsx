import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import templateApi from "../../../utils/templateApi";
import { toast } from "react-toastify";

function TemplateRegister({ template, setManageChange }) {
  const navigate = useNavigate();

  const handleDeleteTemplate = (e) => {
    e.stopPropagation();
    templateApi
      .deleteTemplate(template.template_id)
      .then((res) => {
        setManageChange([true]);
        toast.success(res.message);
      })
      .catch((err) => err.then((res) => toast.error(res.message)));
  };

  return (
    <>
      <tr onClick={() => navigate(`/${template.hash}`)}>
        <td>{template.title}</td>
        <td>
          {`${template.created_at.slice(0, 10)} at 
          ${template.created_at.slice(11, 19)}`}
        </td>
        <td onClick={(e) => handleDeleteTemplate(e)}>
          <CloseButton></CloseButton>
        </td>
      </tr>
    </>
  );
}

export default TemplateRegister;
