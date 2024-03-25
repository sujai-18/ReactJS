import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Signout from '../Auth/signout';

function Dashboard(props) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Fetch tasks for the logged-in user
        const fetchTasks = async () => {
            const user = auth.currentUser;
            if (user) {
                const userTasksRef = collection(db, 'users', user.uid, 'tasks');
                const querySnapshot = await getDocs(userTasksRef);
                const taskList = [];
                querySnapshot.forEach((doc) => {
                    taskList.push({ id: doc.id, ...doc.data() });
                });
                setTasks(taskList);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        const user = auth.currentUser;
        if (user) {
            const userTasksRef = collection(db, 'users', user.uid, 'tasks');
            const newTaskData = {
                task: newTask,
                completed: false
            };
            const docRef = await addDoc(userTasksRef, newTaskData);
            setTasks([...tasks, { id: docRef.id, ...newTaskData }]);
            setNewTask('');
        }
    };

    const handleDeleteTask = async (taskId) => {
        const user = auth.currentUser;
        if (user) {
            await deleteDoc(doc(db, 'users', user.uid, 'tasks', taskId));
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    const handleToggleComplete = async (taskId, completed) => {
        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, 'users', user.uid, 'tasks', taskId), {
                completed: !completed
            });
            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, completed: !completed } : task
            ));
        }
    };

    return (
        <>
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Todo List</h2>
        <input 
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} 
        />
        <button 
            onClick={handleAddTask} 
            style={{ 
            padding: '8px 12px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '3px', 
            cursor: 'pointer' 
            }}
        >
            Add Task
        </button>
        <ul>
            {tasks.map(task => (
            <li key={task.id} style={{ listStyleType: 'none' }}>
                <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => handleToggleComplete(task.id, task.completed)} 
                />
                <span>{task.task}</span>
                <button 
                onClick={() => handleDeleteTask(task.id)} 
                style={{ 
                    marginLeft: '10px', 
                    padding: '5px 8px', 
                    backgroundColor: '#dc3545', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '3px', 
                    cursor: 'pointer' 
                }}
                >
                Delete
                </button>
            </li>
            ))}
        </ul>
        </div>
        <Signout />
        </>
    );
}

export default Dashboard;
