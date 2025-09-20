import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasksState.filter);

  const handleChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="p-4 bg-gray-200 flex flex-wrap gap-3 items-center">
      <input
        type="text"
        name="search"
        placeholder="Search by title..."
        value={filter.search}
        onChange={handleChange}
        className="border p-1 rounded"
      />
      <select name="category" value={filter.category} onChange={handleChange} className="border p-1 rounded">
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>
      <select name="priority" value={filter.priority} onChange={handleChange} className="border p-1 rounded">
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={filter.dueDate}
        onChange={handleChange}
        className="border p-1 rounded"
      />
    </div>
  );
}
