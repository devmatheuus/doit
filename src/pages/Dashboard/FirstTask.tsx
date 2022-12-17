import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { ModalCreateTask } from 'components/Modal/ModalCreateTask';
import { FaClipboard } from 'react-icons/fa';

interface FirstTaskProps {
    isTaskCreateOpen: boolean;
    onTaskCreateClose: () => void;
    onTaskCreateOpen: () => void;
}

export const FirstTask = ({
    isTaskCreateOpen,
    onTaskCreateClose,
    onTaskCreateOpen,
}: FirstTaskProps) => (
    <>
        <ModalCreateTask
            isOpen={isTaskCreateOpen}
            onClose={onTaskCreateClose}
        />
        <Header />
        <Box
            mt="4"
            w="90vw"
            paddingY="16"
            paddingX={['6', '0']}
            ml="5vw"
            justifyContent="center"
            textAlign="center"
            borderWidth="2px"
            borderColor="gray.200"
            borderStyle="dashed"
        >
            <Center fontSize="5xl">
                <FaClipboard color="#bdbdbd" />
            </Center>
            <Heading fontSize="4xl" as="h1" mt="4">
                Vamos criar sua primeira tarefa
            </Heading>
            <Text color="gray.400" mt="6">
                Insira sua meta e mostre a você mesmo sua
                <br />
                capacidade em cumprir{' '}
                <Text fontWeight="bold" display="inline-block" color="gray.900">
                    suas atividades
                </Text>
            </Text>

            <Button
                padding="6"
                mt="6"
                bgColor="purple.800"
                w={['100%', 'auto']}
                color="white"
                _hover={{ bg: 'purple.900' }}
                onClick={onTaskCreateOpen}
            >
                Criar sua primeira tarefa
            </Button>
        </Box>
    </>
);
