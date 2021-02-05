import React from "react";
import ReactDOM from "react-dom";
import Rollbar from "rollbar";
import App from "./App";
import Theme from "./constants/theme";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "./contexts/AppContext";

// eslint-disable-next-line
const rollbar = new Rollbar({
  accessToken: "7418a61c1f5745e6b44bf02ca30f1124",
  enabled: process.env.NODE_ENV === "production",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
