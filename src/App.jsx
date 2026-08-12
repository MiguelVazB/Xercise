import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import "./App.css";

const ExerciseDetailsPage = lazy(() => import("./pages/ExerciseDetailsPage"));
const MusclesPage = lazy(() => import("./pages/MusclesPage"));
const SavedExercisesPage = lazy(() => import("./pages/SavedExercisesPage"));

function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="appShell">
        <NavBar />
        <Suspense
          fallback={
            <div className="loadingContainer" role="status" aria-live="polite">
              <div className="loading"></div>
              <span className="visually-hidden">Loading page content</span>
            </div>
          }
        >
          <div className="pageShell">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exercises/:id" element={<ExerciseDetailsPage />} />
              <Route path="/muscles" element={<MusclesPage />} />
              <Route path="/saved" element={<SavedExercisesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
