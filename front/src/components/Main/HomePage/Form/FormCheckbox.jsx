import Form from "react-bootstrap/esm/Form";
import { useEffect, useState } from "react";
import checkboxApi from "../../../../utils/checkboxApi";

function FormCheckbox({ checkbox, submitted }) {
  const [checked, setChecked] = useState(checkbox.checked);

  useEffect(() => {
    if (!submitted) return;
    checkboxApi
      .updateCheckboxStatus(checkbox.checkbox_id, checked)
      .catch((err) => err.then((res) => console.log(res)));
  }, [submitted]);

  return (
    <Form.Check
      type="checkbox"
      checked={checked}
      onChange={() => setChecked(!checked)}
      label={checkbox.option}
      className="mx-2 mb-2 d-flex gap-2 align-items-center"
    />
  );
}

export default FormCheckbox;
