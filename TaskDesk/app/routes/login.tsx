import { Form, useActionData } from "react-router";
import type { Route } from "./+types/login";
import { prisma } from "~/lib/prisma.server";
import { redirect } from "react-router";
import Dashboard from "./dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskDesk - Connexion" },
    { name: "description", content: "Connectez-vous à votre compte TaskDesk" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return { error: "Tous les champs sont requis" };
  }

  try {
    // Chercher l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return { error: "Email ou mot de passe incorrect" };
    }

    // TODO: Dans une vraie app, comparer avec bcrypt
    // Pour l'instant, on compare directement (NON SÉCURISÉ en production!)
    if (user.password !== password) {
      return { error: "Email ou mot de passe incorrect" };
    }

    // Authentification réussie
    // TODO: Créer une session ici (cookies, JWT, etc.)
    console.log("Login successful for user:", user.username);
    
    // Rediriger vers le dashboard ou page d'accueil
    return <Dashboard />;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Une erreur est survenue lors de la connexion" };
  }
}

export default function Login() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        {/* Card principale */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Bienvenue!</h1>
            <p className="text-gray-500">Connectez-vous à votre compte TaskDesk</p>
          </div>

          {/* Message d'erreur */}
          {actionData?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {actionData.error}
            </div>
          )}

          {/* Formulaire */}
          <Form method="post" className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">
                Mot de passe oublié?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </Form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte?{" "}
              <a href="/" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                Créer un compte
              </a>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-sm text-white/80">
          © 2025 TaskDesk. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
