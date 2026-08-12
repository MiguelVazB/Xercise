import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound">
      <div className="fourOfour">404</div>
      <div>This page is not available.</div>
      <Link to="/" className="goBack">
        Return home
      </Link>
    </div>
  );
}

export default NotFound;
