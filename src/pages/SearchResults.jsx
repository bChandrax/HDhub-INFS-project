import { useEffect, useState } from "react";
// 1. Updated import: Switch from next/navigation to react-router-dom
import { useSearchParams } from "react-router-dom"; 
import { Search } from "lucide-react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import { searchMovies, fetchGenres } from "../services/api";

export default function SearchResultsPage() {
    // 2. React Router's useSearchParams returns [params, setParams]
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    
    const [results, setResults] = useState([]);
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only search if there is actually a query
        if (!query.trim()) return;

        async function load() {
            setLoading(true);
            try {
                const genreMap = await fetchGenres();
                setGenres(genreMap);
                const movies = await searchMovies(query);
                setResults(movies);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [query]); // This triggers every time the URL query changes

    return (
        <>
            <NavBar />
            <div className="search-results-page">
                <div className="search-results-header">
                    <Search size={22} />
                    <h1>Results for <span>"{query}"</span></h1>
                </div>

                {loading && <p className="results-status">Searching...</p>}

                {!loading && results.length === 0 && (
                    <div className="no-results">
                        <p>No movies found for "{query}"</p>
                        <p>Try a different search term.</p>
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <>
                        <p className="results-status">{results.length} results found</p>
                        <div className="results-grid">
                            {results.map(movie => (
                                <MovieCard key={movie.id} movie={movie} genres={genres} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}