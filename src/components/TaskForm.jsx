import { useState } from "react";

const PRIORITY_OPTIONS = [
  { value: "high",   label: "🔴 Tinggi" },
  { value: "medium", label: "🟡 Sedang" },
  { value: "low",    label: "🟢 Rendah" },
];

export default function TaskForm({ onSubmit, tasks }) {
  const [title,    setTitle]    = useState("");
  const [desc,     setDesc]     = useState("");
  const [priority, setPriority] = useState("medium");
  const [position, setPosition] = useState("end");
  const [open,     setOpen]     = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description: desc, priority, position });
    setTitle(""); setDesc(""); setPriority("medium"); setPosition("end");
  };

  return (
    <div className="form-card">
      <button className="form-card__toggle" onClick={() => setOpen(o => !o)}>
        <span className="form-card__toggle-icon">{open ? "−" : "+"}</span>
        <span>Tambah Task Baru</span>
      </button>

      {open && (
        <form className="form-card__body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field field--full">
              <label className="field__label">Judul Task *</label>
              <input
                className="field__input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Apa yang perlu dilakukan?"
                required
              />
            </div>

            <div className="field field--full">
              <label className="field__label">Deskripsi</label>
              <textarea
                className="field__input field__textarea"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Detail tambahan (opsional)…"
                rows={2}
              />
            </div>

            <div className="field">
              <label className="field__label">Prioritas</label>
              <select className="field__input" value={priority} onChange={e => setPriority(e.target.value)}>
                {PRIORITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div className="field">
              <label className="field__label">
                Posisi Insert
                <span className="field__hint">Operasi Linked List</span>
              </label>
              <select className="field__input" value={position} onChange={e => setPosition(e.target.value)}>
                <option value="end">Append — Akhir O(n)</option>
                <option value="start">Prepend — Awal O(1)</option>
                {tasks.map((t, i) => (
                  <option key={t.task_id} value={t.task_id}>
                    Setelah [{i}] {t.title.slice(0, 22)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="btn-submit">
              <span>+ Tambah ke Linked List</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
