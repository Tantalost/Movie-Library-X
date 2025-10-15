import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/tmdb";

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [indie, setIndie] = useState([]);
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "MLX - Home";
    }, []);

    useEffect(() => {
        async function load() {
            try {
                const featuredData = await searchMovies({ sort: "popularity", order: "desc" });
                setFeatured(featuredData.results?.slice(0, 10) || []);

                const indieData = await searchMovies({ genres: [18], sort: "rating", order: "desc"});
                setIndie(indieData.results?.slice(0, 10) || []);

                const animeData = await searchMovies({ genres: [16], sort: "rating", order: "desc" });
                setAnime(animeData.results?.slice(0, 10) || []);
            } catch (e) {
                console.error("Failed to fetch movies", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <p className="text-white p-6">Loading movies...</p>;

    return (
        <div className="min-h-screen bg-teal-900">
            <section className="mb-8">
                <div className="relative bg-gradient-to-r from-teal-800 to-teal-700 rounded-xl h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="relative z-10 flex items-center h-full px-8">
                        <div className="max-w-md">
                            <img
                                src="src/image/cover.png"
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                            />
                            <h1 className="relative z-10 text-white text-3xl font-bold text-center px-4">
                                Watch New Trending Movies in 2025
                            </h1>
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="px-6 space-y-8">
                <MovieSection title="Featured Movies" movies={featured} />
                <MovieSection title="Indie Movies" movies={indie} />
                <MovieSection title="Animation Movies" movies={anime} />
            </main>
        </div>
    );
};

const MovieSection = ({ title, movies }) => (
    <section>
        <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
            {movies.map((m) => (
                <MovieCard
                    key={m.id}
                    id={m.id}
                    title={m.title}
                    rating={m.vote_average?.toFixed(1) || "N/A"}
                    poster={
                        m.poster_path
                            ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                />
            ))}
        </div>
    </section>
);

const MovieCard = ({ id, title, rating, poster }) => (
    <Link to={`/movies/${id}`} className="flex-shrink-0">
        <div className="w-40 h-60 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group relative">
            <img
                src={poster}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-400/30 via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded px-2 py-1 text-xs text-white flex items-center space-x-1">
                ⭐ <span>{rating}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-2 py-1">
                <h3 className="text-white text-sm truncate">{title}</h3>
            </div>
        </div>
    </Link>
);

export default Home;
