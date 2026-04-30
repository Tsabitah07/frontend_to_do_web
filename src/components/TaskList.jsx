import { useState } from "react";

const PRIORITY_COLOR = {
    high:   { bg: "#FEE2E2", text: "#DC2626", dot: "#EF4444" },
    medium: { bg: "#FEF9C3", text: "#B45309", dot: "#F59E0B" },
    low:    { bg: "#DCFCE7", text: "#15803D", dot: "#22C55E" },
};

const STATUS_CONFIG = {
    todo:        { label: "To Do",            bg: "#EFF6FF", text: "#1D4ED8", border: "#3B82F6", icon: "○" },
    in_progress: { label: "In Progress",      bg: "#FEF9C3", text: "#B45309", border: "#F59E0B", icon: "⟳" },
    done:        { label: "Selesai",          bg: "#F0FDF4", text: "#15803D", border: "#22C55E", icon: "✓" },
};

// Komponen StatusBadge yang sekarang berfungsi sebagai Dropdown
function StatusDropdown({ status, onStatusChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const current = STATUS_CONFIG[status] || STATUS_CONFIG.todo;

    const handleSelect = (key) => {
        onStatusChange(key);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown-container">
            {/* Tombol Pemicu (Trigger) */}
            <div
                className="dropdown-trigger"
                style={{ background: current.bg, color: current.text, borderColor: current.border }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="dot" style={{ background: current.dot }} />
                {current.label}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▾</span>
            </div>

            {/* List Menu (Muncul saat isOpen true) */}
            {isOpen && (
                <>
                    <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
                    <div className="dropdown-menu-list">
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <div
                                key={key}
                                className={`dropdown-item ${status === key ? 'active' : ''}`}
                                onClick={() => handleSelect(key)}
                            >
                                <span className="dot" style={{ background: cfg.dot }} />
                                {cfg.label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function PriorityBadge({ priority }) {
    const c = PRIORITY_COLOR[priority] || PRIORITY_COLOR.medium;
    return (
        <span className="priority-pill" style={{ background: c.bg, color: c.text }}>
            <span className="priority-pill__dot" style={{ background: c.dot }} />
            {priority === "high" ? "Tinggi" : priority === "medium" ? "Sedang" : "Rendah"}
        </span>
    );
}

function TaskCard({ task, index, isEditing, onDelete, onMoveTop, onEdit, onUpdate, onCancelEdit }) {
    const [eTitle,    setETitle]    = useState(task.title);
    const [eDesc,     setEDesc]     = useState(task.description);
    const [ePriority, setEPriority] = useState(task.priority);
    const [eStatus,   setEStatus]   = useState(task.status);

    const pc = PRIORITY_COLOR[task.priority] || PRIORITY_COLOR.medium;

    const date = new Date(task.created_at).toLocaleDateString("id-ID", {
        day: "2-digit", month: "short", year: "numeric",
    });

    // Handler untuk perubahan status langsung
    const handleQuickStatusChange = (newStatus) => {
        onUpdate(task.task_id, { ...task, status: newStatus });
    };

    return (
        <div
            className={`task-card task-card--${task.status}`}
            style={{ "--accent": pc.dot, "--accent-bg": pc.bg }}
        >
            <div className="task-card__accent" />

            <div className="task-card__main">
                {/* Content */}
                <div className="task-card__content">
                    {!isEditing ? (
                        <>
                            <div className="task-card__top">
                                <h3 className={`task-card__title ${task.status === "done" ? "task-card__title--done" : ""}`}>
                                    {task.title}
                                </h3>
                                <span className="task-card__index">node[{index}]</span>
                            </div>
                            {task.description && <p className="task-card__desc">{task.description}</p>}

                            <div className="task-card__meta">
                                {/* Diubah menjadi Dropdown yang bisa diklik langsung */}
                                <StatusDropdown
                                    status={task.status}
                                    onStatusChange={handleQuickStatusChange}
                                />
                                <PriorityBadge priority={task.priority} />
                                <span className="task-card__date">{date}</span>
                                {/*<span className="task-card__id-hint">{task.task_id.substring(0,8)}...</span>*/}
                            </div>
                        </>
                    ) : (
                        <div className="inline-edit">
                            <input
                                className="field__input"
                                value={eTitle}
                                onChange={e => setETitle(e.target.value)}
                                placeholder="Judul task"
                            />
                            <textarea
                                className="field__input field__textarea"
                                value={eDesc}
                                onChange={e => setEDesc(e.target.value)}
                                rows={2}
                                placeholder="Deskripsi"
                                style={{ marginTop: 8 }}
                            />
                            <div className="inline-edit__row">
                                <select className="field__input" value={eStatus} onChange={e => setEStatus(e.target.value)}>
                                    <option value="todo">○ To Do</option>
                                    <option value="in_progress">⟳ In Progress</option>
                                    <option value="done">✓ Selesai</option>
                                </select>
                                <select className="field__input" value={ePriority} onChange={e => setEPriority(e.target.value)}>
                                    <option value="high">Tinggi</option>
                                    <option value="medium">Sedang</option>
                                    <option value="low">Rendah</option>
                                </select>
                            </div>
                            <div className="inline-edit__row" style={{ marginTop: 8 }}>
                                <button className="btn-save" onClick={() => onUpdate(task.task_id, { title: eTitle, description: eDesc, priority: ePriority, status: eStatus })}>Simpan</button>
                                <button className="btn-cancel" onClick={onCancelEdit}>Batal</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                {!isEditing && (
                    <div className="task-card__actions">
                        <button className="action-btn" onClick={() => onMoveTop(task)} title="Pindah ke HEAD">↑</button>
                        <button className="action-btn" onClick={() => onEdit(task.task_id)} title="Edit">✎</button>
                        <button className="action-btn" onClick={() => onDelete(task)} title="Hapus">✕</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function TaskList({ tasks, editingId, onDelete, onMoveTop, onEdit, onUpdate, onCancelEdit }) {
    return (
        <div className="task-list">
            {tasks.map((task, i) => (
                <TaskCard
                    key={task.task_id}
                    task={task}
                    index={i}
                    isEditing={editingId === task.task_id}
                    onDelete={onDelete}
                    onMoveTop={onMoveTop}
                    onEdit={onEdit}
                    onUpdate={onUpdate}
                    onCancelEdit={onCancelEdit}
                />
            ))}
        </div>
    );
}