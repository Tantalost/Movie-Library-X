import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate, useLocation  } from "react-router-dom";
import { searchMovies, getGenres } from "../api/tmdb";

const MoviesList = ({ defaultSort = "rating" }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const q = searchParams.get("q") || "";
    const genreParam = searchParams.get("genre") || "";
    const sort = searchParams.get("sort") || defaultSort;
    const order = searchParams.get("order") || "desc";

    const genresSelected = genreParam.split(",").filter(Boolean);

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        async function loadMovies() {
            setLoading(true);
            setError("");
            try {
                const data = await searchMovies({
                    q,
                    genres: genresSelected,
                    sort,
                    order,
                });
                setMovies(data?.results || []);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("Failed to fetch movies.");
            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, [q, genresSelected.join(","), sort, order]);

    useEffect(() => {
        async function loadGenres() {
            try {
                const data = await getGenres();
                setGenres(data?.genres || []);
            } catch (err) {
                console.error("Error fetching genres:", err);
            }
        }
        loadGenres();
    }, []);

    function updateSearch(e) {
        if (e.key === "Enter") {
            const next = new URLSearchParams(searchParams.toString());
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            navigate({ search: next.toString() });
        }
    }

    function toggleSortOrder() {
        const next = new URLSearchParams(searchParams.toString());
        const currentOrder = next.get("order") || "desc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";
        next.set("order", newOrder);
        setSearchParams(next);
    }

    function toggleGenre(id) {
        const next = new URLSearchParams(searchParams.toString());
        const current = (next.get("genre") || "").split(",").filter(Boolean);
        const set = new Set(current);
        if (set.has(String(id))) set.delete(String(id));
        else set.add(String(id));
        if (set.size) next.set("genre", Array.from(set).join(","));
        else next.delete("genre");
        setSearchParams(next);
    }

    function updateSort(field) {
        const next = new URLSearchParams(searchParams.toString());
        next.set("sort", field);
        next.set("order", "desc");
        setSearchParams(next);
    }

    return (
        <div className="min-h-screen bg-teal-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Movie Library</h1>

            <div className="flex items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search movies..."
                    defaultValue={q}
                    onKeyDown={updateSearch}
                    className="flex-1 px-4 py-2 rounded bg-teal-800 border border-teal-600 focus:outline-none"
                />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {genres?.map((g) => (
                    <button
                        key={g.id}
                        onClick={() => toggleGenre(g.id)}
                        className={`px-3 py-1 rounded-full border ${genresSelected.includes(String(g.id))
                            ? "bg-teal-600 border-teal-400"
                            : "bg-teal-800 border-teal-600"
                            }`}
                    >
                        {g.name}
                    </button>
                ))}
            </div>

            <div className="flex gap-4 mb-6 flex-wrap items-center">
                <button
                    onClick={() => updateSort("rating")}
                    className={`px-4 py-2 rounded ${sort === "rating" ? "bg-teal-600" : "bg-teal-800"}`}
                >
                    Sort by Rating
                </button>
                <button
                    onClick={() => updateSort("year")}
                    className={`px-4 py-2 rounded ${sort === "year" ? "bg-teal-600" : "bg-teal-800"}`}
                >
                    Sort by Year
                </button>
                <button
                    onClick={toggleSortOrder}
                    className="px-4 py-2 rounded bg-teal-700 hover:bg-teal-600 transition"
                >
                    Order: {order === "asc" ? "Ascending ↑" : "Descending ↓"}
                </button>
            </div>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-400">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies?.map((m) => (
                        <Link
                            key={m.id}
                            to={`/movies/${m.id}${location.search}`}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                            <img
                                src={
                                    m.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                                        : "https://via.placeholder.com/300x450?text=No+Image"
                                }
                                alt={m.title}
                                className="w-full h-72 object-cover"
                                loading="lazy"
                            />
                            <div className="p-3">
                                <h3 className="text-white text-sm font-medium truncate">
                                    {m.title}
                                </h3>
                                <p className="text-gray-400 text-xs">
                                    ⭐ {m.vote_average?.toFixed(1) || "N/A"} •{" "}
                                    {m.release_date ? m.release_date.slice(0, 4) : "N/A"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {!loading && !error && movies?.length === 0 && (
                <p className="text-center text-gray-400">No movies found.</p>
            )}
        </div>
    );
};

export default MoviesList;
