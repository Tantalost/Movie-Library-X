import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";

export default function App() {
  return (
    <div>
      <nav style={{ marginBottom: "1rem" }}>
        <NavLink to="/" end style={{ marginRight: "1rem" }}>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home title="Welcome!" />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}