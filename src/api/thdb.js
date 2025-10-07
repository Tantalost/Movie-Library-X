const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

async function fetchFromTMDb(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set("api_key", API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
    });

    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`TMDb error: ${res.status}`);
    }
    return res.json();
}

export async function searchMovies({ q, genres, sort, page = 1 }) {
    if (q) {
        return fetchFromTMDb("/search/movie", { query: q, page });
    }

    const sortMap = {
        rating: "vote_average.desc",
        year: "release_date.desc",
    };

    return fetchFromTMDb("/discover/movie", {
        sort_by: sortMap[sort] || "popularity.desc",
        with_genres: genres?.length ? genres.join(",") : undefined,
        page,
    });
}

export async function getMovie(id) {
    return fetchFromTMDb(`/movie/${id}`, { append_to_response: "credits" });
}

export async function getReviews(id) {
    return fetchFromTMDb(`/movie/${id}/reviews`);
}

export async function getPeople(page = 1) {
    return fetchFromTMDb("/person/popular", { page });
}