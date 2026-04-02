"use client";

// components/Sidebar/Sidebar.jsx
// Left navigation panel – mirrors the real Spotify sidebar layout.
// Contains: logo, Home/Search nav, Your Library with filter pills and playlist list.

import { useState } from "react";
import {
  Home,
  Search,
  Library,
  Plus,
  ChevronRight,
  Music2,
} from "lucide-react";
import { playlists } from "../../data/mockData";

// ─── NavButton ────────────────────────────────────────────────────────────────
// Reusable navigation button used for Home and Search.
function NavButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`nav-btn${isActive ? " active" : ""}`}>
      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
      <span>{label}</span>

      <style jsx>{`
        .nav-btn {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 10px 14px;
          border-radius: 6px;
          color: #b3b3b3;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          background: transparent;
        }
        .nav-btn:hover {
          color: #ffffff;
        }
        .nav-btn.active {
          color: #ffffff;
        }
      `}</style>
    </button>
  );
}

// ─── PlaylistItem ─────────────────────────────────────────────────────────────
// Reusable row component for a single playlist in the library list.
function PlaylistItem({ playlist, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pl-item${isActive ? " active" : ""}`}
      aria-label={`Open ${playlist.name}`}
    >
      <span
        className="pl-art"
        style={{
          background: `linear-gradient(135deg, ${playlist.color} 0%, ${playlist.color}88 100%)`,
        }}
      >
        <Music2 size={13} color="rgba(255,255,255,0.9)" />
      </span>

      <span className="pl-info">
        <span className="pl-name">{playlist.name}</span>
        <span className="pl-meta">Playlist&nbsp;·&nbsp;{playlist.count} songs</span>
      </span>

      <style jsx>{`
        .pl-item {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
          padding: 7px 10px;
          border-radius: 6px;
          cursor: pointer;
          background: transparent;
          transition: background 0.15s;
        }
        .pl-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .pl-item.active {
          background: rgba(255, 255, 255, 0.12);
        }
        .pl-art {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pl-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          overflow: hidden;
          min-width: 0;
        }
        .pl-name {
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
        .pl-meta {
          color: #a7a7a7;
          font-size: 0.75rem;
          white-space: nowrap;
          display: block;
        }
      `}</style>
    </button>
  );
}

// ─── FilterPill ───────────────────────────────────────────────────────────────
// Reusable pill button for the library filter row.
function FilterPill({ label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`pill${isActive ? " active" : ""}`}>
      {label}

      <style jsx>{`
        .pill {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          padding: 5px 14px;
          border-radius: 20px;
          background: #2a2a2a;
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .pill:hover {
          background: #3a3a3a;
        }
        .pill.active {
          background: #ffffff;
          color: #000000;
        }
      `}</style>
    </button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export default function Sidebar({ activePage, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("Playlists");
  const [activePlaylist, setActivePlaylist] = useState(null);

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo-row">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="logo-text">Spotify</span>
      </div>

      {/* Home + Search */}
      <nav className="nav-block">
        <NavButton icon={Home} label="Home" isActive={activePage === "home"} onClick={() => onNavigate("home")} />
        <NavButton icon={Search} label="Search" isActive={activePage === "search"} onClick={() => onNavigate("search")} />
      </nav>

      {/* Your Library */}
      <div className="library-block">
        <div className="lib-header">
          <button className="lib-title-btn">
            <Library size={20} color="#a7a7a7" />
            <span>Your Library</span>
          </button>
          <div className="lib-icons">
            <button className="icon-btn" aria-label="Create playlist"><Plus size={18} /></button>
            <button className="icon-btn" aria-label="Expand"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="filter-row">
          {["Playlists", "Albums", "Artists"].map((f) => (
            <FilterPill key={f} label={f} isActive={activeFilter === f} onClick={() => setActiveFilter(f)} />
          ))}
        </div>

        <div className="pl-list" role="list">
          {playlists.map((pl) => (
            <PlaylistItem
              key={pl.id}
              playlist={pl}
              isActive={activePlaylist === pl.id}
              onClick={() => setActivePlaylist(pl.id)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          min-width: 280px;
          background: #000000;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          overflow: hidden;
        }
        .logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 10px 6px;
        }
        .logo-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.4px;
        }
        .nav-block {
          background: #121212;
          border-radius: 8px;
          padding: 8px 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .library-block {
          background: #121212;
          border-radius: 8px;
          padding: 8px 6px;
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-height: 0;
        }
        .lib-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px 2px;
        }
        .lib-title-btn {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #a7a7a7;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.15s;
        }
        .lib-title-btn:hover { color: #ffffff; }
        .lib-icons {
          display: flex;
          gap: 2px;
        }
        .icon-btn {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: #a7a7a7;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .icon-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .filter-row {
          display: flex;
          gap: 6px;
          padding: 2px 4px 4px;
          flex-wrap: wrap;
        }
        .pl-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: 2px 0;
          min-height: 0;
        }
        .pl-list::-webkit-scrollbar { width: 3px; }
        .pl-list::-webkit-scrollbar-track { background: transparent; }
        .pl-list::-webkit-scrollbar-thumb { background: #444444; border-radius: 2px; }
        @media (max-width: 768px) {
          .sidebar { width: 76px; min-width: 76px; }
          .logo-text, .lib-title-btn span, .filter-row, .pl-info, .lib-icons { display: none; }
          .logo-row, .lib-header { justify-content: center; }
          .pl-list { align-items: center; }
        }
      `}</style>
    </aside>
  );
}
