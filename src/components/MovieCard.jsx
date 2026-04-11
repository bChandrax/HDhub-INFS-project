"use client";
import  {Link} from "react-router-dom";
import { IMG_BASE } from "../services/api";

export default function MovieCard({ movie, genres = {} }) {
    if (!movie) return null;

    const title = movie.title;
    const rating = movie.vote_average?.toFixed(1) ?? "N/A";
    const year = movie.release_date?.split('-')[0] ?? "";
    const poster = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
    const movieGenres = (movie.genre_ids ?? movie.genres?.map(g => g.id) ?? [])
        .slice(0, 2)
        .map(id => genres[id] ?? id)
        .filter(Boolean);
        
    return (
        <Link to={`/details?id=${movie.id}`} className="movie-card-link">
            <div className="card">
                <div className="thumbnail">
                    {poster
                        ? <img src={poster} alt={title} />
                        : <div className="no-poster">🎬</div>
                    }
                </div>

                <div className="card-body">
                    <h2>{title}</h2>
                    <div className="mov-data">
                        <span className="rating">⭐ {rating}</span>
                        <span>{year}</span>
                    </div>
                    <div className="tags">
                        {movieGenres.map(g => <span key={g}>{g}</span>)}
                    </div>
                </div>
            </div>
        </Link>
    );
}