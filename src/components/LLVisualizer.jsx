export default function LLVisualizer({ data }) {
  if (!data) return (
    <div className="viz-panel">
      <p className="viz-panel__loading">Memuat visualisasi…</p>
    </div>
  );

  const { nodes, head, size } = data;

  return (
    <div className="viz-panel">
      <div className="viz-panel__header">
        <span className="viz-panel__title">Struktur Linked List</span>
        <span className="viz-panel__meta">{size} node{size !== 1 ? "s" : ""} · HEAD: <code>{head?.slice(0,8) ?? "—"}…</code></span>
      </div>

      <div className="viz-chain">
        {nodes.length === 0 ? (
          <span className="viz-null">HEAD → NULL</span>
        ) : nodes.map((n, i) => (
          <span key={n.task_id} className="viz-chain__item">
            <div className={`viz-node ${i === 0 ? "viz-node--head" : ""}`}>
              <div className="viz-node__badge">{i === 0 ? "HEAD" : `[${i}]`}</div>
              <div className="viz-node__title" title={n.title}>{n.title}</div>
              <div className="viz-node__id">{n.task_id.slice(0,8)}…</div>
              <div className="viz-node__ptr">→ {n.has_next ? n.next_id?.slice(0,6)+"…" : "NULL"}</div>
            </div>
            <span className={`viz-arrow ${!n.has_next ? "viz-arrow--null" : ""}`}>
              {n.has_next ? "→" : "→ NULL"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
