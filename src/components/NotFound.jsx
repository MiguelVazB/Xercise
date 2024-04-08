import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound">
      <div className="fourOfour">{`404 :(`}</div>
      <div>Nothing to see here!</div>
      <Link to="/" className="goBack">
        Click to Go Back
      </Link>
    </div>
  );
}

export default NotFound;
