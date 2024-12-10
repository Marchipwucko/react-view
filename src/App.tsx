import React from "react";
import Exam from "./pages/Exam";
import ThemeSwitch from "./components/ThemeSwitch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ExamDTO } from "./interfaces/DTOs";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </Router>
  );
};

export default App;
