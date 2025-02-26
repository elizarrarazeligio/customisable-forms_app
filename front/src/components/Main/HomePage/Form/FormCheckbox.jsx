import Form from "react-bootstrap/esm/Form";
import { useEffect, useState } from "react";
import checkboxApi from "../../../../utils/checkboxApi";

function FormCheckbox({ checkbox, submitted, user, formInfo, checkedAnswers }) {
  const [checked, setChecked] = useState(checkedAnswers[0]?.checked || false);
  const [checkedAnswer, setCheckedAnswer] = useState(checkedAnswers[0]);

  useEffect(() => {
    if (!submitted) return;
    checkboxApi
      .updateCheckboxStatus(checkedAnswer?.checkedanswer_id || 0, checked)
      .catch(
        async () =>
          await checkboxApi
            .addCheckedAnswer(checkbox.checkbox_id, formInfo.form_id, checked)
            .then((res) => setCheckedAnswer(res.response))
            .catch((err) => console.log(err))
      );
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
