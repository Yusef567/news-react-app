import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./Articles";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/articles/*" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
