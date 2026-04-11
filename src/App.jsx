import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import IntroOverlay from './components/Intro-overlay';
import Home from './pages/Home';
import DetailsPage from './pages/Details';
import DownloadsPage from './pages/Downloads';
import WatchlistPage from './pages/watchlist';
import NotificationsPage from './pages/notifications';
import ProfilePage from './pages/profile';
import SearchResultsPage from './pages/SearchResults';
import watch from './pages/watch'

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroOverlay onComplete={() => setIntroDone(true)} />}

      <div style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/watch" element={<watch />} />
        </Routes>
      </div>
    </>
  );
}

export default App;