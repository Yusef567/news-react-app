import { useContext } from "react";
import { UserContext } from "./contexts/user";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1>NewsWave</h1>
      <h2>Logged in as {user.username}</h2>
    </header>
  );
};
