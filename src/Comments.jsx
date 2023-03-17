import { useState, useEffect } from "react";
import { AddComment } from "./AddComment";
import { deleteComment, getComments } from "./api";
import { useContext } from "react";
import { UserContext } from "./contexts/user";

export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id, currentPage)
      .then((commentsResponse) => {
        if (!commentsResponse.length) {
          setcurrentPage(1);
          setIsLoading(false);
        } else {
          setComments(commentsResponse);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsInvalid(true);
        setError(error.response);
      });
  }, [article_id, currentPage]);

  const fetchPreviousComments = () => {
    setcurrentPage(currentPage - 1);
  };
  const fetchNextComments = () => {
    setcurrentPage(currentPage + 1);
  };

  const removeComment = (commentToDelete) => {
    setComments((currentComments) => {
      return currentComments.filter(
        (comment) => comment.comment_id !== commentToDelete.comment_id
      );
    });

    deleteComment(commentToDelete.comment_id).catch((err) => {
      setComments((currentComments) => {
        console.log(err, "error");

        setDeleteError(error.message);
        return [commentToDelete, ...currentComments];
      });
    });
  };

  if (isLoading) {
    return <h3>Loading comments...</h3>;
  } else if (isInvalid) {
    return <h2>{`Error:${error.status} ${error.data.msg}`}</h2>;
  } else {
    return (
      <>
        <h3>Comments</h3>
        <AddComment article_id={article_id} setComments={setComments} />
        <ul className="comments-page">
          {comments.map((comment) => {
            return (
              <li className="comment" key={comment.comment_id}>
                <p>Comment: {comment.body}</p>
                <p>User: {comment.author}</p>
                <p>Posted: {new Date(comment.created_at).toDateString()}</p>
                <p>Votes: {comment.votes}</p>
                {deleteError ? (
                  <p>something went wrong {deleteError}</p>
                ) : (
                  <p></p>
                )}
                {user.username === comment.author ? (
                  <button onClick={() => removeComment(comment)}>
                    Delete comment
                  </button>
                ) : (
                  <p></p>
                )}
                {deleteError ? (
                  <p>something went wrong {deleteError}</p>
                ) : (
                  <p></p>
                )}
              </li>
            );
          })}
          <button onClick={fetchPreviousComments}>Previous Page</button>
          <button onClick={fetchNextComments}>Next Page</button>
        </ul>
      </>
    );
  }
};
