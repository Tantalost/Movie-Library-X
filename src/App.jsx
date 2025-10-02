import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Movies
import MoviesList from "./pages/movies/MoviesList";
import MovieDetails from "./pages/movies/MovieDetails";
import MovieReviews from "./pages/movies/MovieReviews";

// People
import PeopleList from "./pages/people/PeopleList";

// Static pages
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Movies routes */}
        <Route path="/movies" element={<MoviesList defaultSort="rating" />} />
        <Route path="/movies/:id" element={<MovieDetails />}>
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        {/* People route */}
        <Route path="/people" element={<PeopleList />} />

        {/* About route */}
        <Route path="/about" element={<About author="Group 3" />} />
      </Routes>
    </Router>
  );
}

export default App;
