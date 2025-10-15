import React, { useEffect, useState } from "react";
import { useParams  , Link } from "react-router-dom";
import { getMovie, getRecommendations } from "../api/tmdb";
import { Outlet } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovie(id);
        setMovie(data);

        const recData = await getRecommendations(id);
        setRecommendations(recData.results.slice(0, 4));
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  useEffect(() => {
    if (movie?.title) {
      document.title = `Movie - ${movie.title}`;
    }
  }, [movie]);

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-teal-900 flex items-center justify-center">
        <p className="text-white text-xl">Movie not found.</p>
      </div>
    );
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hrs ${mins} mins`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 10 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-teal-900 text-white">
      <section className="relative h-[500px] sm:h-[600px] rounded-2xl mx-4 sm:mx-6 mt-6 overflow-hidden shadow-2xl">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            <span>{new Date(movie.release_date).toLocaleDateString()}</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {movie.genres?.map((g) => (
              <span key={g.id} className="bg-teal-800 px-3 py-1 rounded-full text-xs">
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 pb-12">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movie.credits?.cast?.slice(0, 12).map((actor) => (
            <div key={actor.id} className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <h3 className="text-white text-sm font-medium truncate">{actor.name}</h3>
                <p className="text-gray-400 text-xs truncate">as {actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
        <p className="text-gray-200">{movie.overview}</p>
      </section>

      <section className="px-6 sm:px-8 pb-12">
        <h2 className="text-2xl font-bold mb-4">Ratings</h2>
        <div className="flex items-center gap-4">
          <div className="text-5xl font-black">{movie.vote_average.toFixed(1)}</div>
          <div className="flex">{renderStars(movie.vote_average)}</div>
        </div>
        <Link
          to={`/movies/${movie.id}/reviews`}
          className="mt-4 inline-block text-teal-300 hover:text-teal-200"
        >
          View Reviews →
        </Link>
        <Outlet />
      </section>

      <section className="px-6 sm:px-8 pb-12">
        <h2 className="text-2xl font-bold mb-4">More Like This</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <Link key={rec.id} to={`/movies/${rec.id}`} className="group">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w500${rec.poster_path}`
                      : "https://via.placeholder.com/500x300?text=No+Image"
                  }
                  alt={rec.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-white text-sm font-medium truncate">{rec.title}</h3>
                  <p className="text-gray-400 text-xs">⭐ {rec.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
