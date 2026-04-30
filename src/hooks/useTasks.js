import { useState, useEffect, useCallback } from "react";
import { api } from "../api/tasks";

export function useTasks() {
    const [tasks,   setTasks]   = useState([]);
    const [viz,     setViz]     = useState(null);
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await api.getTasks();
            setTasks(data.tasks || []);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    }, []);

    const loadViz = useCallback(async () => {
        try { setViz(await api.getViz()); } catch {}
    }, []);

    useEffect(() => { load(); }, [load]);

    const create  = async (p)     => { const d = await api.createTask(p);       await load(); return d; };
    const update  = async (id, p) => { const d = await api.updateTask(id, p);   await load(); return d; };
    const remove  = async (id)    => {              await api.deleteTask(id);    await load(); };
    const moveTop = async (id)    => {              await api.moveToTop(id);     await load(); };

    return { tasks, viz, loading, error, load, loadViz, create, update, remove, moveTop };
}