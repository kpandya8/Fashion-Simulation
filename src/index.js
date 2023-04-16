import { createRoot } from "react-dom/client"
import "./styles.css"
import App from "./App"
import Example from "./Homepage"

createRoot(document.getElementById("root")).render(<App />)
createRoot(document.getElementById("rooted")).render(<Example />)
