import { useEffect, useState } from "react";
import Comment from "./Comment";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Collapse from "react-bootstrap/esm/Collapse";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import commentApi from "../../../../utils/commentApi";
import likeApi from "../../../../utils/likeApi";

function Comments({ templateId, user }) {
  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState("");
  const [commentsChange, setCommentsChange] = useState(false);
  const [check, setCheck] = useState(false);
  const [likes, setLikes] = useState([]);
  const [like, setLike] = useState(null);

  const handleCommentSubmit = () => {
    commentApi
      .addComment(templateId, user.id, description)
      .then(() => setCommentsChange([true]))
      .then(() => setDescription(""))
      .catch((err) => err.then((res) => console.log(res)));
  };

  const handleLike = () => {
    likeApi.likeTemplate(templateId, user.id).then(() => setLike(true));
  };

  const handleLikeDelete = () => {
    const like = likes.filter((like) => like.user_id == user.id);
    likeApi
      .deleteLike(like[0].like_id)
      .then(() => setLike(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    likeApi
      .getTemplateLikes(templateId)
      .then((res) => {
        if (user && res.likes.some((like) => like.user_id == user.id))
          setLike(true);
        setLikes(res.likes);
      })
      .catch((err) => err.then((res) => console.log(res)));
  }, [like]);

  useEffect(() => {
    commentApi
      .getTemplateComments(templateId)
      .then((res) => setComments(res.response))
      .catch((err) => err.then((res) => console.log(res)));
  }, [commentsChange]);

  return (
    <>
      <Row className="m-0 p-0 d-flex align-items-center text-center">
        <Col className="col-1 col-sm-3" />
        <Col className="d-flex align-items-center justify-content-sm-center gap-2 col-sm-6 col-8 ">
          <span className="text-muted fw-semibold">Display comments</span>
          <ToggleButton
            className="btn btn-sm m-0 px-1 py-0"
            id="toggle1"
            type="checkbox"
            variant="outline-secondary"
            checked={check}
            onChange={() => setCheck(!check)}
          >
            <i className="bi bi-caret-down-fill p-0 m-0"></i>
          </ToggleButton>
        </Col>
        <Col className="col-3 d-flex align-items-center justify-content-sm-end justify-content-center">
          <ToggleButton
            className="btn btn-sm m-0 py-0"
            id="toggle2"
            type="checkbox"
            variant="outline-danger"
            checked={like}
            onChange={() => (like ? handleLikeDelete() : handleLike())}
            disabled={user ? false : true}
          >
            <i className="bi bi-heart-fill me-1"></i>
            <span className="p-0 m-0">{likes.length}</span>
          </ToggleButton>
        </Col>
      </Row>
      <Row className="m-0 px-2">
        <Collapse in={check}>
          <div className="m-0 p-0" id="collapse">
            <hr />
            {comments.length > 0 ? (
              comments.map((comment, ind) => (
                <Comment
                  key={ind}
                  comment={comment}
                  user={user}
                  setCommentsChange={setCommentsChange}
                />
              ))
            ) : (
              <h5 className="text-center text-muted mb-3">
                No comments added yet
              </h5>
            )}

            {user && (
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
            )}
          </div>
        </Collapse>
      </Row>
    </>
  );
}

export default Comments;
