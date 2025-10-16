import Task from "~/components/Task";
import type { Route } from "./+types/dashboard";
import { redirect, useLoaderData, useActionData, useNavigation } from "react-router";
import { useState, useEffect } from "react";
import { prisma } from "~/lib/prisma.server";

import CreateTaskForm from "~/components/CreateTaskForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskDesk - Dashboard" },
    { name: "description", content: "Gérez vos tâches" },
  ];
}

// Loader pour récupérer les tâches
export async function loader({ request }: Route.LoaderArgs) {
  try {
    // Récupérer toutes les tâches (temporairement)
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    console.log("Tasks loaded:", tasks.length);
    return { tasks };
  } catch (error) {
    console.error("Error loading tasks:", error);
    return { tasks: [] };
  }
}

// Action pour créer une tâche
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("dueDate") as string;

  console.log("=== Action called ===");
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Due Date:", dueDate);

  if (!title) {
    console.log("Error: Title is missing");
    return { error: "Le titre est requis" };
  }

  try {
    // Vérifier si un utilisateur existe
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("Error: No user found in database");
      return { error: "Aucun utilisateur trouvé. Veuillez créer un compte d'abord." };
    }

    console.log("Creating task for user:", user.id);

    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || null,
        completed: false,
        userId: user.id, // Utilise le premier utilisateur trouvé
      },
    });

    console.log("Task created successfully:", newTask);

    // Retourner success au lieu de rediriger
    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "Une erreur est survenue lors de la création de la tâche" };
  }
}

export default function Dashboard() {
  const { tasks } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  console.log("Dashboard rendering, tasks count:", tasks.length);

  // Fermer la modale après la soumission réussie
  useEffect(() => {
    if (actionData?.success) {
      console.log("Task created successfully, closing modal");
      setIsVisible(false);
    }
  }, [actionData]);

  function handleButton() {
    console.log("Button clicked, opening modal");
    setIsVisible(true);
  }

  function handleClose() {
    console.log("Modal closed");
    setIsVisible(false);
  }

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
          
          {/* Section des tâches */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Mes tâches ({tasks.length})
            </h3>
            
            {/* Liste des tâches */}
            <div className="space-y-3 mb-6">
              {tasks.length === 0 ? (
                <p className="text-gray-500 italic">Aucune tâche pour le moment...</p>
              ) : (
                tasks.map((task) => (
                  <Task
                    key={task.id}
                    title={task.title}
                    description={task.description || ""}
                    status={task.completed ? "completed" : "in-progress"}
                    dueDate={task.createdAt.toISOString().split("T")[0]}
                  />
                ))
              )}
            </div>
            
            <button 
              className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition" 
              onClick={handleButton}
            >
              + Créer une tâche
            </button>

            {isVisible && <CreateTaskForm isVisible={isVisible} onClose={handleClose} />}
          </div>
        </div>
      </main>
    </div>
  );
}
