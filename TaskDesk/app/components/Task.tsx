interface TaskProps {
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

export default function Task({ title, description, status, dueDate }: TaskProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="mt-2">
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
          {status}
        </span>
      </div>
      <p className="mt-2 text-gray-500">Due: {dueDate}</p>
    </div>
  );
}