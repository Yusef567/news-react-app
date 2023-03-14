import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./Articles";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { Home } from "./Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/*" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
