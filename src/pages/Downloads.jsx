"use client";
import { Download, Trash2, Play } from "lucide-react";
import NavBar from "../components/NavBar";

const MOCK_DOWNLOADS = [
    { id: 1, title: "Top Gun Maverick", size: "2.1 GB", quality: "1080p", status: "complete" },
    { id: 2, title: "The Batman", size: "1.8 GB", quality: "1080p", status: "complete" },
    { id: 3, title: "SSpider-Man: No Way Home", size: "3.4 GB", quality: "4K", status: "downloading", progress: 64 },
];

export default function DownloadsPage() {
    return (
        <>
            <NavBar />
            <div className="downloads-page">
                <div className="page-header">
                    <Download size={24} />
                    <h1>Downloads</h1>
                </div>

                {MOCK_DOWNLOADS.length === 0 ? (
                    <div className="empty-state">
                        <Download size={48} />
                        <p>No downloads yet.</p>
                    </div>
                ) : (
                    <div className="downloads-list">
                        {MOCK_DOWNLOADS.map(item => (
                            <div key={item.id} className="download-item">
                                <div className="download-thumb">🎬</div>
                                <div className="download-info">
                                    <h2>{item.title}</h2>
                                    <div className="download-meta">
                                        <span>{item.quality}</span>
                                        <span>{item.size}</span>
                                        {item.status === "downloading" && (
                                            <span className="downloading-label">Downloading...</span>
                                        )}
                                    </div>
                                    {item.status === "downloading" && (
                                        <div className="download-progress-track">
                                            <div
                                                className="download-progress-fill"
                                                style={{ width: `${item.progress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="download-actions">
                                    {item.status === "complete" && (
                                        <button className="btn-watch"><Play size={16} /> Play</button>
                                    )}
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
