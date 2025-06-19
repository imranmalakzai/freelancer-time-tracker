import { Routes,Route } from "react-router-dom"
import Home from "../Home"
import Navbar from "./components/Navbar"
import ProjectsPage from "./pages/Projects"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtextedRoute from "./secure/ProtextedRoute"
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App