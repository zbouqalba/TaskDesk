import { Form } from "react-router";

interface CreateTaskFormProps {
    isVisible: boolean;
    onClose?: () => void;
}

export default function CreateTaskForm({ isVisible, onClose }: CreateTaskFormProps) {
  if (!isVisible) return null;

  return (
    // Overlay (fond sombre)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      {/* Modale */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Créer une tâche</h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Formulaire */}
        <Form method="post" className="space-y-4" onSubmit={() => console.log("Form submitted!")}>
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre de la tâche
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Ex: Finir le projet TaskDesk"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (optionnelle)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Décrivez votre tâche..."
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 resize-none"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Date d'échéance (optionnelle)
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
            >
              Créer la tâche
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}