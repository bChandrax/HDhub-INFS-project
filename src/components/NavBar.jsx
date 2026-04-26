import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Download, Folder, List, X, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/authContext";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const initial = user?.name?.charAt(0).toUpperCase() || "?";

    function handleLogout() {
        logout();
        navigate("/login");
        setMenuOpen(false);
    }

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
                        <button id="profile" title="Profile">{initial}</button>
                    </Link>
                    <button title="Logout" onClick={handleLogout}><LogOut /></button>
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
                    <Link className="profile-wrapper" to="/profile" onClick={() => setMenuOpen(false)}>
                        <button id="profile">{initial}</button><p>Profile</p>
                    </Link>
                </div>
            )}
        </>
    );
}
