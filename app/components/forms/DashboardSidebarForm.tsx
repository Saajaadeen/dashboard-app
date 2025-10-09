import { Link, useSearchParams } from "react-router";
import { useEffect, useRef } from "react";
import { LockIcon } from "../icons/LockIcon";
import { EyeOpenIcon } from "../icons/EyeOpenIcon";
import { GlobeIcon } from "../icons/GlobeIcon";
import { RocketIcon } from "../icons/RocketIcon";

type Dashboard = {
  id: string;
  name: string;
  description?: string;
  visibility: string[];
  permissions: string[];
  createdAt: Date;
};

export default function DashboardSidebarForm({ 
  user,
  privateBoard, 
  publicBoard, 
  globalBoard, 
  landingBoard }: 
    { privateBoard: Dashboard[], 
      publicBoard: Dashboard[], 
      globalBoard: Dashboard[], 
      landingBoard: Dashboard[] 
    }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasInitialized = useRef(false);
  
  const sortedDashboards = [...privateBoard, ...publicBoard, ...globalBoard, ...landingBoard].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const groupedDashboards: Record<string, Dashboard[]> = {
    PRIVATE: [],
    GLOBAL: [],
    PUBLIC: [],
    LANDING: [],
  };

  sortedDashboards.forEach((d) => {
    const vis = d.visibility[0] || "PUBLIC";
    if (groupedDashboards[vis]) {
      groupedDashboards[vis].push(d);
    }
  });

  useEffect(() => {
    if (!hasInitialized.current && sortedDashboards.length > 0) {
      const currentPanel = searchParams.get("panel");
      if (!currentPanel) {
        setSearchParams({ panel: sortedDashboards[0].id });
      }
      hasInitialized.current = true;
    }
  }, []);

  const handleDashboardClick = (dashboardId: string) => {
    setSearchParams({ panel: dashboardId });
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "PRIVATE":
        return (
          <LockIcon className="w-6 h-6" />
        );
      case "PUBLIC":
        return (
          <EyeOpenIcon className="w-6 h-6" />
        );
      case "GLOBAL":
        return (
          <GlobeIcon className="w-6 h-6" />
        );
      case "LANDING":
        return (
          <RocketIcon className="w-6 h-6" />
        );
      default:
        return null;
    }
  };

  const renderGroup = (title: string, dashboards: Dashboard[]) => (
    <div key={title} className="mb-6">
      <h3 className="text-white/60 font-medium text-xs uppercase tracking-wide mb-3">
        {title}
      </h3>
      {dashboards.length === 0 ? (
        <p className="text-white/30 text-xs italic pl-3">No dashboards</p>
      ) : (
        <div className="space-y-1">
          {dashboards.map((d) => {
            const visibility = d.visibility[0] || "PUBLIC";
            return (
              <div
                key={d.id}
                className="group relative flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <button
                  onClick={() => handleDashboardClick(d.id)}
                  className="flex-1 min-w-0 text-left flex items-center gap-2"
                >
                  <span className="text-white/60 flex-shrink-0">
                    {getVisibilityIcon(visibility)}
                  </span>
                  <p className="font-medium text-white text-sm truncate">
                    {d.name}
                  </p>
                </button>
                <Link
                  to={`/dashboard/${d.id}/edit`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/60 hover:text-white ml-2 flex-shrink-0"
                  aria-label="Edit dashboard"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-[400px] h-[1000px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Dashboards</h2>
      </div>
      <Link
        to="/dashboard/create"
        className="mb-6 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 text-center border border-white/10 hover:border-white/20"
      >
        + New Dashboard
      </Link>
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-2">
        {renderGroup("Private", groupedDashboards.PRIVATE)}
        {renderGroup("Global", groupedDashboards.GLOBAL)}
        {renderGroup("Public", groupedDashboards.PUBLIC)}
        {user?.isAdmin && (renderGroup("Landing", groupedDashboards.LANDING))}
      </div>
    </aside>
  );
}