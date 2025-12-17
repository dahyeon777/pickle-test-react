import "./App.css";
import Header from "./components/Header";
import FirstPage from "./pages/FirstPage";
import { Route, Routes } from "react-router-dom";
import TestStartPage from "./pages/TestStartPage";
import TestResultPage from "./pages/TestResultPage";
import TestReadyPage from "./pages/TestReadyPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/test_ready/:testId" element={<TestReadyPage />} />
        <Route path="/test_start/:testStartId" element={<TestStartPage />} />
        <Route
          path="/result/:testStartId/:finalResult"
          element={<TestResultPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
