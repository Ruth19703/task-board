
import { Link } from "react-router-dom";

function ArchivePage({ tasks }) {
  const archivedTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Archived Tasks
            </h1>

            <p className="text-gray-500 mt-2">
              Your completed tasks are collected here.
            </p>
          </div>

          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Back to Board
          </Link>

        </div>

        <div className="space-y-4">

          {archivedTasks.length > 0 ? (
            archivedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {task.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {task.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-start sm:items-end">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Completed
                    </span>

                    <span className="text-xs text-gray-400">
                      Priority: {task.priority}
                    </span>

                    <Link
                      to={`/task/${task.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </Link>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border rounded-xl p-10 text-center">
              <p className="text-gray-500">
                No completed tasks yet.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ArchivePage;
