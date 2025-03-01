function FormInput({ label, value }) {
  return (
    <>
      <label className="form-label col-2 fw-semibold m-0">{label}</label>
      <div className="col-10">
        <input type="text" className="form-control" disabled value={value} />
      </div>
    </>
  );
}

export default FormInput;
