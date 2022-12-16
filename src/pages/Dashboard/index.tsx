import { Box, Grid, useDisclosure } from '@chakra-ui/react';
import { SearchBox } from 'components/Form/SearchBox';
import { Header } from 'components/Header';
import { Card } from 'components/Card/index';
import { useTasks } from 'contexts/TaskContext';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';

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
    const { tasks, loadTasks } = useTasks();
    const {
        isOpen: isTaskDetailOpen,
        onOpen: onTaskDetailOpen,
        onClose: onTaskDetailClose,
    } = useDisclosure();

    useEffect(() => {
        loadTasks(user.id, accessToken).then(() => setLoading(false));
    }, []);

    const handleClick = (task: Task) => {
        setSelectedTask(task);
        onTaskDetailOpen();
    };

    return (
        <>
            <ModalTaskDetail
                isOpen={isTaskDetailOpen}
                onClose={onTaskDetailClose}
                task={selectedTask}
            />
            <Box>
                <Header />
                <SearchBox />
                <Grid
                    w="100%"
                    templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
                    gap={10}
                    paddingX="8"
                    mt="8"
                >
                    {tasks.map((task) => (
                        <Card key={task.id} task={task} onClick={handleClick} />
                    ))}
                </Grid>
            </Box>
        </>
    );
};
