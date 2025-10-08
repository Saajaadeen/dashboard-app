import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">
            The page you are looking for doesn’t exist.
          </p>

          <div className="flex justify-center">
            <Link
              to=".."
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
