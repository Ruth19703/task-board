
import { useState } from "react";

import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import useTaskFilter from "../hooks/useTaskFilter";

function BoardPage({
  tasks,
  isLoading,
  addTask,
  deleteTask,
  moveTask,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("All");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTasks = useTaskFilter(
    tasks,
    searchTerm,
    priority
  );

  const columns = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

  function handleAddTask(e) {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    addTask(newTaskTitle);
    setNewTaskTitle("");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-blue-600">
          Loading your tasks...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Kanban Board
            </h1>

            <p className="text-gray-500 mt-2">
              Organize your tasks and track your progress.
            </p>
          </div>
        </div>

        {/* Add Task */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            + Add Task
          </button>
        </form>

        {/* Search and Filter */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priority={priority}
          setPriority={setPriority}
        />

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.status
            );

            return (
              <Column
                key={column.status}
                title={column.title}
                tasks={columnTasks}
                onDelete={deleteTask}
                onMove={moveTask}
              />
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default BoardPage;
