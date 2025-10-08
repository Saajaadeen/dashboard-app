import { useState } from "react";
import { Link, Form } from "react-router";

type Card = {
  id: string;
  name: string;
  url?: string;
  imageUrl?: string;
};

export default function CardEditModal({
  dashboardId,
  card,
}: {
  dashboardId: string;
  card: Card;
}) {
  const [form, setForm] = useState({
    name: card.name,
    url: card.url || "",
    imageUrl: card.imageUrl || "",
    confirmDelete: false,
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

        <h3 className="text-white text-2xl font-bold mb-6">Edit Card</h3>

        <Form method="post" className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Card Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              defaultValue={card.name}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              defaultValue={card.url || "https://example.com"}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              defaultValue={card.imageUrl || "https://example.com/image.jpg"}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="border-t border-gray-700 pt-4 mt-4">
            <label className="flex items-center gap-3 text-white text-sm mb-2">
              <input
                type="checkbox"
                checked={form.confirmDelete}
                onChange={(e) =>
                  setForm({ ...form, confirmDelete: e.target.checked })
                }
                className="w-4 h-4 accent-red-600"
              />
              Confirm Delete
            </label>
            <button
              type="submit"
              name="intent"
              value="delete"
              disabled={!form.confirmDelete}
              className="w-full px-5 py-3 mt-2 bg-red-600 hover:bg-red-500 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Card
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <Link
              to={`/dashboard?panel=${dashboardId}`}
              className="flex-1 px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              name="intent"
              value="update"
              className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}