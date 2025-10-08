import { useState, useEffect } from "react";
import { Link } from "react-router";

type Visibility = "GLOBAL" | "PRIVATE" | "PUBLIC";
type Permissions = "READ" | "WRITE" | "DELETE";

export default function DashboardCreateModal({ isAdmin = false, userId }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    visibility: "PRIVATE" as Visibility,
    permissions: ["READ", "WRITE", "DELETE"] as Permissions[],
  });

  useEffect(() => {
    if (form.visibility === "PRIVATE") {
      setForm((prev) => ({ ...prev, permissions: ["READ", "WRITE", "DELETE"] }));
    } else if (form.visibility === "GLOBAL") {
      setForm((prev) => ({ ...prev, permissions: ["READ"] }));
    } else if (form.visibility === "PUBLIC") {
      setForm((prev) => ({
        ...prev,
        permissions: prev.permissions.includes("READ")
          ? prev.permissions
          : ["READ", ...prev.permissions],
      }));
    }
  }, [form.visibility]);

  const togglePermission = (perm: Permissions) => {
    const isPrivate = form.visibility === "PRIVATE";
    const isGlobal = form.visibility === "GLOBAL";
    const isPublic = form.visibility === "PUBLIC";

    if (
      (isPrivate && ["READ", "WRITE", "DELETE"].includes(perm)) ||
      (isGlobal && ["READ"].includes(perm)) ||
      (isPublic && perm === "READ")
    )
      return;

    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const setVisibility = (vis: Visibility) => {
    if (!isAdmin && vis === "GLOBAL") return;
    setForm((prev) => ({ ...prev, visibility: vis }));
  };

  const permissionTooltips: Record<Permissions, string> = {
    READ: "View dashboard content and data",
    WRITE: "Create and modify dashboard items",
    DELETE: "Remove dashboards and their content",
  };

  const visibilityTooltips: Record<Visibility, string> = {
    GLOBAL: "Visible to all users across the system",
    PRIVATE: "Only visible to you",
    PUBLIC: "Visible to users with shared access",
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-lg relative shadow-2xl border border-gray-700">
        <Link
          to="/dashboard"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 text-2xl"
        >
          ✕
        </Link>

        <h3 className="text-white text-2xl font-bold mb-6">Create Dashboard</h3>

        <form method="post" action="/dashboard/create" className="space-y-5">
          <input
            type="hidden"
            name="visibility"
            value={JSON.stringify([form.visibility])}
          />
          <input
            type="hidden"
            name="permissions"
            value={form.permissions.join(",")}
          />

          {form.visibility === "PRIVATE" && (
            <input type="hidden" name="userId" value={userId} />
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Dashboard Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter dashboard name"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add a brief description"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Visibility
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["GLOBAL", "PRIVATE", "PUBLIC"] as Visibility[]).map((vis) => {
                const disabled = !isAdmin && vis === "GLOBAL";
                const active = form.visibility === vis;
                return (
                  <button
                    key={vis}
                    type="button"
                    disabled={disabled}
                    onClick={() => setVisibility(vis)}
                    title={visibilityTooltips[vis]}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : disabled
                        ? "bg-gray-900/70 text-gray-500 border border-gray-700 cursor-not-allowed"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                    }`}
                  >
                    {vis}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["READ", "WRITE", "DELETE"] as Permissions[]).map((perm) => {
                const active = form.permissions.includes(perm);
                const locked =
                  (form.visibility === "PRIVATE" &&
                    ["READ", "WRITE", "DELETE"].includes(perm)) ||
                  (form.visibility === "GLOBAL" &&
                    ["READ", "WRITE"].includes(perm)) ||
                  (form.visibility === "PUBLIC" && perm === "READ");

                return (
                  <button
                    key={perm}
                    type="button"
                    disabled={locked}
                    onClick={() => togglePermission(perm)}
                    title={locked ? "Permission cannot be changed" : perm}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? locked
                          ? "bg-green-900 text-white shadow-lg shadow-green-800/50"
                          : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                    }`}
                  >
                    {perm}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Link
              to="/dashboard"
              className="flex-1 px-5 py-3 text-center bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white text-center font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              Create Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
