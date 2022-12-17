import { useDisclosure } from '@chakra-ui/react';
import { useTasks } from 'contexts/TaskContext';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';
import { TaskList } from './TaskList';
import { FirstTask } from './FirstTask';
import { NotFoundTask } from './NotFound';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

    const { user, accessToken } = useAuth();
    const { tasks, loadTasks, notFound, taskNotFound } = useTasks();

    const {
        isOpen: isTaskDetailOpen,
        onOpen: onTaskDetailOpen,
        onClose: onTaskDetailClose,
    } = useDisclosure();

    const {
        isOpen: isTaskCreateOpen,
        onOpen: onTaskCreateOpen,
        onClose: onTaskCreateClose,
    } = useDisclosure();

    useEffect(() => {
        loadTasks(user.id, accessToken).then(() => setLoading(false));
    });

    const handleClick = (task: Task) => {
        setSelectedTask(task);
        onTaskDetailOpen();
    };

    return (
        <>
            {notFound ? (
                <NotFoundTask taskNotFound={taskNotFound} />
            ) : (
                <>
                    <ModalTaskDetail
                        isOpen={isTaskDetailOpen}
                        onClose={onTaskDetailClose}
                        task={selectedTask}
                    />
                    {!loading && !tasks.length ? (
                        <FirstTask
                            isTaskCreateOpen={isTaskCreateOpen}
                            onTaskCreateClose={onTaskCreateClose}
                            onTaskCreateOpen={onTaskCreateOpen}
                        />
                    ) : (
                        <TaskList
                            handleClick={handleClick}
                            loading={loading}
                            tasks={tasks}
                        />
                    )}
                </>
            )}
        </>
    );
};
