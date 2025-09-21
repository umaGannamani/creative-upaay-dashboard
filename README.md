# Creative Upaay Dashboard

A Kanban-style task management dashboard built with **React.js**, **Tailwind CSS**, **Redux**, and **Local Storage**.  
The app allows users to **add, edit, delete, move, and filter tasks** with optional drag-and-drop functionality.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [Deployment](#deployment)  
- [Notes](#notes)

---

## Features

- **Three Kanban Columns:** To Do, On Progress, Done  
- **Add Task:** Dynamic task title, description, category, priority, and due date  
- **Edit Task:** Edit all task fields including task status  
- **Delete Task:** Remove tasks from any column  
- **Move Task:** Drag-and-drop or via dropdown to move tasks between columns  
- **Filter Tasks:** Filter by search text, category, and priority  
- **State Management:** Redux for global state  
- **Persistence:** Tasks saved in Local Storage and persist on refresh  
- **Responsive Design:** Works on desktop and mobile  

---

## Tech Stack

- **Frontend:** React.js  
- **UI Library:** Tailwind CSS  
- **State Management:** Redux  
- **Persistence:** Local Storage  
- **Drag and Drop:** `react-beautiful-dnd`  

---

## Project Structure

creative-upaay-dashboard/
│
├── src/
│ ├── components/ # Reusable components (TaskCard, Navbar, FilterBar)
│ ├── pages/ # Page-level components (Dashboard.js, NotFound.js)
│ ├── redux/ # Redux store, actions, reducers
│ ├── utils/ # Helper functions
│ ├── styles/ # Tailwind index.css and global styles
│ ├── App.js
│ └── index.js
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md

---

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/umaGannamani/creative-upaay-dashboard.git
cd creative-upaay-dashboard

2.Install dependencies:

npm install


3. Start the development server:

npm start


The app will run on http://localhost:3000

---

Usage

Add Task: Click the "Add Task" button in any column. Fill out the title, description, category, priority, and due date.

Edit Task: Click the "Edit" button on a task card. Update the fields and change the task status if needed.

Delete Task: Click the "Delete" button on a task card to remove it.

Move Task: Drag-and-drop tasks between columns or use the status dropdown while editing.

Filter Tasks: Use the search box or dropdown filters to filter by category or priority.

---
Deployment

deployed this app using  Vercel.
npm run build

link: https://creative-upaay-dashboard-rouge.vercel.app/

Notes

Redux state is persisted to Local Storage automatically.

Tailwind CSS utility classes are used for styling.

Optional drag-and-drop is implemented via react-beautiful-dnd.

Ensure React version is compatible with dependencies (React 18+ recommended).
