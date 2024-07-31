import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App";

// Styles
import "./index.css";
import './assets/plugins/css/fonts.css'; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App className="font-2" />
        </BrowserRouter>
    </React.StrictMode>
);
