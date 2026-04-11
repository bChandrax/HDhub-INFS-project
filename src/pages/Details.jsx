import { useEffect, useState } from "react";
// 1. Updated import for React Router
import { useSearchParams, Link } from "react-router-dom"; 
import { Play, Bookmark, ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import NavBar from "../components/NavBar";
import { fetchMovieDetails, IMG_ORIGINAL, IMG_BASE } from "../services/api";

export default function DetailsPage() {
    // 2. React Router's useSearchParams returns an array
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        async function load() {
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie:", error);
            } finally {
                setLoading(false); // This will now actually get called!
            }
        }
        load();
    }, [id]);

    if (loading) return (
        <>
            <NavBar />
            <div className="details-loading">Loading...</div>
        </>
    );

    if (!movie) return (
        <>
            <NavBar />
            <div className="details-loading">Movie not found.</div>
        </>
    );

    const trailer = movie.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
    const cast = movie.credits?.cast?.slice(0, 6) ?? [];
    const genres = movie.genres ?? [];
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;

    return (
        <>
            <NavBar />
            <div className="details-page">
                <div className="details-backdrop">
                    <img
                        src={`${IMG_ORIGINAL}${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div className="details-backdrop-overlay" />
                </div>

                <div className="details-content">
                    {/* 3. Changed 'href' to 'to' */}
                    <Link to="/" className="back-btn">
                        <ArrowLeft size={18} /> Back
                    </Link>

                    <div className="details-main">
                        <div className="details-poster">
                            {movie.poster_path
                                ? <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
                                : <div className="no-poster-lg">🎬</div>
                            }
                        </div>

                        <div className="details-info">
                            <h1>{movie.title}</h1>
                            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

                            <div className="details-meta">
                                {movie.vote_average && (
                                    <span className="detail-badge">
                                        <Star size={14} /> {movie.vote_average.toFixed(1)}
                                    </span>
                                )}
                                {runtime && (
                                    <span className="detail-badge">
                                        <Clock size={14} /> {runtime}
                                    </span>
                                )}
                                {movie.release_date && (
                                    <span className="detail-badge">
                                        <Calendar size={14} /> {movie.release_date.split('-')[0]}
                                    </span>
                                )}
                            </div>

                            <div className="details-genres">
                                {genres.map(g => <span key={g.id} className="genre-tag">{g.name}</span>)}
                            </div>

                            <p className="details-overview">{movie.overview}</p>

                            <div className="details-actions">
                                {trailer
                                    ? <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">
                                        <button className="btn-watch"><Play size={16} /> Watch Trailer</button>
                                      </a>
                                    : <button className="btn-watch"><Play size={16} /> Watch Now</button>
                                }
                                <button className="btn-watchlist"><Bookmark size={16} /> Add to Watchlist</button>
                            </div>

                            {cast.length > 0 && (
                                <div className="details-cast">
                                    <h3>Cast</h3>
                                    <div className="cast-list">
                                        {cast.map(actor => (
                                            <div key={actor.id} className="cast-card">
                                                {actor.profile_path
                                                    ? <img src={`${IMG_BASE}${actor.profile_path}`} alt={actor.name} />
                                                    : <div className="cast-placeholder">👤</div>
                                                }
                                                <span>{actor.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}