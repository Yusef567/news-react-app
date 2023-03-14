import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, patchArticle } from "./api";
import { Comments } from "./Comments";
export const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  const upVote = () => {
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes + 1 };
    });
    const updatedVotes = {
      inc_votes: 1,
    };
    patchArticle(article_id, updatedVotes).catch((error) => {
      setError(error.response);
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes - 1 };
      });
    });
  };

  const downVote = () => {
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes - 1 };
    });
    const updatedVotes = {
      inc_votes: -1,
    };
    patchArticle(article_id, updatedVotes).catch((error) => {
      setError(error.response);
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes + 1 };
      });
    });
  };
  if (isLoading) {
    return <h2>Loading Article Please Wait...</h2>;
  } else {
    return (
      <main>
        <section>
          <h2>{article.title}</h2>
          <img
            className="single-article-image"
            src={article.article_img_url}
            alt={article.title}
          />
          <ul className="single-article-page">
            <li className="single-article" key={article.article_id}>
              <p>Author: {article.author}</p>
              <p>Topic: {article.topic}</p>
              <p>{article.body}</p>
              <button>Votes: {article.votes}</button>
              <p>Release Date: {article.created_at}</p>

              <button onClick={downVote}>
                <span aria-label="down vote article">down vote: 👎</span>
              </button>
              <button onClick={upVote}>
                <span aria-label="up vote article">up vote: 👍</span>
              </button>
              {error ? (
                <h3>{`Error:${error.status} ${error.data.msg}`}</h3>
              ) : (
                <p></p>
              )}
            </li>
          </ul>
        </section>
        <section>
          <Comments article_id={article_id} />
        </section>
      </main>
    );
  }
};
