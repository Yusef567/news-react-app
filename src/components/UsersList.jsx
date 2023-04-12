import { useState, useEffect, useContext } from "react";
import { getUsers } from "../api";
import { UserContext } from "../contexts/user";
export const UsersList = () => {
  const { setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((usersResponse) => {
        setUsers(usersResponse);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <h2>Loading Users please wait...</h2>
        <div className="loading"></div>
      </>
    );
  } else if (error) {
    return <h2>{`Error:${error.status} ${error.data.msg} jjh`}</h2>;
  } else {
    return (
      <main>
        <h2>Users</h2>
        <ul className="users-page">
          {users.map((user) => {
            return (
              <li className="user" key={user.username}>
                <img
                  className="user-image"
                  src={user.avatar_url}
                  alt={user.username}
                ></img>
                <p>username: {user.username}</p>
                <button
                  className="logIn-button"
                  onClick={() => {
                    setUser(user);
                  }}
                >
                  Log in as {user.username}
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
};
