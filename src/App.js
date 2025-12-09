import "./App.css";
import Header from "./components/Header";
import FirstPageContainer from "./pages/FirstPage/FirstPageContainer";
import TestReadyPageContainer from "./pages/TestReadyPage/TestReadyPageContainer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <FirstPageContainer></FirstPageContainer>
      {/* <TestReadyPageContainer></TestReadyPageContainer> */}
    </div>
  );
}

export default App;
