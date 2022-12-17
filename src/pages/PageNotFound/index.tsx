import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import NotFoundImage from 'assets/notFound.svg';
import { useHistory } from 'react-router-dom';

export const PageNotFound = () => {
    const history = useHistory();

    return (
        <Flex
            padding={['10px 15px', '10px 15px', '0px', '0px']}
            justifyContent="space-evenly"
            alignItems="center"
            height={['auto', 'auto', '100vh', '100vh']}
            flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
        >
            <Box mt="4">
                <Heading>Oooops!</Heading>
                <Text mt="4">
                    Não encontramos a página que você procurou, <br />
                    <b>Vamos tentar novamente.</b>
                </Text>
                <Button
                    mt="4"
                    bg="red.600"
                    h="60px"
                    color="white"
                    w="100%"
                    _hover={{ bg: 'red.700' }}
                    onClick={() => history.push('/')}
                >
                    Ir para as minhas tarefas
                </Button>
            </Box>
            <Image src={NotFoundImage} />
        </Flex>
    );
};
