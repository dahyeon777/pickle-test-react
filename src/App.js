import "./App.css";
import Header from "./components/Header";
import FirstPageContainer from "./pages/FirstPage/FirstPageContainer";
import TestReadyPageContainer from "./pages/TestReadyPage/TestReadyPageContainer";
import { Route, Routes } from "react-router-dom";
import TestStartContainer from "./pages/TestStartPage/TestStartContainer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<FirstPageContainer />} />
        <Route
          path="/test_ready/:testId"
          element={<TestReadyPageContainer />}
        />
        <Route
          path="/test_start/:testStartId"
          element={<TestStartContainer />}
        />
      </Routes>
    </div>
  );
}

export default App;
