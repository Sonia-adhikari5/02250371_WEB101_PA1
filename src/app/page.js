// app/page.js
// Root page – assembles the full Spotify layout from its sub-components.
// Acts as the composition root: initialises the usePlayer hook and threads
// state/handlers down to Sidebar, MainContent, and NowPlaying.

"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../components/MainContent/MainContent";
import NowPlaying from "../components/NowPlaying/NowPlaying";
import { usePlayer } from "../hooks/usePlayer";

/**
 * Component Hierarchy
 * ───────────────────
 * Page (state owner / composition root)
 * ├── Sidebar
 * │   ├── NavButton (reusable)
 * │   └── PlaylistItem (reusable)
 * ├── MainContent
 * │   ├── TopBar
 * │   ├── QuickAccess
 * │   │   └── QuickTile (reusable)
 * │   └── SectionRow (reusable)
 * │       └── Card (reusable)
 * │           └── AlbumArt (reusable)
 * └── NowPlaying
 *     ├── ProgressBar (reusable)
 *     └── VolumeControl (reusable)
 */
export default function Page() {
  const [activePage, setActivePage] = useState("home");

  // All playback state is managed by the custom hook
  const player = usePlayer();

  return (
    <div className="app-shell">
      <div className="app-body">
        {/* Left navigation panel */}
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {/* Scrollable main content area */}
        <MainContent onPlay={(item) => player.setActiveTrack(item)} />
      </div>

      {/* Persistent bottom playback bar */}
      <NowPlaying {...player} />

      <style jsx>{`
        .app-shell {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--color-black);
          overflow: hidden;
        }
        .app-body {
          flex: 1;
          display: flex;
          gap: 8px;
          padding: 8px 8px 0;
          overflow: hidden;
          min-height: 0;
        }

        /* ── Responsive: hide sidebar text on small screens (handled in Sidebar.jsx) ── */
        @media (max-width: 480px) {
          .app-body {
            gap: 4px;
            padding: 4px 4px 0;
          }
        }
      `}</style>
    </div>
  );
}