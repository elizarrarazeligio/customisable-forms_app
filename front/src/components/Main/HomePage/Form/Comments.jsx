import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import commentApi from "../../../../utils/commentApi";
import { UsersContext } from "../../../../contexts/UsersContext";

function Comments({ templateId }) {
  const { user } = useContext(UsersContext);

  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState("");
  const [commentsChange, setCommentsChange] = useState(false);

  const handleDeleteComment = (e) => {
    commentApi
      .deleteComment(e.currentTarget.id)
      .then(() => setCommentsChange([true]))
      .catch((err) => err.then((res) => console.log(res)));
  };

  const handleCommentSubmit = () => {
    commentApi
      .addComment(templateId, user.id, description)
      .then(() => setCommentsChange([true]))
      .then(() => setDescription(""))
      .catch((err) => err.then((res) => console.log(res)));
  };

  useEffect(() => {
    commentApi
      .getTemplateComments(templateId)
      .then((res) => setComments(res.response))
      .catch((err) => err.then((res) => console.log(res)));
  }, [commentsChange]);

  return (
    <>
      <hr />
      {comments.length > 0 ? (
        comments.map((comment, ind) => (
          <Row key={ind} className="m-0 mx-4 d-flex align-items-center">
            <Col className="col-11">
              <Row className="fw-semibold">
                <p className="m-0 p-0 pe-3 text-truncate">
                  {comment.user.first_name} {comment.user.last_name}
                  {" - "}
                  <span
                    className="m-0 p-0 text-muted"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {comment.created_at.slice(0, 10)} at{" "}
                    {comment.created_at.slice(11, 16)}
                  </span>
                </p>
              </Row>
              <Row>{comment.description}</Row>
            </Col>
            <Col className="col-1 p-0 m-0">
              <Button
                className="m-0 p-1 bg-danger border-danger float-end"
                style={{ width: 35 }}
                type="button"
                id={comment.comment_id}
                onClick={(e) => handleDeleteComment(e)}
              >
                <i className="bi bi-trash-fill"></i>
              </Button>
            </Col>
            <hr />
          </Row>
        ))
      ) : (
        <h5 className="text-center text-muted mb-3">No comments added yet</h5>
      )}

      <Row className="mx-4 mb-2">
        <InputGroup className="m-0 p-0">
          <Form.Control
            placeholder="Enter your comment"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleCommentSubmit()}
          >
            Enter
          </Button>
        </InputGroup>
      </Row>
    </>
  );
}

export default Comments;
