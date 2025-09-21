import React from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";

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

  // Map priority to Tailwind styles
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600 border border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-200 text-gray-700 border border-gray-300";
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-gray-50 p-4 rounded-lg shadow mb-3 border transition-transform transform 
        hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 
        ${snapshot.isDragging ? "border-blue-400" : "border-gray-200"}`}
    >
      {/* Priority Badge */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityStyles(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-gray-500">{task.category}</span>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>

      {/* Due Date */}
      <p className="text-xs text-gray-500 mb-3">Created {task.dueDate}</p>

      {/* Quick Status Dropdown */}
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="border p-1 mb-3 w-full text-sm rounded"
      >
        <option value="todo">To Do</option>
        <option value="onprogress">On Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm transition-colors"
        >
          <FaEdit /> 
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm transition-colors"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
