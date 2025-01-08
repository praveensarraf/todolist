import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TODOS_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../redux/tasksSlice";
import Navbar from './../shared/Navbar';
import Footer from "../shared/Footer";

const EditTask = () => {
    const { id } = useParams();
    const { user } = useSelector((store) => store.auth);
    const { tasks } = useSelector((store) => store.tasks);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update the task
    const updateTask = async (e) => {
        e.preventDefault();

        if (!task.trim()) {
            toast.error("Task name cannot be empty!");
            return;
        }

        if (task.length > 50) {
            toast.error("Task cannot exceed 50 characters!");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await axios.put(`${TODOS_API_END_POINT}/${id}`, { task, completed }, { withCredentials: true });

            if (res.data.success) {
                const updatedTasks = tasks.map((t) => t._id === id ? res.data.task : t);

                dispatch(setTasks(updatedTasks));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update task");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            if (!user) {
                navigate("/");
                return;
            };
            setLoading(true);

            try {
                const res = await axios.get(TODOS_API_END_POINT, { withCredentials: true });

                const taskToEdit = tasks.find((task) => task._id === id);
                if (taskToEdit) {
                    setTask(taskToEdit.task);
                    setCompleted(taskToEdit.completed);
                } else{
                    navigate("/");
                }

                dispatch(setTasks(res.data.tasks));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [id, user]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-900 py-10 px-1">
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-slate-400 shadow-md">
                    <Button onClick={() => navigate(-1)} variant='outline' className='bg-gray-50 px-2'><ArrowLeft />Back</Button>
                    <h1 className="text-2xl text-center font-bold my-2">Edit Task</h1>
                    {
                        loading ? (
                            <p className="text-center">Loading task details...</p>
                        ) : (
                            <form onSubmit={updateTask} className="space-y-4">
                                <div>
                                    <Label htmlFor="taskInput" className="block text-base font-medium mb-1 pl-1">
                                        Task
                                    </Label>
                                    <Input
                                        id="taskInput"
                                        type="text"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                        className="py-6 font-medium border-gray-400 focus-visible:ring-2 focus-visible:ring-blue-700"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="completedCheckbox"
                                        type="checkbox"
                                        checked={completed}
                                        onChange={() => setCompleted(!completed)}
                                        className="mr-2 mt-1"
                                    />
                                    <label htmlFor="completedCheckbox" className="text-base">
                                        Completed
                                    </label>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                                        }`}
                                >
                                    {isSubmitting ? "Updating..." : "Update Task"}
                                </Button>
                            </form>
                        )
                    }
                </div>
            </div>

            <Footer />

        </>
    );
};

export default EditTask;