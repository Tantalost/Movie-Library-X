import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../api/tmdb";

const MovieReviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await getReviews(id);
                setReviews(data.results || []);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        }
        loadReviews();
    }, [id]);

    if (loading) return <p className="text-gray-300">Loading reviews...</p>;

    if (reviews.length === 0)
        return <p className="text-gray-400">No reviews yet.</p>;

    return (
        <div className="space-y-6 mt-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-teal-300">{review.author}</h3>
                    <p className="text-gray-200 mt-2">{review.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieReviews;
