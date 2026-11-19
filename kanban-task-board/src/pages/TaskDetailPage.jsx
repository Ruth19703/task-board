
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(
    (item) => item.id === Number(id)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Task not found
        </h2>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to Board
        </button>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateTask(task.id, {
      title,
      description,
      status,
      priority,
    });

    navigate("/");
  }

  function handleDelete() {
    deleteTask(task.id);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8">

        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline mb-6"
        >
          ← Back to Board
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-lg"
            >
              Delete Task
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetailPage;
