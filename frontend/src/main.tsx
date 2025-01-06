import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { Web3Provider } from "./wagmi.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme.ts";


//@ts-ignore
globalThis.Buffer = Buffer;

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Web3Provider>
  </React.StrictMode>
);
