import { useState, useEffect } from "react";
import { getAllArticles } from "./api";
import { Link } from "react-router-dom";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllArticles(currentPage)
      .then((responseArticles) => {
        if (!responseArticles.length) {
          setcurrentPage(1);
          setIsLoading(false);
        } else {
          setArticles(responseArticles);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsInvalid(true);
        setError(error.response);
      });
  }, [currentPage]);

  const fetchPreviousPage = () => {
    setcurrentPage(currentPage - 1);
  };
  const fetchNextPage = () => {
    setcurrentPage(currentPage + 1);
  };

  return isInvalid ? (
    <h2>{`Error:${error.status} ${error.data.msg}`}</h2>
  ) : isLoading ? (
    <h2>Loading Articles Please Wait...</h2>
  ) : (
    <main>
      <h2>Articles</h2>
      <ul className="articles-page">
        {articles.map((article) => {
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
              <button
                onClick={() => {
                  <Link to={`:${article.article_id}`}></Link>;
                }}
              >
                View Article
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={fetchPreviousPage}>Previous Page</button>
      <button onClick={fetchNextPage}>Next Page</button>
    </main>
  );
};
