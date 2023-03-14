import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "./api";
import { Comments } from "./Comments";
export const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <h2>Loading Articles Please Wait...</h2>;
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
              <p>Release Date: {article.created_at}</p>
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
