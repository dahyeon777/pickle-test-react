import "./App.css";
import Header from "./components/Header";
import FirstPage from "./pages/FirstPage";
import { Route, Routes } from "react-router-dom";
import TestStartContainer from "./pages/TestStartPage/TestStartContainer";
import TestResultContainer from "./pages/TestResultPage/TestResultContainer";
import TestReadyPage from "./pages/TestReadyPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/test_ready/:testId" element={<TestReadyPage />} />
        <Route
          path="/test_start/:testStartId"
          element={<TestStartContainer />}
        />
        <Route
          path="/result/:testStartId/:finalResult"
          element={<TestResultContainer />}
        />
      </Routes>
    </div>
  );
}

export default App;
