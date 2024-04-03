import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ExerciseDetailsPage from "./pages/ExerciseDetailsPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="exercises" element={<ExerciseDetailsPage />}>
          <Route path=":id" element={<ExerciseDetailsPage />} />
        </Route>
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
}

export default App;
