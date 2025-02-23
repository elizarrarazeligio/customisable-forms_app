import Carousel from "react-bootstrap/esm/Carousel";

function MultipleLine({ answers }) {
  return (
    <>
      <Carousel
        className="bg-secondary col-12 col-sm-10 col-md-7 rounded-5 text-white"
        style={{ height: 150 }}
      >
        {answers.slice(0, 5).map((answer, ind) => (
          <Carousel.Item key={ind}>
            <div
              className="d-flex flex-column align-items-center justify-content-center mt-2 overflow-auto"
              style={{ height: 115 }}
            >
              <p className="m-0 p-0">{answer.answer}</p>
            </div>
            <span
              className="fw-semibold m-0 p-1 badge rounded-pill bg-white text-secondary"
              style={{ width: 60, height: 18, fontSize: "0.6rem" }}
            >
              Answer {ind + 1}
            </span>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default MultipleLine;
