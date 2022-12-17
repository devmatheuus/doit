import { Box, Center, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { SearchBox } from 'components/Form/SearchBox';
import { Header } from 'components/Header';

interface NotFoundTaskProps {
    taskNotFound: string;
}

export const NotFoundTask = ({ taskNotFound }: NotFoundTaskProps) => (
    <>
        <Box>
            <Header />
            <SearchBox />
            <Center mt="4" textAlign="center" display="flex" flexDir="column">
                <Heading size="lg" as="h1">
                    Não encontramos resultados para:
                </Heading>
                <Text fontSize="xl" color="gray.300" fontWeight="bold">
                    {taskNotFound}
                </Text>
                <Box
                    mt="6"
                    w={['80%', '40%']}
                    padding="6"
                    boxShadow="base"
                    bg="white"
                >
                    <Stack>
                        <Skeleton
                            startColor="gray.100"
                            endColor="gray.200"
                            h="20px"
                            borderRadius="20px"
                            w="80%"
                        />
                        <Skeleton
                            startColor="gray.100"
                            endColor="gray.200"
                            h="20px"
                            borderRadius="20px"
                            w="60%"
                        />
                    </Stack>
                    <Stack mt="8">
                        <Skeleton
                            startColor="gray.100"
                            endColor="gray.200"
                            h="15px"
                            borderRadius="15px"
                        />
                        <Skeleton
                            startColor="gray.100"
                            endColor="gray.200"
                            h="15px"
                            borderRadius="15px"
                        />
                    </Stack>
                </Box>
            </Center>
        </Box>
    </>
);
