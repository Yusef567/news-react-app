import { Route, Routes } from "react-router-dom";
import { ArticlesList } from "./ArticlesList";

export const Articles = () => {
  return (
    <section className="articles">
      <Routes>
        <Route path="/" element={<ArticlesList />} />
      </Routes>
    </section>
  );
};
