import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    Task,
} from '../../api/todoService';
import { toast } from 'react-toastify';
import './TodoList.css';

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    // const [successMessage, setSuccessMessage] = useState<string>(''); // Was changed to toast message
    const [editMode, setEditMode] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            toast.error('Falha ao buscar tarefas!');
        }
    };

    const handleCreateTask = async () => {
        if (!newTask.trim()) return; // Evita criar se estiver vazio

        try {
            const taskCreated = await createTask({ title: newTask });
            setTasks([...tasks, taskCreated]);
            setNewTask('');
            toast.success('Task item created successfully!');
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            toast.error('Erro ao criar tarefa!');
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const response = await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
            toast.success(response.message);
        } catch (error) {
            console.error('Erro ao eliminar tarefa:', error);
            toast.error('Erro ao eliminar tarefa!');
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            const updated = await updateTask(task.id, {
                completed: !task.completed,
            });
            setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
            toast.success(updated.completed ? 'Task completed!' : 'Tarefa por fazer...');
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            toast.error('Erro ao atualizar tarefa!');
        }
    };

    const handleEditTask = (task: Task) => {
        setEditMode(true);
        setTaskToEdit(task);
        setNewTask(task.title);
    };

    const handleUpdateTask = async () => {
        if (!taskToEdit) return;
        try {
            const updated = await updateTask(taskToEdit.id, { title: newTask });
            setTasks(tasks.map((t) => (t.id === taskToEdit.id ? updated : t)));
            setEditMode(false);
            setTaskToEdit(null);
            setNewTask('');
            toast.success('Task updated successfully!');
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            toast.error('Erro ao atualizar tarefa!');
        }
    };

    return (
        <div className="todo-container">
            <h2>ToDo List <span role="img" aria-label="pencil">📝</span></h2>

            <div className="todo-input-wrapper">
                <input
                    type="text"
                    placeholder="Add your task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    className="add-btn"
                    onClick={editMode ? handleUpdateTask : handleCreateTask}
                >
                    {editMode ? <FaEdit /> : <FaPlus />}
                </button>
            </div>

            {/* {successMessage && <p className="success-message">{successMessage}</p>} */}

            <ul className="todo-list">
                {tasks.map((task) => (
                    <li key={task.id} className="todo-item">
                        <span
                            onClick={() => handleToggleComplete(task)}
                            className={task.completed ? 'completed' : ''}
                        >
                            {task.title}
                        </span>
                        <div className="btn-group">
                            <button className="edit-btn" onClick={() => handleEditTask(task)}>
                                <FaEdit />
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
