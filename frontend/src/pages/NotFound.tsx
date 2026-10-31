import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import "../styles/notFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <Seo
        title="Page not found"
        description="The page you’re looking for could not be found."
        image="/og-share-image.jpg"
        path={window.location.pathname}
      />
      <div className="not-found-card">
        <p className="not-found-code">404</p>
        <h1>That page isn’t on the menu.</h1>
        <p>Let’s get you back to something delicious.</p>
        <Link className="not-found-link" to="/menu">
          Browse the menu
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
