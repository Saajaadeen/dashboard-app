import { Link } from "react-router";
import { useState, useEffect } from "react";

type Visibility = "GLOBAL" | "PRIVATE" | "PUBLIC";
type Permissions = "READ" | "WRITE" | "DELETE";

export default function DashboardEditModal({
  dashboard,
  dashboardId,
  isAdmin = false,
  userId,
}: any) {
  if (!dashboard) return null;

  const allVisibility: Visibility[] = isAdmin
    ? ["GLOBAL", "PRIVATE", "PUBLIC"]
    : ["PRIVATE", "PUBLIC"];

  const allPermissions: Permissions[] = ["READ", "WRITE", "DELETE"];

  const [confirmDelete, setConfirmDelete] = useState(false);

  const defaultPermissions = (visibility: Visibility): Permissions[] => {
    switch (visibility) {
      case "PRIVATE":
        return ["READ", "WRITE", "DELETE"];
      case "GLOBAL":
        return ["READ", "WRITE"];
      case "PUBLIC":
        // Ensure READ is always included
        return dashboard.permissions?.length
          ? dashboard.permissions.includes("READ")
            ? dashboard.permissions
            : ["READ", ...dashboard.permissions]
          : ["READ"];
    }
  };

  const [form, setForm] = useState({
    name: dashboard.name,
    description: dashboard.description || "",
    visibility: dashboard.visibility[0] as Visibility,
    permissions: defaultPermissions(dashboard.visibility[0] as Visibility),
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      permissions: defaultPermissions(prev.visibility),
    }));
  }, [form.visibility]);

  const setVisibility = (vis: Visibility) => {
    if (vis === "GLOBAL" && !isAdmin) return;
    setForm((prev) => ({
      ...prev,
      visibility: vis,
      permissions: defaultPermissions(vis),
    }));
  };

  const togglePermission = (perm: Permissions) => {
    const { visibility } = form;

    if (visibility === "PRIVATE") {
      if (["READ", "WRITE", "DELETE"].includes(perm)) return;
    }

    if (visibility === "GLOBAL") {
      if (["READ", "WRITE"].includes(perm)) return;
      if (!isAdmin) return;
    }

    if (visibility === "PUBLIC") {
      if (perm === "READ") return;
    }

    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const visibilityTooltips: Record<Visibility, string> = {
    GLOBAL: "Visible to all users (admin only)",
    PRIVATE: "Only visible to you",
    PUBLIC: "Visible to users with shared access",
  };

  const permissionTooltips: Record<Permissions, string> = {
    READ: "View dashboard content and data",
    WRITE: "Create and modify dashboard items",
    DELETE: "Remove dashboards and their content",
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-lg relative shadow-2xl border border-gray-700">
        <Link
          to="/dashboard"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 text-2xl"
        >
          <p className="text-3xl">✕</p>
        </Link>

        <h3 className="text-white text-2xl font-bold mb-6">Edit Dashboard</h3>

        <form
          action={`/dashboard/${dashboardId}/edit`}
          method="post"
          className="space-y-5"
        >
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="dashboardId" value={dashboardId} />
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
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Visibility
            </label>
            <div className="grid grid-cols-3 gap-2">
              {allVisibility.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVisibility(v)}
                  title={visibilityTooltips[v]}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 transition-all
                    ${
                      form.visibility === v
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {allPermissions.map((p) => {
                const locked =
                  (form.visibility === "PRIVATE" &&
                    ["READ", "WRITE", "DELETE"].includes(p)) ||
                  (form.visibility === "GLOBAL" &&
                    ["READ", "WRITE"].includes(p)) ||
                  (form.visibility === "PUBLIC" && p === "READ");

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => !locked && togglePermission(p)}
                    title={permissionTooltips[p]}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 transition-all
                      ${
                        form.permissions.includes(p)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-700"
                      }
                      ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {p}
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
              className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>

        <form
          action={`/dashboard/${dashboardId}/edit`}
          method="post"
          className="mt-6 pt-4 border-t border-gray-700"
        >
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="dashboardId" value={dashboardId} />

          <h4 className="text-red-500 text-sm font-semibold mb-2">
            Delete Dashboard
          </h4>
          <p className="text-gray-400 text-xs mb-3">
            This action cannot be undone. All dashboard data will be permanently removed.
          </p>

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="confirmDelete"
              className="mr-2"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
            <label htmlFor="confirmDelete" className="text-gray-300 text-sm">
              I understand the consequences
            </label>
          </div>

          <button
            type="submit"
            disabled={!confirmDelete}
            className={`w-full px-5 py-3 rounded-xl text-white font-medium shadow-lg transition-all
              ${
                confirmDelete
                  ? "bg-red-600 hover:bg-red-500 shadow-red-500/30 cursor-pointer"
                  : "bg-red-400 cursor-not-allowed opacity-60"
              }`}
          >
            Delete Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
