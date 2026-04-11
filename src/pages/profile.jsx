"use client";
import { User, Mail, Edit3, Film, Bookmark, Download } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    return (
        <>
            <NavBar />
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-avatar">KM</div>
                    <div className="profile-info">
                        <h1>K. Mitchell</h1>
                        <p className="profile-email"><Mail size={14} /> kmitchell@student.ac.bw</p>
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
                    </div>
                </div>
            </div>
        </>
    );
}
