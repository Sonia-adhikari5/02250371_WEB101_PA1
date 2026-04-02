// data/mockData.js
// Centralized mock data source for all reusable components

export const currentTrack = {
  id: 1,
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  duration: 200,
  // Gradient used as album art placeholder
  color: "#e91e63",
  colorSecondary: "#880e4f",
};

export const playlists = [
  { id: 1, name: "Liked Songs", count: 324, color: "#4a148c" },
  { id: 2, name: "Morning Vibes", count: 18, color: "#1b5e20" },
  { id: 3, name: "Late Night Drive", count: 42, color: "#0d47a1" },
  { id: 4, name: "Workout Hits", count: 33, color: "#b71c1c" },
  { id: 5, name: "Chill Lofi", count: 57, color: "#4e342e" },
  { id: 6, name: "Focus Mode", count: 29, color: "#006064" },
  { id: 7, name: "Throwbacks", count: 88, color: "#f57f17" },
  { id: 8, name: "Acoustic Sessions", count: 15, color: "#37474f" },
];

export const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "Jung Kook is on top of the hottest 50!",
    color: "#e91e63",
    colorSecondary: "#c2185b",
  },
  {
    id: 2,
    title: "RapCaviar",
    description: "New music from Drake, Travis Scott and more.",
    color: "#1565c0",
    colorSecondary: "#0d47a1",
  },
  {
    id: 3,
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    color: "#2e7d32",
    colorSecondary: "#1b5e20",
  },
  {
    id: 4,
    title: "Viva Latino",
    description: "Today's top Latin hits, elevando el género.",
    color: "#f57c00",
    colorSecondary: "#e65100",
  },
  {
    id: 5,
    title: "Rock Classics",
    description: "Rock legends & epic songs that continue to inspire.",
    color: "#6a1b9a",
    colorSecondary: "#4a148c",
  },
  {
    id: 6,
    title: "Peaceful Piano",
    description: "Peaceful piano to help you slow down.",
    color: "#00695c",
    colorSecondary: "#004d40",
  },
];

export const recentlyPlayed = [
  { id: 1, title: "Liked Songs", type: "Playlist", color: "#4a148c", colorSecondary: "#7b1fa2" },
  { id: 2, title: "Morning Vibes", type: "Playlist", color: "#1b5e20", colorSecondary: "#388e3c" },
  { id: 3, title: "After Hours", type: "Album • The Weeknd", color: "#b71c1c", colorSecondary: "#e53935" },
  { id: 4, title: "ASTROWORLD", type: "Album • Travis Scott", color: "#e65100", colorSecondary: "#ff9800" },
  { id: 5, title: "Chill Lofi", type: "Playlist", color: "#4e342e", colorSecondary: "#795548" },
  { id: 6, title: "Thriller", type: "Album • Michael Jackson", color: "#212121", colorSecondary: "#616161" },
];

export const topArtists = [
  { id: 1, name: "The Weeknd", genre: "Pop / R&B", color: "#880e4f", colorSecondary: "#e91e63" },
  { id: 2, name: "Drake", genre: "Hip-Hop / Rap", color: "#1a237e", colorSecondary: "#3f51b5" },
  { id: 3, name: "Taylor Swift", genre: "Pop / Country", color: "#880e4f", colorSecondary: "#f06292" },
  { id: 4, name: "Bad Bunny", genre: "Reggaeton / Latin", color: "#1b5e20", colorSecondary: "#66bb6a" },
];

export const queueTracks = [
  { id: 2, title: "Save Your Tears", artist: "The Weeknd", duration: 215, color: "#880e4f", colorSecondary: "#e91e63" },
  { id: 3, title: "Starboy", artist: "The Weeknd ft. Daft Punk", duration: 230, color: "#4a148c", colorSecondary: "#9c27b0" },
  { id: 4, title: "Die For You", artist: "The Weeknd", duration: 260, color: "#1a237e", colorSecondary: "#3f51b5" },
  { id: 5, title: "Can't Feel My Face", artist: "The Weeknd", duration: 213, color: "#b71c1c", colorSecondary: "#f44336" },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "search", label: "Search" },
];
