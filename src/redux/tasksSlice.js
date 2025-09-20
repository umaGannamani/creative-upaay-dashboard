const initialState = {
  tasks: [
    {
      id: 1,
      title: "Demo Task",
      description: "This is a sample task",
      status: "todo",
      category: "Work",
      priority: "High",
      dueDate: "2025-09-25",
    },
  ],
  filter: {
    search: "",
    category: "",
    priority: "",
    dueDate: "",
  },
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updatedTask } : t
        ),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, status: action.payload.status } : t
        ),
      };
    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };
    default:
      return state;
  }
};
