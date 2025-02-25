import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import commentApi from "../../../../utils/commentApi";

function Comment({ comment, user, setCommentsChange }) {
  const handleDeleteComment = (e) => {
    commentApi
      .deleteComment(e.currentTarget.id)
      .then(() => setCommentsChange([true]))
      .catch((err) => err.then((res) => console.log(res)));
  };

  return (
    <Row className="m-0 mx-4 d-flex align-items-center">
      <Col className="col-10">
        <Row className="fw-semibold">
          <p className="m-0 p-0 pe-3 text-truncate">
            {comment.user.first_name} {comment.user.last_name}
            {" - "}
            <span className="m-0 p-0 text-muted" style={{ fontSize: "0.8rem" }}>
              {comment.created_at.slice(0, 10)} at{" "}
              {comment.created_at.slice(11, 16)}
            </span>
          </p>
        </Row>
        <Row>{comment.description}</Row>
      </Col>
      {user && (user.admin || user.id == comment.user_id) && (
        <Col className="col-2 p-0 m-0">
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
      )}
      <hr />
    </Row>
  );
}

export default Comment;
