import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticle, patchArticle } from "../api";
import { Comments } from "./Comments";
export const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [article_id]);

  const upVote = () => {
    setUserVote(1);
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes + 1 };
    });

    const updatedVotes = {
      inc_votes: 1,
    };
    patchArticle(article_id, updatedVotes).catch((error) => {
      setUserVote(0);
      setError(error.response);
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes - 1 };
      });
    });
  };

  const downVote = () => {
    setUserVote(-1);

    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes - 1 };
    });

    const updatedVotes = {
      inc_votes: -1,
    };
    patchArticle(article_id, updatedVotes).catch((error) => {
      setUserVote(0);

      setError(error.response);
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes + 1 };
      });
    });
  };
  if (isLoading) {
    return (
      <>
        <h2>Loading Article please wait...</h2>
        <div className="loading"></div>
      </>
    );
  } else if (error) {
    return (
      <main>
        <h1>Error 404: Page Not Found</h1>
        <h2>
          Unfortunately this article does not exist, return back to Articles
          page
        </h2>
        <Link className="articles-return-link" to={`/`}>
          Articles
        </Link>
      </main>
    );
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
              <p>Votes: {article.votes}</p>
              <p>Release Date: {new Date(article.created_at).toDateString()}</p>

              <button
                className="vote-button"
                onClick={downVote}
                disabled={userVote !== 0}
              >
                <span aria-label="down vote article">Down Vote: 👎</span>
              </button>
              <button
                className="vote-button"
                onClick={upVote}
                disabled={userVote !== 0}
              >
                <span aria-label="up vote article">Up Vote: 👍</span>
              </button>
              {error ? (
                <h3>{`Error:${error.status} ${error.data.msg} vote unsuccessful`}</h3>
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
