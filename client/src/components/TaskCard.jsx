export const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="bg-gray-700 p-4 rounded mb-3 shadow">
      <div className="flex justify-between items-center">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="bg-gray-800 text-white rounded px-2 py-1 text-sm"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-600 text-sm"
        >
          Hapus
        </button>
      </div>
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm text-gray-300 mb-3">{task.description}</p>
    </div>
  );
};
