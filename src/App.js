import "./App.css";
import Header from "./components/Header";
import FirstPageContainer from "./pages/FirstPage/FirstPageContainer";
import TestReadyPageContainer from "./pages/TestReadyPage/TestReadyPageContainer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<FirstPageContainer />} />
        <Route path="/test/:testId" element={<TestReadyPageContainer />} />
      </Routes>
    </div>
  );
}

export default App;
