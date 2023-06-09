import { Route, Routes } from "react-router-dom";
import { ArticlesList } from "./ArticlesList";
import { SingleArticle } from "./SingleArticle";

export const Articles = () => {
  return (
    <section className="articles">
      <Routes>
        <Route path="/*" element={<h1>article not found</h1>} />
        <Route path="/" element={<ArticlesList />} />
        <Route path="/:article_id" element={<SingleArticle />} />
      </Routes>
    </section>
  );
};
