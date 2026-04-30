export default function ToastStack({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="toast__icon">{t.type === "error" ? "✕" : "✓"}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
