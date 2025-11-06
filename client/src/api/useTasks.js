import { axiosInstance } from "../lib/axios";
import { useState, useEffect } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      await axiosInstance.post("/tasks/", taskData);
      fetchTasks();
    } catch (err) {
      setError(err);
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axiosInstance.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      setError(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};