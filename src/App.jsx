import { useState, useEffect } from "react";
import { useTasks } from "./hooks/useTasks";
import { useToast } from "./hooks/useToast";
import Header from "./components/Header";
import StatsRow from "./components/StatsRow";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LLVisualizer from "./components/LLVisualizer";
import ToastStack from "./components/ToastStack";
import "./index.css";

export default function App() {
    const { tasks, viz, loading, create, toggle, update, remove, moveTop, loadViz } = useTasks();
    const { toasts, push } = useToast();
    const [showViz,    setShowViz]  = useState(false);
    const [editingId,  setEditingId] = useState(null);
    const [activeFilter, setFilter] = useState("all");
    // all | done | in_progress | todo

    useEffect(() => { if (showViz) loadViz(); }, [showViz, tasks]);

    const handleCreate = async (payload) => {
        try {
            const data = await create(payload);
            const opMap = { "append — O(n)": "ditambah di akhir", "prepend — O(1)": "ditambah di awal" };
            push(`"${data.task.title}" ${opMap[data.operation] || "disisipkan"} ✓`);
        } catch (e) { push(e.message, "error"); }
    };

    const handleUpdate = async (id, payload) => {
        try {
            await update(id, payload);
            push("Task diperbarui ✓");
            setEditingId(null);
        } catch (e) { push(e.message, "error"); }
    };

    const handleDelete = async (task) => {
        try {
            await remove(task.task_id);
            push(`"${task.title}" dihapus`);
        } catch (e) { push(e.message, "error"); }
    };

    const handleMoveTop = async (task) => {
        try {
            await moveTop(task.task_id);
            push(`"${task.title}" dipindah ke atas ↑`);
        } catch (e) { push(e.message, "error"); }
    };

    // Hitung counts berdasarkan status
    const total      = tasks.length;
    const done       = tasks.filter(t => t.status === "done").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    const todo       = tasks.filter(t => t.status === "todo").length;

    const filtered = tasks.filter(t =>
        activeFilter === "all" ? true : t.status === activeFilter
    );

    const FILTERS = [
        { key: "all",         label: "Semua",          count: total      },
        { key: "todo",        label: "Belum Dikerjakan", count: todo      },
        { key: "in_progress", label: "Dalam Pengerjaan", count: inProgress},
        { key: "done",        label: "Selesai",          count: done      },
    ];

    const emptyMsg = {
        all:         "Linked list kosong. Tambahkan task pertama!",
        todo:        "Tidak ada task yang belum dikerjakan.",
        in_progress: "Tidak ada task yang sedang dikerjakan.",
        done:        "Belum ada task yang selesai.",
    };

    return (
        <div className="app">
            <ToastStack toasts={toasts} />
            <Header showViz={showViz} onToggleViz={() => setShowViz(v => !v)} />

            <main className="main">
                <div className="container">

                    <StatsRow total={total} done={done} inProgress={inProgress} todo={todo} />

                    {showViz && <LLVisualizer data={viz} />}

                    <TaskForm onSubmit={handleCreate} tasks={tasks} />

                    {/* Filter tabs */}
                    <div className="filter-tabs">
                        {FILTERS.map(f => (
                            <button
                                key={f.key}
                                className={`filter-tab filter-tab--${f.key} ${activeFilter === f.key ? "filter-tab--active" : ""}`}
                                onClick={() => setFilter(f.key)}
                            >
                                {f.label}
                                <span className="filter-tab__count"> [ {f.count} ]</span>
                            </button>
                        ))}
                        {loading && <span className="spinner" />}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state__icon">◎</div>
                            <p className="empty-state__text">{emptyMsg[activeFilter]}</p>
                        </div>
                    ) : (
                        <TaskList
                            tasks={filtered}
                            editingId={editingId}
                            onDelete={handleDelete}
                            onMoveTop={handleMoveTop}
                            onEdit={setEditingId}
                            onUpdate={handleUpdate}
                            onCancelEdit={() => setEditingId(null)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
