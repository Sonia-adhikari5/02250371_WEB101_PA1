// hooks/usePlayer.js
// Custom hook that manages all music player state and logic
// Single responsibility: encapsulates playback state away from UI components

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { currentTrack } from "../data/mockData";

export function usePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32); // percentage 0–100
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // "off" | "all" | "one"
  const [activeTrack, setActiveTrack] = useState(currentTrack);
  const intervalRef = useRef(null);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const toggleShuffle = useCallback(() => setIsShuffle((s) => !s), []);
  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const cycleRepeat = useCallback(() => {
    setRepeatMode((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  }, []);

  const seek = useCallback((pct) => setProgress(pct), []);
  const changeVolume = useCallback((val) => {
    setVolume(val);
    if (val > 0) setIsMuted(false);
  }, []);

  // Format seconds → "m:ss"
  const formatTime = useCallback((seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  const currentSeconds = Math.floor((progress / 100) * activeTrack.duration);

  return {
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
    setActiveTrack,
  };
}
