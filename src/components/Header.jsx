export default function Header({ showViz, onToggleViz }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__brand">
          <div className="header__logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="10" height="10" rx="2" fill="var(--brand)"/>
              <rect x="16" y="2" width="10" height="10" rx="2" fill="var(--brand)" opacity=".5"/>
              <rect x="2" y="16" width="10" height="10" rx="2" fill="var(--brand)" opacity=".3"/>
              <rect x="16" y="16" width="10" height="10" rx="2" fill="var(--brand)"/>
              <line x1="12" y1="7" x2="16" y2="7" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="21" x2="16" y2="21" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="header__title">TaskChain</h1>
            <p className="header__caption">Linked List · To-Do App · MVC</p>
          </div>
        </div>

        <button
          className={`viz-toggle ${showViz ? "viz-toggle--on" : ""}`}
          onClick={onToggleViz}
        >
          <span className="viz-toggle__dot" />
          {showViz ? "Sembunyikan Visualizer" : "Lihat Linked List"}
        </button>
      </div>
    </header>
  );
}
