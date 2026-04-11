"use client";
import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        if (query.trim().length < 2) return;
        
        navigate(`/search?q=${query}`);
    }, [query, navigate]);

    return (
        <form className="search" onSubmit={handleSearch}>
            <input
                placeholder="Search movies, actors, directors..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit"><Search /></button>
        </form>
    );
}