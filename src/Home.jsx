import { useState, useEffect } from "react";
import { getAllArticles } from "./api";
import { Link } from "react-router-dom";

export const Home = () => {
  const [sampleArticles, setSampleArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllArticles(1).then((responseArticles) => {
      setIsLoading(true);
      setSampleArticles(responseArticles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading Home Page...</h2>;
  } else {
    return (
      <main>
        <h2>Welcome to NewsWave</h2>
        <p className="intro">
          Providing you with a dynamic and comprehensive range of News articles
          and topics. NewsWave provides you with a platform that allows you to
          engage with the articles you view through adding votes, posting
          comments.
        </p>
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
                <Link to={`/articles/${article.article_id}`}>View Article</Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
};
