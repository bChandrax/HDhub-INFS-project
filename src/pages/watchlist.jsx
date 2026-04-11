"use client";
import { Bookmark, Trash2 } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const MOCK_WATCHLIST = [
    { id: 1, title: "Dune: Part Two", year: "2024", rating: "8.5", genre: "Sci-Fi" },
    { id: 2, title: "Kingdom of the Planet of the Apes", year: "2024", rating: "7.2", genre: "Action" },
    { id: 3, title: "Alien: Romulus", year: "2024", rating: "7.4", genre: "Horror" },
];

export default function WatchlistPage() {
    return (
        <>
            <NavBar />
            <div className="watchlist-page">
                <div className="page-header">
                    <Bookmark size={24} />
                    <h1>My Watchlist</h1>
                </div>

                {MOCK_WATCHLIST.length === 0 ? (
                    <div className="empty-state">
                        <Bookmark size={48} />
                        <p>Your watchlist is empty.</p>
                        <Link href="/"><button className="btn-watch">Browse Movies</button></Link>
                    </div>
                ) : (
                    <div className="watchlist-list">
                        {MOCK_WATCHLIST.map(item => (
                            <div key={item.id} className="watchlist-item">
                                <div className="watchlist-thumb">🎬</div>
                                <div className="watchlist-info">
                                    <h2>{item.title}</h2>
                                    <div className="watchlist-meta">
                                        <span>⭐ {item.rating}</span>
                                        <span>{item.year}</span>
                                        <span className="genre-tag">{item.genre}</span>
                                    </div>
                                </div>
                                <div className="watchlist-actions">
                                    <Link href={`/pages/details?id=${item.id}`}>
                                        <button className="btn-watch">View</button>
                                    </Link>
                                    <button className="btn-remove"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
