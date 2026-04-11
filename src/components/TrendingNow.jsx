"use client";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { fetchTrending, fetchGenres, fetchByGenre } from "../services/api";
import MovieCard from "../components/MovieCard";

const GENRE_FILTERS = [
    { label: "All", id: null },
    { label: "Action", id: 28 },
    { label: "Adventure", id: 12 },
    { label: "Comedy", id: 35 },
    { label: "Drama", id: 18 },
];

export default function TrendingNow() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [active, setActive] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const genreMap = await fetchGenres();
            setGenres(genreMap);
            const results = await fetchTrending();
            setMovies(results);
            setLoading(false);
        }
        load();
    }, []);

    async function handleFilter(genreId) {
        setActive(genreId);
        setLoading(true);
        if (genreId === null) {
            const results = await fetchTrending();
            setMovies(results);
        } else {
            const results = await fetchByGenre(genreId);
            setMovies(results);
        }
        setLoading(false);
    }

    return (
        <div className="trending-now">
            <header>
                <h1><TrendingUp /> Trending Now</h1>
                <div className="categories">
                    {GENRE_FILTERS.map(f => (
                        <span
                            key={f.label}
                            className={active === f.id ? "active-genre" : ""}
                            onClick={() => handleFilter(f.id)}
                        >
                            {f.label}
                        </span>
                    ))}
                </div>
            </header>
            <div className="trending-now-cards">
                {loading
                    ? Array(6).fill(0).map((_, i) => <div key={i} className="card skeleton" />)
                    : movies.slice(0, 10).map(movie => (
                        <MovieCard key={movie.id} movie={movie} genres={genres} />
                    ))
                }
            </div>
        </div>
    );
}
