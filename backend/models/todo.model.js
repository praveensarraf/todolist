import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Please enter a task name'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ToDo = mongoose.model('Tasks', toDoSchema);

export default ToDo;
