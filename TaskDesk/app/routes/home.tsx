import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskDesk - Home" },
    { name: "description", content: "Bienvenue sur TaskDesk" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur TaskDesk</h1>
        <p className="text-xl mb-8">Gérez vos tâches efficacement</p>
        <div className="space-x-4">
          <a href="/login" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Se connecter
          </a>
          <a href="/" className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition">
            Créer un compte
          </a>
        </div>
      </div>
    </div>
  );
}
