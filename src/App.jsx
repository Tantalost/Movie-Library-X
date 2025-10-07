import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./pages/Layout";
import MoviesList from "./pages/MoviesList";
import About from "./pages/About";
import MovieReviews from "./pages/MovieReviews";
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<MoviesList />} />
        <Route path="about" element={<About />} />
        <Route path="movies/:id" element={<MovieDetails />}>
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;