"use client";
import { Bell, CheckCheck } from "lucide-react";
import NavBar from "../components/NavBar";

const MOCK_NOTIFICATIONS = [
    { id: 1, message: "New release: Gladiator II is now available", time: "2 hours ago", read: false },
    { id: 2, message: "Trending this week: Dune Part Two is back in the charts", time: "5 hours ago", read: false },
    { id: 3, message: "Your watchlist item 'Alien: Romulus' is now available in HD", time: "Yesterday", read: true },
    { id: 4, message: "New releases added to Action & Adventure", time: "2 days ago", read: true },
    { id: 5, message: "Weekly trending list has been updated", time: "3 days ago", read: true },
];

export default function NotificationsPage() {
    return (
        <>
            <NavBar />
            <div className="notifications-page">
                <div className="page-header">
                    <Bell size={24} />
                    <h1>Notifications</h1>
                    <button className="mark-all-read"><CheckCheck size={16} /> Mark all read</button>
                </div>

                <div className="notifications-list">
                    {MOCK_NOTIFICATIONS.map(notif => (
                        <div key={notif.id} className={`notif-item ${notif.read ? "read" : "unread"}`}>
                            <div className="notif-icon">
                                <Bell size={18} />
                            </div>
                            <div className="notif-body">
                                <p>{notif.message}</p>
                                <span>{notif.time}</span>
                            </div>
                            {!notif.read && <div className="unread-dot" />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
