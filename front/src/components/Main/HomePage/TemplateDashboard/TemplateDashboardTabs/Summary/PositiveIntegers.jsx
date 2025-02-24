function PositiveIntegers({ answers }) {
  const array = answers.map((i) => parseInt(i.answer));
  const sum = array.reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <div
        style={{ height: 100 }}
        className="bg-secondary col-6 col-md-3 col-sm-5 rounded-2 p-2 m-0"
      >
        <div
          className="bg-light m-0 rounded-2 col-12 d-flex align-items-center justify-content-center"
          style={{ height: 75 }}
        >
          <p className="h1 fw-bold" style={{ fontSize: "3.5rem" }}>
            {array.length > 0 ? sum / array.length : ""}
          </p>
        </div>
        <p className="m-0 fw-bold text-white" style={{ fontSize: "0.7rem" }}>
          Average
        </p>
      </div>
    </>
  );
}

export default PositiveIntegers;
