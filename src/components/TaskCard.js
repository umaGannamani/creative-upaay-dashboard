import React from "react";
import { useDispatch } from "react-redux";

export default function TaskCard({ task, provided, snapshot, onEdit }) {
  const dispatch = useDispatch();

  // Delete task
  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  };

  // Change task status
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    dispatch({
      type: "MOVE_TASK",
      payload: { id: task.id, status: newStatus },
    });
  };

  // Map priority to Tailwind colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-orange-400 text-white";
      case "Low":
        return "bg-yellow-300 text-black";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-white p-3 rounded shadow mb-2 border ${
        snapshot.isDragging ? "border-blue-400" : ""
      }`}
    >
      <h3 className="font-bold text-md mb-1">{task.title}</h3>
      <p className="text-sm mb-1">{task.description}</p>
      
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">
          Category: {task.category}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-2">Due: {task.dueDate}</p>

      {/* Quick Status Dropdown */}
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="border p-1 mb-2 w-full text-sm"
      >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <div className="flex justify-between">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
