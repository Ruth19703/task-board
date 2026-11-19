
import TaskCard from "./TaskCard";

function Column({ title, tasks, onDelete, onMove }) {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 min-h-[400px]">

      {/* Column heading */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-gray-800">
          {title}
        </h2>

        <span className="bg-white text-gray-600 text-sm font-semibold px-3 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task cards */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-8">
            No tasks available
          </p>
        )}
      </div>

    </div>
  );
}

export default Column;
