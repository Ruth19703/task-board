
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import initialTasks from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import BoardPage from "./pages/BoardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ArchivePage from "./pages/ArchivePage";

function App() {
  // Global tasks state
  const [tasks, setTasks] = useLocalStorage("kanbanTasks", []);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load saved tasks or initial tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");

    if (savedTasks !== null) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
          throw new Error("Invalid task data");
        }

        setTasks(parsedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading tasks:", error);

        const timer = setTimeout(() => {
          setTasks(initialTasks);
          setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => {
        setTasks(initialTasks);
        setIsLoading(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [setTasks]);

  // Add a new task
  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      description: "No description provided.",
      status: "todo",
      priority: "Medium",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  }

  // Move a task to another column
  function moveTask(taskId, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  // Update task information
  function updateTask(taskId, updatedFields) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updatedFields }
          : task
      )
    );
  }

  // Delete a task
  function deleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">

            <Link to="/" className="text-2xl font-bold text-blue-600">
              TaskBoard
            </Link>

            <div className="flex gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Board
              </Link>

              <Link
                to="/archive"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Archive
              </Link>
            </div>

          </div>
        </nav>

        {/* Application routes */}
        <Routes>

          <Route
            path="/"
            element={
              <BoardPage
                tasks={tasks}
                isLoading={isLoading}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
              />
            }
          />

          <Route
            path="/task/:id"
            element={
              <TaskDetailPage
                tasks={tasks}
                isLoading={isLoading}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            }
          />

          <Route
            path="/archive"
            element={
              <ArchivePage tasks={tasks} />
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
