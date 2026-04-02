// components/NowPlaying/NowPlaying.jsx
// NowPlaying – the persistent bottom playback bar.
// Single responsibility: display current track info and expose playback controls.
// Receives all state and handlers from the usePlayer hook via props (no local state).

"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  Maximize2,
  ListMusic,
  Mic2,
} from "lucide-react";

/**
 * ProgressBar – reusable seek bar.
 * Props: value (0-100), onChange(pct), formatTime, currentSeconds, duration
 */
function ProgressBar({ value, onChange, formatTime, currentSeconds, duration }) {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    onChange(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div className="progress-wrapper" aria-label="Seek bar">
      <span className="time-label">{formatTime(currentSeconds)}</span>
      <div
        className="progress-track"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-label="Track progress"
        onClick={handleClick}
      >
        <div className="progress-fill" style={{ width: `${value}%` }} />
        <div className="progress-thumb" style={{ left: `${value}%` }} />
      </div>
      <span className="time-label">{formatTime(duration)}</span>

      <style jsx>{`
        .progress-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 560px;
        }
        .time-label {
          color: #b3b3b3;
          font-size: 0.72rem;
          min-width: 32px;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        .progress-track {
          flex: 1;
          height: 4px;
          background: #535353;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          transition: height 0.15s;
        }
        .progress-track:hover { height: 6px; }
        .progress-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #fff;
          border-radius: 2px;
          transition: width 0.1s linear;
          pointer-events: none;
        }
        .progress-track:hover .progress-fill { background: #1DB954; }
        .progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.15s;
          pointer-events: none;
        }
        .progress-track:hover .progress-thumb { opacity: 1; }
      `}</style>
    </div>
  );
}

/**
 * VolumeControl – reusable volume slider with mute toggle.
 */
function VolumeControl({ volume, isMuted, onToggleMute, onChangeVolume }) {
  const displayVolume = isMuted ? 0 : volume;

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    onChangeVolume(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div className="volume-control">
      <button
        className="ctrl-btn"
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <div
        className="vol-track"
        role="slider"
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={displayVolume}
        onClick={handleClick}
      >
        <div className="vol-fill" style={{ width: `${displayVolume}%` }} />
        <div className="vol-thumb" style={{ left: `${displayVolume}%` }} />
      </div>

      <style jsx>{`
        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 130px;
        }
        .vol-track {
          flex: 1;
          height: 4px;
          background: #535353;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          transition: height 0.15s;
        }
        .vol-track:hover { height: 6px; }
        .vol-fill {
          position: absolute;
          left: 0; top: 0;
          height: 100%;
          background: #fff;
          border-radius: 2px;
          pointer-events: none;
        }
        .vol-track:hover .vol-fill { background: #1DB954; }
        .vol-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.15s;
          pointer-events: none;
        }
        .vol-track:hover .vol-thumb { opacity: 1; }
      `}</style>
    </div>
  );
}

export default function NowPlaying({
  isPlaying,
  progress,
  volume,
  isMuted,
  isShuffle,
  repeatMode,
  activeTrack,
  currentSeconds,
  togglePlay,
  toggleShuffle,
  toggleMute,
  cycleRepeat,
  seek,
  changeVolume,
  formatTime,
}) {
  const RepeatIcon = repeatMode === "one" ? Repeat1 : Repeat;

  return (
    <footer className="now-playing" role="region" aria-label="Now playing">
      {/* ── Left: Track Info ── */}
      <div className="track-info">
        <div
          className="track-art"
          style={{
            background: `linear-gradient(135deg, ${activeTrack.color}, ${activeTrack.colorSecondary})`,
          }}
          aria-hidden="true"
        />
        <div className="track-meta">
          <span className="track-title">{activeTrack.title}</span>
          <span className="track-artist">{activeTrack.artist}</span>
        </div>
        <button className="ctrl-btn heart-btn" aria-label="Save to liked songs">
          <Heart size={18} />
        </button>
      </div>

      {/* ── Centre: Playback Controls ── */}
      <div className="playback-centre">
        <div className="controls-row">
          <button
            className={`ctrl-btn ${isShuffle ? "active" : ""}`}
            onClick={toggleShuffle}
            aria-label="Toggle shuffle"
            aria-pressed={isShuffle}
          >
            <Shuffle size={18} />
          </button>

          <button className="ctrl-btn" aria-label="Previous track">
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            className="play-pause-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={22} fill="#000" color="#000" /> : <Play size={22} fill="#000" color="#000" />}
          </button>

          <button className="ctrl-btn" aria-label="Next track">
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            className={`ctrl-btn ${repeatMode !== "off" ? "active" : ""}`}
            onClick={cycleRepeat}
            aria-label={`Repeat: ${repeatMode}`}
            aria-pressed={repeatMode !== "off"}
          >
            <RepeatIcon size={18} />
          </button>
        </div>

        <ProgressBar
          value={progress}
          onChange={seek}
          formatTime={formatTime}
          currentSeconds={currentSeconds}
          duration={activeTrack.duration}
        />
      </div>

      {/* ── Right: Extra Controls ── */}
      <div className="extra-controls">
        <button className="ctrl-btn" aria-label="Lyrics">
          <Mic2 size={18} />
        </button>
        <button className="ctrl-btn" aria-label="Queue">
          <ListMusic size={18} />
        </button>
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onChangeVolume={changeVolume}
        />
        <button className="ctrl-btn" aria-label="Full screen">
          <Maximize2 size={18} />
        </button>
      </div>

      <style jsx>{`
        .now-playing {
          height: 90px;
          background: #181818;
          border-top: 1px solid #282828;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          gap: 16px;
          flex-shrink: 0;
        }
        .track-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }
        .track-art {
          width: 56px;
          height: 56px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .track-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
          overflow: hidden;
        }
        .track-title {
          color: #fff;
          font-size: 0.88rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .track-artist {
          color: #b3b3b3;
          font-size: 0.78rem;
        }
        .heart-btn { margin-left: 4px; }
        .playback-centre {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 2;
          max-width: 600px;
        }
        .controls-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ctrl-btn {
          background: none;
          border: none;
          color: #b3b3b3;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.15s, transform 0.1s;
        }
        .ctrl-btn:hover { color: #fff; transform: scale(1.05); }
        .ctrl-btn.active { color: #1DB954; }
        .play-pause-btn {
          width: 40px;
          height: 40px;
          background: #fff;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.1s, background 0.15s;
        }
        .play-pause-btn:hover { transform: scale(1.06); background: #f0f0f0; }
        .extra-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: flex-end;
        }
        @media (max-width: 900px) {
          .track-info { flex: 0 0 auto; max-width: 180px; }
          .extra-controls { display: none; }
        }
        @media (max-width: 600px) {
          .now-playing { padding: 0 12px; }
          .track-art { width: 44px; height: 44px; }
          .track-meta { max-width: 100px; }
        }
      `}</style>
    </footer>
  );
}
