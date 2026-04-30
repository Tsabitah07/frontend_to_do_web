const BASE = "http://localhost:8000";

async function req(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Server error" }));
        throw new Error(err.detail || "Request gagal");
    }
    return res.json();
}

export const api = {
    getTasks:    ()           => req("/tasks"),
    getTask:     (id)         => req(`/tasks/${id}`),
    createTask:  (body)       => req("/tasks", { method: "POST", body: JSON.stringify(body) }),
    updateTask:  (id, body)   => req(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    deleteTask:  (id)         => req(`/tasks/${id}`, { method: "DELETE" }),
    moveToTop:   (id)         => req(`/tasks/${id}/move-top`, { method: "PATCH" }),
    getViz:      ()           => req("/linked-list/visualize"),
};
