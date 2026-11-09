import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../index.css"
import App from "../App.jsx"

// This is the top-level rendering of your React
// components into the HTML page section tag
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
)
