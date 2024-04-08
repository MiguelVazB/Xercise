import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NotFound from "./components/NotFound";
const ExerciseDetailsPage = lazy(() => import("./pages/ExerciseDetailsPage"));
const MusclesPage = lazy(() => import("./pages/MusclesPage"));

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Suspense
        fallback={
          <div className="loadingContainer">
            <div className="loading"></div>
          </div>
        }
      >
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="exercises" element={<ExerciseDetailsPage />}>
              <Route path=":id" element={<ExerciseDetailsPage />} />
            </Route>
            <Route path="muscles" element={<MusclesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
