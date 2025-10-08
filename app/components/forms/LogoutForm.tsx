import { Form, Link } from "react-router";

export default function LogoutForm() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Confirm Logout
          </h1>
          <p className="text-gray-400 mb-6">
            Are you sure you want to log out of your account?
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Form action="/logout" method="post" className="w-full">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Yes, Log Out
              </button>
            </Form>

            <Link
              to="/dashboard" 
              className="w-full inline-block bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
