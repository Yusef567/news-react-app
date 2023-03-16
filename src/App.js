import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./Articles";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { UsersList } from "./UsersList";
import { UserContext } from "./contexts/user";
import { useContext } from "react";
import { TopicsList } from "./TopicsList";

function App() {
  const userValue = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/topics" element={<TopicsList />} />
      </Routes>
    </div>
  );
}

export default App;
