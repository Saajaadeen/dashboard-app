import { Link } from "react-router";

type Card = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  url?: string;
};

type AppInfo = {
  landingDashboard?: {
    name: string;
  };
};

export default function LandingPage({ 
  cards, 
  appInfo 
}: { 
  cards: Card[];
  appInfo: AppInfo;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <header className="border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {appInfo?.landingDashboard?.name || "Dashboard"}
          </h1>
          <Link
            to="/login"
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/10 transition-all duration-200 hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Quick Access Hub
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Your favorite tools and resources, all in one place
          </p>
        </div>

        {cards && cards.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {cards.map((card) => (
              <a
                key={card.id}
                href={card.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="w-full h-full flex items-center justify-center mb-2">
                  {card.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-white/70 text-4xl font-bold">
                        {card.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                    <h3 className="text-sm font-semibold text-white text-center truncate">
                      {card.name}
                    </h3>
                  </div>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-xs">↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <p className="text-gray-400 text-lg">
              No cards available at the moment
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>Powered by Dashboard · Quick access to everything you need</p>
        </div>
      </footer>
    </div>
  );
}