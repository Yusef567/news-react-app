import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <main>
      <h1>Error 404: Page Not Found</h1>
      <h2>Unfortunately this page does not exist, return back to Home page</h2>
      <Link className="home-link" to={`/`}>
        Home
      </Link>
    </main>
  );
};
