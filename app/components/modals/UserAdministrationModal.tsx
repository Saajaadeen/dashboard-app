import { useState, useEffect } from "react";
import { Link } from "react-router";
import { XMarkIcon } from "../icons/XMarkIcon";

type AdminTab = "login";

interface UserAdministrationModalProps {
  loginInfo: {
    loginName?: string | null;
    loginImgUrl?: string | null;
  };
}

export default function UserAdministrationModal({ loginInfo }: UserAdministrationModalProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("login");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="w-[950px] h-[550px] max-w-5xl flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <aside className="w-1/4 bg-white/10 p-6 flex flex-col gap-4 border-r border-white/20">
          <h2 className="text-lg font-semibold text-white mb-4">Admin Menu</h2>
          <button
            className={`text-left p-2 rounded-lg w-full ${
              activeTab === "login"
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login Page
          </button>
        </aside>

        <div className="flex-1 p-8 relative text-white overflow-y-auto">
          <Link
            to="/dashboard"
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </Link>

          <h1 className="text-2xl font-semibold mb-6 text-center">
            {activeTab === "login" && "Login Page Settings"}
          </h1>

          {activeTab === "login" && (
            <form action="/dashboard/administration" method="post" className="space-y-4 max-w-2xl mx-auto">
              <div className="flex flex-col">
                <label htmlFor="loginName" className="text-sm mb-1 font-medium">
                  Login Title
                </label>
                <input
                  type="text"
                  id="loginName"
                  name="loginName"
                  placeholder={loginInfo?.loginName ?? ""}
                  className="p-2 text-white bg-white/10 rounded border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>

              <div className="flex flex-col">
                <label htmlFor="loginImgUrl" className="text-sm mb-1 font-medium">
                  Login Image URL
                </label>
                <input
                  type="url"
                  id="loginImgUrl"
                  name="loginImgUrl"
                  placeholder={loginInfo?.loginImgUrl ?? ""}
                  className="p-2 text-white bg-white/10 rounded border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
