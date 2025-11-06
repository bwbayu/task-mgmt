import { TaskCard } from "./TaskCard";

export const Column = ({ title, tasks, onStatusChange, onDelete }) => (
  <div className="bg-gray-800 rounded-lg p-4 min-h-[60vh]">
    <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p className="text-gray-500 text-center">No tasks</p>
    )}
  </div>
);
