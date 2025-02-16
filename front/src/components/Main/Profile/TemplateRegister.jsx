import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";

function TemplateRegister({ template }) {
  const navigate = useNavigate();

  return (
    <>
      <tr onClick={() => navigate(`/${template.hash}`)}>
        <td>{template.title}</td>
        <td>
          {`${template.created_at.slice(0, 10)} at 
          ${template.created_at.slice(11, 19)}`}
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <CloseButton></CloseButton>
        </td>
      </tr>
    </>
  );
}

export default TemplateRegister;
