// components/MainContent/MainContent.jsx
// MainContent – scrollable centre panel of the Spotify layout.
// Single responsibility: renders the home feed (greeting + content sections).
// Composes QuickAccess, SectionRow (reusable components) from shared UI.

"use client";

import { Bell, ChevronLeft, ChevronRight, User } from "lucide-react";
import QuickAccess from "../UI/QuickAccess";
import SectionRow from "../UI/SectionRow";
import { featuredPlaylists, topArtists, recentlyPlayed } from "../../data/mockData";

/**
 * TopBar – sticky header with back/forward navigation, greeting, and user avatar.
 * Single responsibility: page-level navigation controls.
 */
function TopBar({ greeting }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="nav-arrow" aria-label="Go back">
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>
        <button className="nav-arrow" aria-label="Go forward">
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="topbar-right">
        <button className="topbar-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="topbar-btn avatar-btn" aria-label="Account">
          <User size={16} />
        </button>
      </div>

      <style jsx>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: rgba(18,18,18,0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .topbar-left, .topbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-arrow {
          width: 32px;
          height: 32px;
          background: rgba(0,0,0,0.7);
          border: none;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        .nav-arrow:hover { background: rgba(255,255,255,0.15); }
        .topbar-btn {
          background: rgba(0,0,0,0.7);
          border: none;
          color: #b3b3b3;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .topbar-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
        .avatar-btn {
          background: #535353;
          color: #fff;
        }
        .avatar-btn:hover { background: #727272; }
      `}</style>
    </header>
  );
}

export default function MainContent({ onPlay }) {
  // Determine greeting based on simulated time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <main className="main-content" role="main">
      <TopBar greeting={greeting} />

      <div className="feed">
        {/* Greeting + Quick Access */}
        <section aria-labelledby="greeting-heading">
          <h1 id="greeting-heading" className="greeting">{greeting}</h1>
          <QuickAccess onPlay={onPlay} />
        </section>

        {/* Featured playlists */}
        <SectionRow
          title="Made for you"
          items={featuredPlaylists}
          onPlay={onPlay}
        />

        {/* Top artists */}
        <SectionRow
          title="Your top artists"
          items={topArtists}
          isArtist
          onPlay={onPlay}
        />

        {/* Recently played */}
        <SectionRow
          title="Recently played"
          items={recentlyPlayed}
          onPlay={onPlay}
        />
      </div>

      <style jsx>{`
        .main-content {
          flex: 1;
          background: #121212;
          overflow-y: auto;
          border-radius: 8px;
          /* Gradient header effect */
          background: linear-gradient(180deg, #1a3a2a 0%, #121212 340px);
        }
        .main-content::-webkit-scrollbar { width: 6px; }
        .main-content::-webkit-scrollbar-track { background: transparent; }
        .main-content::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }
        .feed {
          padding: 0 24px 120px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .greeting {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          margin: 0 0 20px;
          letter-spacing: -0.5px;
        }
        @media (max-width: 600px) {
          .feed { padding: 0 16px 120px; }
          .greeting { font-size: 1.5rem; }
        }
      `}</style>
    </main>
  );
}
