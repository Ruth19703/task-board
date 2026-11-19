
import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, onMove }) {
  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition">

      {/* Task title and description */}
      <Link to={`/task/${task.id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {task.title}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {task.description}
        </p>
      </Link>

      {/* Priority */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority} Priority
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-5 gap-2">

        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-sm"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm"
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TaskCard;
