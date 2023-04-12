import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./components/Articles";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { UsersList } from "./components/UsersList";
import { UserContext } from "./contexts/user";
import { useContext } from "react";
import { TopicsList } from "./components/TopicsList";
import { PageNotFound } from "./components/PageNotFound";

function App() {
  useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
