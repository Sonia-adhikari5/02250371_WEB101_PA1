// components/UI/SectionRow.jsx
// SectionRow – reusable horizontal scrollable section with title and "Show all" link.
// Single responsibility: renders a labeled row of Card items.
// Accepts any array of items and renders them via the Card component.

"use client";

import Card from "./Card";

/**
 * SectionRow
 * Props:
 *   title: string – section heading
 *   items: array – data items with shape { id, title, description/type, color, colorSecondary }
 *   isArtist: boolean – pass true to render circular artist cards
 *   onPlay: function(item) – handler for play button click
 */
export default function SectionRow({ title, items, isArtist = false, onPlay }) {
  return (
    <section className="section-row" aria-labelledby={`section-${title}`}>
      <div className="section-header">
        <h2 id={`section-${title}`} className="section-title">{title}</h2>
        <button className="show-all-btn" aria-label={`Show all ${title}`}>
          Show all
        </button>
      </div>
      <div className="cards-grid" role="list">
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <Card item={item} isArtist={isArtist} onPlay={() => onPlay?.(item)} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-row {
          margin-bottom: 8px;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .show-all-btn {
          background: none;
          border: none;
          color: #b3b3b3;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.15s;
        }
        .show-all-btn:hover { color: #fff; }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
        }
        @media (max-width: 600px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .section-title { font-size: 1.1rem; }
        }
      `}</style>
    </section>
  );
}
