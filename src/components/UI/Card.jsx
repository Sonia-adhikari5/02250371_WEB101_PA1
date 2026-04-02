// components/UI/Card.jsx
// Reusable Card component – renders a playlist or album card with gradient art.
// Single responsibility: display a single media item card with hover play affordance.
// Used by: FeaturedSection, RecentlyPlayed, TopArtists

"use client";

import { Play } from "lucide-react";

/**
 * AlbumArt – Generates a gradient visual as a placeholder for album artwork.
 * Accepts `color` and `colorSecondary` props to create unique per-item visuals.
 */
function AlbumArt({ color, colorSecondary, isArtist }) {
  return (
    <div
      className={`album-art ${isArtist ? "round" : ""}`}
      style={{
        background: `linear-gradient(145deg, ${color} 0%, ${colorSecondary} 100%)`,
      }}
    >
      {/* Decorative inner shapes for visual depth */}
      <div className="art-shape-1" style={{ background: `${color}44` }} />
      <div className="art-shape-2" style={{ background: `${colorSecondary}33` }} />

      <style jsx>{`
        .album-art {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .album-art.round { border-radius: 50%; }
        .art-shape-1 {
          position: absolute;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          top: -10%;
          right: -10%;
        }
        .art-shape-2 {
          position: absolute;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          bottom: 10%;
          left: 10%;
        }
      `}</style>
    </div>
  );
}

/**
 * Card – fully reusable card component for playlists, albums, and artists.
 * Props:
 *   item: { title, description/type, color, colorSecondary }
 *   onPlay: function called when play button or card is double-clicked
 *   isArtist: boolean – renders a circular avatar when true
 */
export default function Card({ item, onPlay, isArtist = false }) {
  return (
    <div className="card" role="article" aria-label={item.title}>
      <div className="card-art-wrapper">
        <AlbumArt
          color={item.color}
          colorSecondary={item.colorSecondary}
          isArtist={isArtist}
        />
        <button
          className="play-btn"
          onClick={onPlay}
          aria-label={`Play ${item.title}`}
        >
          <Play size={20} fill="#000" color="#000" />
        </button>
      </div>
      <p className="card-title">{item.title}</p>
      <p className="card-sub">{item.description || item.type}</p>

      <style jsx>{`
        .card {
          background: #181818;
          border-radius: 8px;
          padding: 16px;
          cursor: pointer;
          transition: background 0.2s;
          position: relative;
        }
        .card:hover { background: #282828; }
        .card-art-wrapper {
          position: relative;
          margin-bottom: 12px;
        }
        .play-btn {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 44px;
          height: 44px;
          background: #1DB954;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        .card:hover .play-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .card-title {
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-sub {
          color: #b3b3b3;
          font-size: 0.8rem;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}
