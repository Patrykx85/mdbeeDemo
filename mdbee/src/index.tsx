import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MantineProvider, createTheme, useMantineTheme, Stepper, rem } from "@mantine/core";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
// import 'mantine-react-table/styles.css'; //import MRT styles
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({
  primaryColor: "red",
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ModalsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
