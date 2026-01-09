import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/NotFound";
const ExerciseDetailsPage = lazy(() => import("./pages/ExerciseDetailsPage"));
const MusclesPage = lazy(() => import("./pages/MusclesPage"));
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <NavBar />
      <Suspense
        fallback={
          <div className="loadingContainer">
            <div className="loading"></div>
          </div>
        }
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="exercises" element={<ExerciseDetailsPage />}>
            <Route path=":id" element={<ExerciseDetailsPage />} />
          </Route>
          <Route path="muscles" element={<MusclesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
