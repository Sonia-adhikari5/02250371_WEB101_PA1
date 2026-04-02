# stdno_WEB101_PA1 — Spotify Web Player Recreation

A React/Next.js recreation of the **Spotify Web Player** home page, built for  
**WEB101 Practical Assignment 1** at the Royal University of Bhutan, College of Science and Technology.

---

##  Functionality

| Feature | Description |
|---|---|
| **Home Feed** | Greeting banner that adapts to time of day (morning / afternoon / evening) |
| **Quick Access Grid** | 6-tile recently-played section for instant playback |
| **Featured Playlists** | "Made for you" section with playlist cards |
| **Top Artists** | Circular artist card grid |
| **Recently Played** | Horizontal card row |
| **Sidebar Navigation** | Home, Search, and Your Library with filterable playlist list |
| **Now Playing Bar** | Play/Pause, skip, shuffle, repeat, seek, and volume controls |
| **Simulated Playback** | Progress bar advances in real-time while playing |
| **Responsive Layout** | Adapts to desktop (≥1024px), tablet (768–1023px), and mobile (≤767px) |

---

## Component Architecture

```
src/
├── app/
│   ├── layout.js          # Root Next.js layout (fonts, metadata)
│   ├── page.js            # Composition root – wires all components together
│   └── globals.css        # Global reset & CSS variables
│
├── components/
│   ├── Sidebar/
│   │   └── Sidebar.jsx        # Navigation + playlist library
│   │       ├── NavButton      # Reusable nav item (Home / Search)
│   │       └── PlaylistItem   # Reusable playlist row
│   │
│   ├── MainContent/
│   │   └── MainContent.jsx    # Scrollable home feed
│   │       └── TopBar         # Sticky header with nav arrows + avatar
│   │
│   ├── NowPlaying/
│   │   └── NowPlaying.jsx     # Persistent bottom playback bar
│   │       ├── ProgressBar    # Reusable seek bar
│   │       └── VolumeControl  # Reusable volume slider
│   │
│   └── UI/
│       ├── Card.jsx           # Reusable playlist/album/artist card
│       │   └── AlbumArt       # Gradient placeholder artwork
│       ├── SectionRow.jsx     # Reusable labelled grid of Cards
│       └── QuickAccess.jsx    # Quick-launch tile grid
│           └── QuickTile      # Single quick-access tile
│
├── data/
│   └── mockData.js        # Centralised data source for all components
│
└── hooks/
    └── usePlayer.js       # Custom hook: all playback state & logic
```

### Component Hierarchy Diagram

```
Page (state owner)
├── Sidebar
│   ├── NavButton (reusable × 2)
│   └── PlaylistItem (reusable × n)
├── MainContent
│   ├── TopBar
│   ├── QuickAccess
│   │   └── QuickTile (reusable × 6)
│   └── SectionRow (reusable × 3)
│       └── Card (reusable × n)
│           └── AlbumArt
└── NowPlaying
    ├── ProgressBar (reusable)
    └── VolumeControl (reusable)
```

---

## Implementation Decisions

### Framework Choice – Next.js 14 (App Router)
Next.js was chosen over plain Vite/React for its built-in font optimisation (`next/font`), file-based routing, and production-ready defaults. The App Router enables Server Components by default, with `"use client"` added only where interactivity is required.

### State Management – Custom Hook (`usePlayer`)
All playback state (play/pause, progress, volume, shuffle, repeat) is managed in a single custom hook (`usePlayer`). This keeps the `Page` component clean and makes the player logic independently testable.

### Reusable Components
The assignment requires components that follow the **single responsibility principle**:
- `Card` – renders one media item; knows nothing about layout.
- `SectionRow` – handles layout of a titled card grid; doesn't care about card internals.
- `ProgressBar` / `VolumeControl` – UI primitives used inside `NowPlaying`.
- `NavButton` / `PlaylistItem` – atomic sidebar elements.

### Data Layer
All mock data lives in `src/data/mockData.js`. Components receive data via props or direct import, keeping data concerns separate from presentation.

### Styling Approach
Scoped `<style jsx>` blocks (Next.js built-in CSS-in-JS) are used per component, with global CSS variables defined in `globals.css`. This avoids class-name collisions and keeps styles co-located with their components.

### Responsive Design
| Breakpoint | Behaviour |
|---|---|
| ≥ 1024px | Full sidebar, all columns visible |
| 768–1023px | Sidebar collapses to icon-only mode |
| ≤ 767px | Single-column layout, extra controls hidden |

---

##  Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

##  Third-Party Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 14.2.3 | React framework |
| `react` | ^18 | UI library |
| `lucide-react` | ^0.383.0 | Icon set (SVG icons) |

No other external libraries are used. All CSS is custom.

---

##  Browser Testing

Tested and consistent across:
- Chrome 124+ (desktop & mobile)
- Firefox 125+
- Safari 17+ (macOS & iOS)
- Edge 124+

Screen sizes tested: 375px (iPhone SE), 768px (iPad), 1280px, 1920px.

---

##  Submission Details

- **Module**: WEB101 – Web Technologies
- **Assignment**: Practical Assignment 1
- **Repository Format**: `stdno_WEB101_PA1`
- **Submission Portal**: VLE
- **Due Date**: 3rd April 2026

---

##  Academic Integrity

This project is submitted in compliance with the RUB Wheel of Academic Law (Section H2).  
All code has been written independently. The Spotify brand and design are used purely  
for educational reference — this is a student recreation, not a commercial product.
