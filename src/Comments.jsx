import { useState, useEffect } from "react";
import { AddComment } from "./AddComment";
import { getComments } from "./api";

export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);

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
                <p>Posted: {comment.created_at}</p>
                <p>Votes: {comment.votes}</p>
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
