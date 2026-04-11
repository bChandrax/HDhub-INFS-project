import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Download, Folder, List, X } from "lucide-react";
import SearchBar from "./SearchBar";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src="/HD.png" alt="HD-Hub Logo" />
                    </Link>
                </div>

                <SearchBar />

                <div className="actions">
                    <Link to="/watchlist">
                        <button title="Watchlist"><Folder /></button>
                    </Link>
                    <Link to="/notifications">
                        <button title="Notifications"><Bell /></button>
                    </Link>
                    <Link to="/downloads">
                        <button title="Downloads"><Download /></button>
                    </Link>
                    <Link to="/profile">
                        <button id="profile">KM</button>
                    </Link>
                    <button className="list-button" onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? <X /> : <List />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="mobile-menu">
                    <SearchBar />
                    <Link to="/watchlist" onClick={() => setMenuOpen(false)}>
                        <button><Folder /> Watchlist</button>
                    </Link>
                    <Link to="/notifications" onClick={() => setMenuOpen(false)}>
                        <button><Bell /> Notifications</button>
                    </Link>
                    <Link to="/downloads" onClick={() => setMenuOpen(false)}>
                        <button><Download /> Downloads</button>
                    </Link>
                    <Link class="profile-wrapper" to="/profile" onClick={() => setMenuOpen(false)}>
                        <button id="profile">KM</button><p>Profile</p>
                    </Link>
                </div>
            )}
        </>
    );
}