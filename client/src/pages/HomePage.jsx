import { useState } from "react";
import { TaskModal } from "../components/TaskModal";
import { Board } from "../components/Board";
import { useTasks } from "../api/useTasks";

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { tasks, addTask, updateTask, deleteTask, loading, error } = useTasks();

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 text-white p-10">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Tambah Tugas
        </button>
      </div>

      {loading && <p className="text-center text-gray-400">Loading tasks...</p>}
      {error && <p className="text-center text-red-500">Error loading tasks</p>}

      <Board groupedTasks={tasks} onStatusChange={updateTask} onDelete={deleteTask} />

      {isOpen && <TaskModal setIsOpen={setIsOpen} onSubmit={addTask} />}
    </div>
  );
};
