import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1 className="logo">NewsWave</h1>
      {user.username ? (
        <>
          <h2 className="user-msg">Welcome back {user.username}!</h2>
          <img
            src={user.avatar_url}
            alt={user.username}
            className="logged-in-user"
          ></img>
        </>
      ) : (
        <h2>
          Welcome Guest login to browse, comment and like your favourite
          articles
        </h2>
      )}
      <Link to="/users">
        <button className="log-in-link">Log in</button>
      </Link>
    </header>
  );
};
