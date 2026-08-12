import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary" role="alert">
          <h2>Something interrupted the experience</h2>
          <p>
            Refresh the page to try again. If the issue continues, the external
            API may be unavailable for a moment.
          </p>
          <button onClick={() => window.location.reload()} type="button">
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
