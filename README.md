# To-Do List Application (MERN Stack + ShadCN-UI + Tailwind CSS)

This is a full-stack To-Do List application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), styled with **Tailwind CSS**, and featuring **ShadCN-UI** components. The application supports user authentication and allows users to perform **CRUD** (Create, Read, Update, Delete) operations on tasks, ensuring that each user can only see and manage their own tasks.

## Deployment Link

[To-Do List App](<Link>)

## Features

- **Authentication**:
  - **Sign Up**: Users can register for an account.
  - **Login**: Existing users can log in securely.
  - **Logout**: Users can log out of the application.
  - **Session Management**: Tasks are only visible to the logged-in user.
  
- **Task Management**:
  - **Add Tasks**: Allows users to add new tasks.
  - **View Tasks**: Displays a list of tasks specific to the logged-in user.
  - **Edit Tasks**: Allows users to edit existing tasks.
  - **Delete Tasks**: Enables users to delete tasks.
  - **Toggle Completion Status**: Users can mark tasks as completed or pending.
  
- **UI/UX Features**:
  - Responsive and visually appealing design using Tailwind CSS.
  - Notifications and toast messages via **Sonner**.
  - Smooth navigation between pages with React Router.

## Tech Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ShadCN-UI**: Customizable UI components for React and Tailwind.
- **React Router**: For navigation between pages.
- **Redux**: For state management.
- **Axios**: For API requests.
- **Sonner**: For toast notifications.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data and tasks.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Token)**: For secure user authentication.

### Deployment
- **Frontend**: Hosted on Render.
- **Backend**: Hosted on Render with MongoDB Atlas for database management.

## Screenshots

All screenshots can be viewed in the [screenshots folder](./screenshots/).

## Installation

Follow these steps to set up the application locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/praveensarraf/todolist.git
   cd todolist
```