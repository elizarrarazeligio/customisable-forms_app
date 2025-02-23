import Form from "react-bootstrap/esm/Form";
import { useEffect, useState } from "react";
import checkboxApi from "../../../../utils/checkboxApi";

function FormCheckbox({ checkbox, submitted, user, formInfo, checkedAnswers }) {
  const [checked, setChecked] = useState(checkedAnswers[0]?.checked);

  useEffect(() => {
    if (!submitted) return;
    checkboxApi
      .updateCheckboxStatus(checkedAnswers[0].checkedanswer_id, checked)
      .catch((err) => err.then((res) => console.log(res)));
  }, [submitted]);

  return (
    <Form.Check
      type="checkbox"
      checked={checked}
      onChange={() => setChecked(!checked)}
      label={checkbox.option}
      className="mx-2 mb-2 d-flex gap-2 align-items-center"
      disabled={
        user && (user.admin || user.id == formInfo.user_id) ? false : true
      }
    />
  );
}

export default FormCheckbox;
