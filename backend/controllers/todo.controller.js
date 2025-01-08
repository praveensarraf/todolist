import Todo from "../models/todo.model.js";

// Get all tasks for the authenticated user
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      tasks,
      totalTasks: tasks.length,
      message: "Tasks retrieved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create a new task for the authenticated user
export const createNewTask = async (req, res) => {
  try {
    const newTask = { ...req.body, userId: req.userId };
    const task = await Todo.create(newTask);

    res.status(201).json({
      task,
      message: "Task created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update a task for the authenticated user
export const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const task = await Todo.findOneAndUpdate(
      { _id: taskId, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        message: `Task not found or not authorized for ID: ${taskId}`,
        success: false,
      });
    }

    res.status(200).json({
      task,
      message: "Task updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete a task for the authenticated user
export const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const task = await Todo.findOneAndDelete({
      _id: taskId,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: `Task not found or not authorized for ID: ${taskId}`,
        success: false,
      });
    }

    res.status(200).json({
      task,
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
