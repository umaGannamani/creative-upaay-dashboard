import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";

export default function Dashboard() {
  // Demo task only
  const demoTask = {
    id: 1,
    title: "Demo Task",
    description: "This is a demo task for presentation",
    category: "Work",
    priority: "Medium",
    dueDate: new Date().toISOString().split("T")[0],
    status: "todo",
  };

  const [tasks] = useState([demoTask]); // Only one task
  const [showForm, setShowForm] = useState(false);

  const statuses = ["todo", "onprogress", "done"];

  const filteredTasks = tasks; // No filter for demo

  // Column colors
  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "text-blue-600";
      case "onprogress":
        return "text-yellow-600";
      case "done":
        return "text-green-600";
      default:
        return "text-gray-700";
    }
  };

  const getTaskCount = (status) =>
    filteredTasks.filter((t) => t.status === status).length;

  const onDragEnd = () => {}; // No drag functionality for demo

  return (
    <div>
      {/* Filter + Total Count */}
      <div className="flex justify-between items-center px-4 py-2">
        <FilterBar />
        <span className="text-sm font-semibold text-gray-600">
          Total Tasks: {filteredTasks.length}
        </span>
      </div>

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
                      {status === "onprogress" && "On Progress"}
                      {status === "done" && "Done"}
                    </h2>
                    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {getTaskCount(status)}
                    </span>
                  </div>

                  {/* Only render the demo task if status matches */}
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
                            onEdit={() => {}}
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
