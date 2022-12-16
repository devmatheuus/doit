import {
    Button,
    Center,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Input } from 'components/Form/Input';
import { FaTimes } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';

import { theme } from 'styles/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextArea } from 'components/Form/TextArea';
import { useAuth } from 'contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';

interface ModalCreateTaskProps {
    isOpen: boolean;
    onClose: () => void;
}

const createTaskSchema = yup.object().shape({
    title: yup.string().required('Campo obrigatório'),
    description: yup
        .string()
        .required('Campo obrigatório')
        .max(100, 'Máximo de 100 caracteres'),
});

interface CreateTask {
    title: string;
    description: string;
}

export const ModalCreateTask = ({ isOpen, onClose }: ModalCreateTaskProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateTask>({ resolver: yupResolver(createTaskSchema) });

    const { user, accessToken } = useAuth();
    const { createTask } = useTasks();

    const handleCreateTask = (data: CreateTask) => {
        const newData = { ...data, userId: user.id, completed: false };

        console.log(newData);

        createTask(newData, accessToken).then(() => onClose());
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    as="form"
                    onSubmit={handleSubmit(handleCreateTask)}
                    padding="2"
                    color="gray.800"
                >
                    <ModalHeader display="flex">
                        <Center
                            bg="purple.500"
                            boxSize="30px"
                            borderRadius="5px"
                            mr="1"
                        >
                            <CgNotes color={theme.colors.white} />
                        </Center>
                        <Text fontWeight="bold" ml="2">
                            Adicionar
                        </Text>
                        <Center
                            onClick={onClose}
                            ml="auto"
                            boxSize="32px"
                            bg="red.600"
                            fontSize="lg"
                            borderRadius="md"
                        >
                            <FaTimes color={theme.colors.white} />
                        </Center>
                    </ModalHeader>

                    <ModalBody textAlign="center">
                        <VStack spacing="5">
                            <Input
                                label="Título"
                                error={errors.title}
                                {...register('title')}
                                placeholder="Digite o título"
                            />
                            <TextArea
                                label="Descrição"
                                error={errors.description}
                                {...register('description')}
                                placeholder="Digite a descrição"
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter flexDirection="column">
                        <Button
                            type="submit"
                            bg="purple.500"
                            color="white"
                            w="100%"
                            h="60px"
                            // onClick={onOpen}
                            _hover={{ bg: 'purple.600' }}
                        >
                            Adicionar tarefa
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
