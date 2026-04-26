"use client";
import { User, Mail, Edit3, Film, Bookmark, Download, LogOut } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function handleLogout() {
    logout();
    navigate("/login");
}

export default function ProfilePage() {
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase() || "?"}</div>
                    <div className="profile-info">
                        <h1>{user?.name}</h1>
                        <p className="profile-email"><Mail size={14} /> {user?.email}</p>
                        <p className="profile-plan">Premium Plan</p>
                    </div>
                    <button className="btn-edit"><Edit3 size={16} /> Edit Profile</button>
                </div>

                <div className="profile-stats">
                    <div className="stat-card">
                        <Film size={28} />
                        <span className="stat-number">142</span>
                        <span className="stat-label">Movies Watched</span>
                    </div>
                    <div className="stat-card">
                        <Bookmark size={28} />
                        <span className="stat-number">24</span>
                        <span className="stat-label">Watchlist</span>
                    </div>
                    <div className="stat-card">
                        <Download size={28} />
                        <span className="stat-number">8</span>
                        <span className="stat-label">Downloads</span>
                    </div>
                </div>

                <div className="profile-section">
                    <h2>Quick Links</h2>
                    <div className="profile-links">
                        <Link href="/watchlist"><button className="profile-link-btn"><Bookmark size={16} /> My Watchlist</button></Link>
                        <Link href="/downloads"><button className="profile-link-btn"><Download size={16} /> My Downloads</button></Link>
                        <Link href="/notifications"><button className="profile-link-btn"><Mail size={16} /> Notifications</button></Link>
                        <button className="profile-link-btn" onClick={handleLogout}>
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
