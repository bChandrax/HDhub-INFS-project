import { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from './context/authContext';
import IntroOverlay from './components/Intro-overlay';
import Home from './pages/Home';
import DetailsPage from './pages/Details';
import DownloadsPage from './pages/Downloads';
import WatchlistPage from './pages/watchlist';
import NotificationsPage from './pages/notifications';
import ProfilePage from './pages/profile';
import SearchResultsPage from './pages/SearchResults';
import Watch from './pages/watch';
import LoginPage from './pages/Login';

/*
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
*/

function AppRoutes() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroOverlay onComplete={() => setIntroDone(true)} />}
      <div style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/details" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
          <Route path="/downloads" element={<ProtectedRoute><DownloadsPage /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchResultsPage /></ProtectedRoute>} />
          <Route path="/watch" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
