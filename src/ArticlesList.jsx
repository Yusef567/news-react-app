import { useState, useEffect } from "react";
import { getAllArticles } from "./api";
import { Link, useSearchParams } from "react-router-dom";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);

  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const topicFilter = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order");

  const setOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSort = (column) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", column);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllArticles(currentPage, {
      topic: topicFilter,
      sort_by: sortByQuery,
      order: orderByQuery,
    })
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
  }, [currentPage, sortByQuery, orderByQuery, topicFilter]);

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
      <label>Sort by: </label>
      <select
        value={selectedSortBy}
        onChange={(event) => {
          setSelectedSortBy(event.target.value);
          setSort(event.target.value);
        }}
      >
        <option value="" disabled>
          Select a sort by
        </option>
        <option value="created_at">Release Date</option>
        <option value="comment_count">Comment count</option>
        <option value="votes">Votes</option>
      </select>

      <label>Order by: </label>
      <select
        value={selectedOrderBy}
        onChange={(event) => {
          setSelectedOrderBy(event.target.value);
          setOrder(event.target.value);
        }}
      >
        <option value="" disabled>
          Select a order by
        </option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
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
              <p>Comments: {article.comment_count}</p>
              <p>Votes: {article.votes}</p>
              <Link to={`/articles/${article.article_id}`}>View Article</Link>
            </li>
          );
        })}
      </ul>
      <button onClick={fetchPreviousPage}>Previous Page</button>
      <button onClick={fetchNextPage}>Next Page</button>
    </main>
  );
};
