import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
const ExerciseDetailsPage = lazy(() => import("./pages/ExerciseDetailsPage"));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="exercises" element={<ExerciseDetailsPage />}>
            <Route path=":id" element={<ExerciseDetailsPage />} />
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
