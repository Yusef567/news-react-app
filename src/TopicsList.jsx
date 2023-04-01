import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "./api";

export const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsResponse) => {
      setTopics(topicsResponse);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading topics...</h2>;
  } else {
    return (
      <main>
        <h2>Topics</h2>
        <ul className="topics-page">
          {topics.map((topic) => {
            return (
              <li className="topic" key={topic.slug}>
                <p>Topic: {topic.slug}</p>
                <p>Description: {topic.description}</p>
                <Link
                  className="article-link"
                  to={`/articles?topic=${topic.slug}`}
                >
                  View {topic.slug} articles
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
};
