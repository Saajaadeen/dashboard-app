import { useState, useRef, useEffect } from "react";
import { BellIcon } from "../icons/BellIcon";

export default function NotificationsDropdownForm({
  items = [],
  trigger,
}: NotificationsDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!open)}>
        {trigger ?? (
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white">
            <BellIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl z-50">
          {items.length === 0 ? (
            <div className="p-4 text-center text-white text-sm">
              No new notifications
            </div>
          ) : (
            <div className="flex flex-col py-2 max-h-96 overflow-y-auto">
              {items.map((notif) => (
                <div
                  key={notif.id}
                  className="px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors rounded-lg"
                >
                  <div className="font-medium">{notif.title}</div>
                  <div className="text-xs text-gray-300 mt-1">{notif.message}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(notif.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
