import { useEffect, useState } from "react";
import { XMarkIcon } from "../icons/XMarkIcon";
import { Form, Link, useFetcher } from "react-router";

export default function UserNotificationsModal({ notifications }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const fetcher = useFetcher();

  // Reset fields when the form successfully submits
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setTitle("");
      setMessage("");
    }
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="w-[600px] h-[900px] max-w-3xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl overflow-hidden relative p-8 text-white">
        <Link
          to="/dashboard"
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </Link>

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Send Notifications
        </h1>

        {/* SEND FORM */}
        <fetcher.Form
          action="/dashboard/notifications"
          method="post"
          className="space-y-4 max-w-md mx-auto mb-8"
        >
          <input type="hidden" name="intent" value="send" />

          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium">Title</label>
            <select
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 text-gray-200 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <option value="" disabled>
                Select a title
              </option>
              <option value="System Update">System Update</option>
              <option value="System Maintenance">System Maintenance</option>
              <option value="Downtime Alert">Downtime Alert</option>
              <option value="Security Notice">Security Notice</option>
              <option value="General Announcement">
                General Announcement
              </option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={250}
              placeholder="Notification Message"
              required
              rows={4}
              className="p-2 text-gray-200 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Link
              to="/dashboard"
              className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 rounded text-white font-medium text-center transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              {fetcher.state === "submitting" ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </fetcher.Form>

        {/* EXISTING NOTIFICATIONS */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <h2 className="text-2xl font-semibold mb-3 text-center">
            Existing Notifications ({notifications.length})
          </h2>
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {notifications && notifications.length > 0 ? (
              notifications.map((n: any) => (
                <div
                  key={n.id}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <div>
                    <p className="font-medium text-sm text-white">{n.title}</p>
                    <p className="text-xs text-gray-300 truncate max-w-[400px]">
                      {n.message}
                    </p>
                  </div>
                  <Form method="post" action="/dashboard/notifications">
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={n.id} />
                    <button
                      type="submit"
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </Form>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center text-sm">
                No notifications found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
