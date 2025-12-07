import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./pages/FirstPage/FirstPageContainer";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FirstPageContainer from "./pages/FirstPage/FirstPageContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <FirstPageContainer />
  </React.StrictMode>
);

reportWebVitals();
