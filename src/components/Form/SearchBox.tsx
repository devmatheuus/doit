import { Flex, Center, Button, useDisclosure } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { theme } from 'styles/theme';
import { Input } from './Input';
import { ModalCreateTask } from '../Modal/ModalCreateTask';

export const SearchBox = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            <ModalCreateTask isOpen={isOpen} onClose={onClose} />
            <Flex
                mt="6"
                w="100%"
                paddingX={['4', '8']}
                paddingY="2"
                paddingBottom="6"
                borderBottomWidth="1px"
                borderBottomColor="gray.50"
                flexDir={['column', 'column', 'row', 'row']}
            >
                <Flex as="form">
                    <Input
                        name="title"
                        placeholder="Pesquisar por tarefa"
                        w={['100%', '100%', '35vw']}
                    />
                    <Center
                        borderRadius="8px"
                        as="button"
                        ml="2"
                        w="65px"
                        h="60px"
                        fontSize="2xl"
                        bg="purple.600"
                    >
                        <FaSearch color={theme.colors.white} />
                    </Center>
                </Flex>
                <Button
                    bg="purple.500"
                    color="white"
                    paddingX="16px"
                    ml={['0', '0', '4']}
                    h="60px"
                    mt={['4', '4', '0']}
                    onClick={onOpen}
                    borderRadius="8px"
                    _hover={{ bg: 'purple.600' }}
                >
                    Adicionar uma nova tarefa
                </Button>
            </Flex>
        </>
    );
};
