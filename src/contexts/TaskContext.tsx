import { AxiosResponse } from 'axios';
import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useCallback,
} from 'react';
import { api } from 'services/api';

interface TaskProviderProps {
    children: ReactNode;
}

interface Task {
    id: string;
    title: string;
    description: string;
    userId: string;
    completed: boolean;
}

interface TaskContextData {
    tasks: Task[];
    createTask: (data: Omit<Task, 'id'>, accessToken: string) => Promise<void>;
    loadTasks: (userId: string, accessToken: string) => Promise<void>;
    deleteTask: (taskId: string, accessToken: string) => Promise<void>;
    updateTask: (
        taskId: string,
        userId: string,
        accessToken: string
    ) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = useCallback(
        async (userId: string, accessToken: string) => {
            try {
                const response = await api.get(`tasks?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setTasks(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    const createTask = useCallback(
        async (data: Omit<Task, 'id'>, accessToken: string) => {
            await api
                .post('/tasks', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response: AxiosResponse<Task>) =>
                    setTasks((oldTasks) => [...oldTasks, response.data])
                )
                .catch((err) => console.log(err));
        },
        []
    );

    const deleteTask = useCallback(
        async (taskId: string, accessToken: string) => {
            await api
                .delete(`/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then(() => {
                    const filteredTasks = tasks.filter(
                        (task) => task.id !== taskId
                    );

                    setTasks(filteredTasks);
                })
                .catch((err) => console.log(err));
        },
        [tasks]
    );

    const updateTask = useCallback(
        async (taskId: string, userId: string, accessToken: string) => {
            await api
                .patch(
                    `/tasks/${taskId}`,
                    { completed: true, userId },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                .then(() => {
                    const filteredTasks = tasks.filter(
                        (task) => task.id !== taskId
                    );
                    const task = tasks.find((task) => task.id === taskId);

                    if (task) {
                        task.completed = true;
                        setTasks([...filteredTasks, task]);
                    }
                })
                .catch((err) => console.log(err));
        },
        [tasks]
    );

    return (
        <TaskContext.Provider
            value={{ tasks, createTask, loadTasks, deleteTask, updateTask }}
        >
            {children}
        </TaskContext.Provider>
    );
};