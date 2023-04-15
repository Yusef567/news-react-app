import { useState, useEffect } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom";

export const Home = () => {
  const [sampleArticles, setSampleArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllArticles(1)
      .then((responseArticles) => {
        setIsLoading(true);
        setSampleArticles(responseArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <h2>Loading Home page please wait....</h2>
        <div className="loading"></div>
      </>
    );
  } else if (error) {
    return <h2>{`Error:${error.status} ${error.data.msg}`}</h2>;
  } else {
    return (
      <main>
        <h2 className="welcome">Welcome to NewsWave</h2>
        <p className="intro">
          NewsWave provides users with a platform to engage with the articles
          they view through posting or deleting comments and up or down voting
          articles they view.
        </p>
        <h3 className="top-articles">Browse latest articles below</h3>
        <ul className="articles-page">
          {sampleArticles.map((article) => {
            return (
              <li className="article" key={article.article_id}>
                <h3>Title: {article.title}</h3>
                <img
                  className="article-image"
                  src={article.article_img_url}
                  alt={article.title}
                />
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <Link
                  className="article-link"
                  to={`/articles/${article.article_id}`}
                >
                  View Article
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
};
