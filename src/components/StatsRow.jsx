export default function StatsRow({ total, todo, inProgress, done }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-card__num stat-card__num--brand">{total}</span>
        <span className="stat-card__label">Total Task</span>
      </div>
      <div className="stat-card">
        <span className="stat-card__num stat-card__num--blue">{todo}</span>
        <span className="stat-card__label">To Do</span>
      </div>
      <div className="stat-card">
        <span className="stat-card__num stat-card__num--yellow">{inProgress}</span>
        <span className="stat-card__label">In Progress</span>
      </div>
      <div className="stat-card">
        <span className="stat-card__num stat-card__num--green">{done}</span>
        <span className="stat-card__label">Done</span>
      </div>
      <div className="stat-card stat-card--wide">
        <div className="stat-card__label" style={{ marginBottom: 8 }}>
          Progress <strong>{pct}%</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
