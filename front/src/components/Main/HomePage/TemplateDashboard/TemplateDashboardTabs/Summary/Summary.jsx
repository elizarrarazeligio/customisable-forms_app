import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import SingleLine from "./SingleLine";
import MultipleLine from "./MultipleLine";
import PositiveIntegers from "./PositiveIntegers";
import Checkboxes from "./Checkboxes";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function Summary() {
  const templateQuestions = useLoaderData();
  const [questions, setQuestions] = useState(
    templateQuestions.response.questions
  );

  return (
    <Container fluid className="bg-white px-2 pt-2 pb-4 rounded mb-1">
      <Row className="mx-auto pt-4 px-0 col-lg-10 col-11">
        <h2 className="text-center mb-3">Results Summary</h2>

        <hr />
        <p className="text-center">
          Go ahead and take a look at the summary of the results for each
          question of your template!
        </p>
        <hr />
      </Row>

      {questions.map((question, ind) => (
        <Container fluid className="d-flex flex-column" key={ind}>
          <Row className="overflow-auto mx-auto pt-2 px-0 col-lg-10 col-11 m-0">
            <h6 className="text-center fw-bold">{question.description}</h6>
          </Row>

          <Row className="mx-auto p-0 mb-4 col-10 d-flex flex-column align-items-center text-center justify-content-center">
            {question.field == "Single-Line" ? (
              <SingleLine answers={question.answers} />
            ) : question.field == "Multiple-Line" ? (
              <MultipleLine answers={question.answers} />
            ) : question.field == "Positive Integers" ? (
              <PositiveIntegers answers={question.answers} />
            ) : (
              <Checkboxes answers={question.checkboxes} />
            )}
          </Row>
        </Container>
      ))}
    </Container>
  );
}

export default Summary;
