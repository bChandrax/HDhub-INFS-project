"use client";
import { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchTrending, fetchGenres, IMG_ORIGINAL } from "../services/api";

export default function Hero() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function load() {
            const genreMap = await fetchGenres();
            const results = await fetchTrending();
            setGenres(genreMap);
            setMovies(results.slice(0, 5));
        }
        load();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % movies.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [movies]);

    const movie = movies[index];
    if (!movie) return <div className="hero-loading" />;

    const movieGenres = (movie.genre_ids ?? []).slice(0, 4).map(id => genres[id]).filter(Boolean);
    const year = movie.release_date?.split('-')[0];

    return (
        <div className="hero">
            <div className="img-wrapper">
                <img
                    src={`${IMG_ORIGINAL}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="hero-text">
                    <h1>{movie.title}</h1>
                    <div className="ratings">
                        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span>HD</span>
                        {year && <span>{year}</span>}
                    </div>
                    <p>{movie.overview}</p>
                    <div className="tags">
                        {movieGenres.map(g => <span key={g}>{g}</span>)}
                    </div>
                    <div className="actions">
                        <Link to={`/watch?id=${movie.id}`}>
                            <button><Play size={16} /> Watch</button>
                        </Link>
                        <Link to={`/details?id=${movie.id}`}>
                            <button><Info size={16} />Info</button>
                        </Link>
                    </div>
                </div>
                <div className="hero-dots">
                    {movies.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === index ? "active" : ""}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
