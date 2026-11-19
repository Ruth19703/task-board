
function FilterBar({
  searchTerm,
  setSearchTerm,
  priority,
  setPriority,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">

      <div className="flex flex-col md:flex-row gap-4">

        {/* Search input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Priority filter */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

      </div>

    </div>
  );
}
 export default FilterBar;
