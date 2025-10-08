import { Outlet } from "react-router";
import DashboardNavbarForm from "./DashboardNavbarForm";
import DashboardSidebarForm from "./DashboardSidebarForm";
import DashboardDisplayForm from "./DashboardDisplayForm";

export default function DashboardForm({ user, notifications, userDashboards, cards, selectedDashboard }) {
  return (
    <div className="p-5 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <header>
        <DashboardNavbarForm
          notifications={notifications} 
          user={user}
        />
      </header>

      <div className="flex gap-6">
        <aside className="pt-5">
          <DashboardSidebarForm userDashboards={userDashboards}/>
        </aside>

        <main className="pt-5 w-full">
          <DashboardDisplayForm 
            cards={cards}
            selectedDashboard={selectedDashboard}/>
        </main>
      </div>

      <Outlet />
    </div>
  );
}
