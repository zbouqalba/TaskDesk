import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskDesk - Dashboard" },
    { name: "description", content: "Gérez vos tâches" },
  ];
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <a
            href="/login"
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Déconnexion
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bienvenue sur TaskDesk! 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Vous êtes maintenant connecté. Voici votre espace de gestion de tâches.
          </p>
          
          {/* Section des tâches - à implémenter */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Mes tâches</h3>
            <p className="text-gray-500 italic">Aucune tâche pour le moment...</p>
            
            <button className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              + Créer une tâche
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
