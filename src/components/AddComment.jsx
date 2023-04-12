import { useState } from "react";
import { postComment } from "../api";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
export const AddComment = ({ article_id, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setNewComment("");
    postComment(article_id, newComment, user.username)
      .then((commentObj) => {
        setComments((currentComments) => {
          return [commentObj, ...currentComments];
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response);
        setIsLoading(false);
      });
  };
  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <label htmlFor="newComment">
        Add a comment:
        <textarea
          id="newComment"
          className="comment-box"
          placeholder="Type your comment here..."
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          required
        ></textarea>
        <button disabled={isLoading} className="post-button">
          {isLoading ? "Posting Comment..." : "Post Comment"}
        </button>
      </label>
      {error ? (
        <h3>{`Error:${error.status} ${error.data.msg} comment unsuccessful`}</h3>
      ) : null}
    </form>
  );
};
