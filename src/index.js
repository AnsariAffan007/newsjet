import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
