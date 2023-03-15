import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navigate">
      <nav className="navbar">
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/articles">
          <button className="nav-button">Articles</button>
        </Link>
        <Link to="/users">
          <button className="nav-button">Log in</button>
        </Link>
      </nav>
    </div>
  );
};
