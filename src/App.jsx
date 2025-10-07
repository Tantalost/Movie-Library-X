import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MoviesList from "./pages/movies/MoviesList";
import MovieDetails from "./pages/movies/MovieDetails";
import MovieReviews from "./pages/movies/MovieReviews";

import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<MoviesList defaultSort="rating" />} />
        <Route path="/movies/:id" element={<MovieDetails />}>
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="/about" element={<About author="Group 3" />} />
      </Routes>
    </Router>
  );
}

export default App;
