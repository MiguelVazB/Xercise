import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
const ExerciseDetailsPage = lazy(() => import("./pages/ExerciseDetailsPage"));

function App() {
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="exercises" element={<ExerciseDetailsPage />}>
            <Route path=":id" element={<ExerciseDetailsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
