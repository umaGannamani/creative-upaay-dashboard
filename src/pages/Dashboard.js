import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";

export default function Dashboard() {
  const { tasks, filter } = useSelector((state) => state.tasksState);
  const dispatch = useDispatch();

  const statuses = ["todo", "inprogress", "done"];

  const emptyTask = {
    title: "",
    description: "",
    category: "Work",
    priority: "Medium",
    dueDate: new Date().toISOString().split("T")[0],
    status: "todo",
  };

  const [taskForm, setTaskForm] = useState(emptyTask);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const openAddForm = () => {
    setTaskForm(emptyTask);
    setEditTaskId(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setTaskForm({ ...task });
    setEditTaskId(task.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!taskForm.title) return;

    if (editTaskId) {
      dispatch({
        type: "EDIT_TASK",
        payload: { id: editTaskId, updatedTask: taskForm },
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: { ...taskForm, id: Date.now() },
      });
    }

    setTaskForm(emptyTask);
    setEditTaskId(null);
    setShowForm(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      const taskId = parseInt(draggableId);
      dispatch({
        type: "MOVE_TASK",
        payload: { id: taskId, status: destination.droppableId },
      });
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const searchText = String(filter.search || "");
    const searchMatch = searchText
      ? t.title.toLowerCase().includes(searchText.toLowerCase())
      : true;
    const categoryMatch = filter.category ? t.category === filter.category : true;
    const priorityMatch = filter.priority ? t.priority === filter.priority : true;
    const dueDateMatch = filter.dueDate ? t.dueDate === filter.dueDate : true;
    return searchMatch && categoryMatch && priorityMatch && dueDateMatch;
  });

  // 🎨 Column colors like screenshot
  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "text-blue-600";
      case "inprogress":
        return "text-yellow-600";
      case "done":
        return "text-green-600";
      default:
        return "text-gray-700";
    }
  };

  // Count tasks per section
  const getTaskCount = (status) =>
    filteredTasks.filter((t) => t.status === status).length;

  return (
    <div>
      {/* 🔹 Filters (left) + Total count (right) */}
      <div className="flex justify-between items-center px-4 py-2">
        <FilterBar />
        <span className="text-sm font-semibold text-gray-600">
          Total Tasks: {filteredTasks.length}
        </span>
      </div>

      <div className="flex justify-end p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openAddForm}
        >
          + Add Task
        </button>
      </div>

      {/* Universal Task Form */}
      {showForm && (
        <div className="p-4 bg-gray-100 m-4 rounded shadow">
          <h2 className="font-bold mb-2">
            {editTaskId ? "Edit Task" : "Add Task"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            className="border p-1 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={taskForm.description}
            onChange={(e) =>
              setTaskForm({ ...taskForm, description: e.target.value })
            }
            className="border p-1 mb-2 w-full"
          />
          <select
            value={taskForm.category}
            onChange={(e) =>
              setTaskForm({ ...taskForm, category: e.target.value })
            }
            className="border p-1 mb-2 w-full"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
          <select
            value={taskForm.priority}
            onChange={(e) =>
              setTaskForm({ ...taskForm, priority: e.target.value })
            }
            className="border p-1 mb-2 w-full"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={taskForm.dueDate}
            onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
            className="border p-1 mb-2 w-full"
          />
          <select
            value={taskForm.status}
            onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
            className="border p-1 mb-2 w-full"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-3 py-1 rounded w-full"
          >
            {editTaskId ? "Update Task" : "Add Task"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="bg-gray-400 text-white px-3 py-1 rounded w-full mt-2"
          >
            Cancel
          </button>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 p-4 rounded-lg min-h-[400px] shadow-sm"
                >
                  {/* Heading + Count */}
                  <div className="flex items-center gap-2 mb-3">
                    <h2
                      className={`text-lg font-bold capitalize ${getStatusColor(
                        status
                      )}`}
                    >
                      {status === "todo" && "To Do"}
                      {status === "inprogress" && "In Progress"}
                      {status === "done" && "Done"}
                    </h2>
                    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {getTaskCount(status)}
                    </span>
                  </div>

                  {filteredTasks
                    .filter((t) => t.status === status)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id.toString()}
                        index={index}
                        key={task.id}
                      >
                        {(provided, snapshot) => (
                          <TaskCard
                            task={task}
                            provided={provided}
                            snapshot={snapshot}
                            onEdit={openEditForm}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
