import {
    Box,
    Center,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Progress,
    Text,
} from '@chakra-ui/react';
import { FaCheck, FaCube, FaTimes, FaTrash } from 'react-icons/fa';
import { theme } from 'styles/theme';
import { HStack, Flex } from '@chakra-ui/react';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface ModalTaskDetailProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
}

export const ModalTaskDetail = ({
    isOpen,
    onClose,
    task,
}: ModalTaskDetailProps) => {
    const { updateTask, deleteTask } = useTasks();
    const { accessToken, user } = useAuth();

    const handleDelete = () => {
        deleteTask(task.id, accessToken);
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent padding="2" color="gray.800">
                    <ModalHeader display="flex" justifyContent="space-between">
                        <Flex>
                            <Center
                                bg="purple.500"
                                boxSize="30px"
                                borderRadius="5px"
                                mr="1"
                            >
                                <FaCube color={theme.colors.white} />
                            </Center>
                            <Text fontWeight="bold" ml="2">
                                Visualizar
                            </Text>
                        </Flex>
                        <HStack spacing="2">
                            <Center
                                as="button"
                                boxSize="30px"
                                borderWidth="1px"
                                borderRadius="5px"
                                borderColor="gray.200"
                                bg="white"
                                onClick={() =>
                                    updateTask(task.id, user.id, accessToken)
                                }
                            >
                                <FaCheck color={theme.colors.gray['300']} />
                            </Center>

                            <Center
                                as="button"
                                boxSize="30px"
                                borderWidth="1px"
                                borderRadius="5px"
                                borderColor="gray.200"
                                bg="white"
                                onClick={handleDelete}
                            >
                                <FaTrash color={theme.colors.gray['300']} />
                            </Center>

                            <Center
                                onClick={onClose}
                                as="button"
                                ml="auto"
                                boxSize="32px"
                                bg="red.600"
                                fontSize="lg"
                                borderRadius="md"
                            >
                                <FaTimes color={theme.colors.white} />
                            </Center>
                        </HStack>
                    </ModalHeader>

                    <ModalBody>
                        <Heading as="h1" fontSize="2xl">
                            {task.title}
                        </Heading>

                        <Text color="gray.400">{task.description}</Text>
                    </ModalBody>
                    <Box padding="6">
                        <Progress
                            colorScheme="purple"
                            value={task.completed ? 100 : 10}
                        />
                        <Text color="gray.200" mt="3">
                            07 March 2022
                        </Text>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
