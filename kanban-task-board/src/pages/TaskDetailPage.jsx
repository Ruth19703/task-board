
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetailPage({
  tasks,
  isLoading,
  updateTask,
  deleteTask,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the selected task
  const task = tasks.find(
    (item) => item.id === Number(id)
  );

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("Medium");

  // Load task information into the form
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  // Display loading message
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-blue-600">
          Loading task...
        </p>
      </div>
    );
  }

  // Handle missing task
  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Task not found
        </h2>

        <p className="text-gray-500 mt-2">
          The task you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Back to Board
        </button>
      </div>
    );
  }

  // Save edited task
  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    updateTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });

    navigate("/");
  }

  // Delete selected task
  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      deleteTask(task.id);
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline mb-6"
          >
            ← Back to Board
          </button>

          {/* Page heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Task
          </h1>

          <p className="text-gray-500 mb-8">
            Update your task information below.
          </p>

          {/* Edit form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Task title */}
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-gray-700 mb-2"
              >
                Task Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-700 mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your task..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block font-medium text-gray-700 mb-2"
              >
                Task Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block font-medium text-gray-700 mb-2"
              >
                Task Priority
              </label>

              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-lg transition"
              >
                Delete Task
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
