import { Column } from "./Column";

export const Board = ({ groupedTasks, onStatusChange, onDelete }) => {
  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => (
        <Column
          key={col}
          title={col}
          tasks={groupedTasks[col] || []}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
