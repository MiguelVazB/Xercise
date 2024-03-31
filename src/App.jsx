import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ExerciseDetails from "./pages/ExerciseDetails";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseDetails />} />
      </Routes>
    </>
  );
}

export default App;
