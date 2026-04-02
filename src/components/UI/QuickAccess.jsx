// components/UI/QuickAccess.jsx
// QuickAccess – renders the 6-tile "Good evening" grid at the top of the home feed.
// Single responsibility: display recently played items as quick-launch tiles.

"use client";

import { Play } from "lucide-react";
import { recentlyPlayed } from "../../data/mockData";

/**
 * QuickTile – single reusable tile in the quick access grid.
 * Shows a colored swatch + title + inline play button on hover.
 */
function QuickTile({ item, onPlay }) {
  return (
    <button
      className="quick-tile"
      onClick={onPlay}
      aria-label={`Play ${item.title}`}
    >
      {/* Gradient swatch representing album art */}
      <span
        className="tile-art"
        style={{
          background: `linear-gradient(135deg, ${item.color}, ${item.colorSecondary})`,
        }}
      />
      <span className="tile-title">{item.title}</span>
      <span className="tile-play">
        <Play size={18} fill="#000" color="#000" />
      </span>

      <style jsx>{`
        .quick-tile {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: background 0.15s;
          height: 56px;
        }
        .quick-tile:hover { background: rgba(255,255,255,0.2); }
        .tile-art {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 4px 0 0 4px;
        }
        .tile-title {
          flex: 1;
          padding: 0 14px;
          color: #fff;
          font-size: 0.88rem;
          font-weight: 700;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tile-play {
          width: 40px;
          height: 40px;
          background: #1DB954;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          opacity: 0;
          transform: translateX(4px);
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          flex-shrink: 0;
        }
        .quick-tile:hover .tile-play {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </button>
  );
}

export default function QuickAccess({ onPlay }) {
  return (
    <div className="quick-access" role="region" aria-label="Recently played">
      {recentlyPlayed.map((item) => (
        <QuickTile key={item.id} item={item} onPlay={() => onPlay?.(item)} />
      ))}

      <style jsx>{`
        .quick-access {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        @media (max-width: 900px) {
          .quick-access { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .quick-access { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
