import type { Dashboard } from "@prisma/client";
import { useState } from "react";
import { Link } from "react-router";

type CardForm = {
  name: string;
  url: string;
  imageUrl: string;
};

export default function CardCreateModal({
  dashboardId,
  dashboard,
}: {
  dashboardId: string;
  dashboard: Dashboard;
}) {
  const [form, setForm] = useState<CardForm>({
    name: "",
    url: "",
    imageUrl: "",
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-md relative shadow-2xl border border-gray-700">
        <Link
          to={`/dashboard?panel=${dashboardId}`}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 text-2xl"
        >
          ✕
        </Link>

        <h3 className="text-white text-2xl font-bold mb-2">Create Card</h3>
        <p className="text-gray-400 text-sm mb-6">
          Dashboard: <span className="text-white font-medium">{dashboard.name}</span>
        </p>

        <form method="post" action={`/dashboard/${dashboardId}/card/create`} className="space-y-5">
        <input type="hidden" name="dashboardId" value={dashboardId} />
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Card Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter card name"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              URL
            </label>
            <input
              type="url"
              name="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Link
              to={`/dashboard?panel=${dashboardId}`}
              className="flex-1 px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium text-center transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
