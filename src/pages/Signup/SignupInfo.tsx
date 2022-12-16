import {
    Box,
    Center,
    Flex,
    Grid,
    Heading,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import LogoSecondary from 'assets/logo-secondary.svg';
import SimpleIcon from 'assets/simpleIcon.svg';

import { FaForward } from 'react-icons/fa';
import { theme } from 'styles/theme';

export const SignupInfo = () => (
    <Grid w={['100%', '100%', '45%', '45%']} paddingLeft={['0', '0', '100px']}>
        <Image
            src={LogoSecondary}
            alt="do it"
            boxSize={['120px', '120px', '130px', '130px']}
            mb={['25px', '25px', '125px', '125px']}
        />
        <VStack spacing="14">
            <Flex w="100%">
                <Center borderRadius="5px" bg="white" boxSize="50px">
                    <FaForward color={theme.colors.purple['800']} size={25} />
                </Center>
                <Box ml="4">
                    <Heading size="lg">Agilidade</Heading>
                    <Text>
                        Agilize seus projetos <br /> e muita performance
                    </Text>
                </Box>
            </Flex>
            <Flex w="100%">
                <Center borderRadius="5px" bg="white" boxSize="50px">
                    <Image src={SimpleIcon} w="25px" />
                </Center>
                <Box ml="4">
                    <Heading size="lg">Simplicidade</Heading>
                    <Text>
                        Armazene seus projetos em uma <br /> interface altamente
                        usual
                    </Text>
                </Box>
            </Flex>
        </VStack>
    </Grid>
);
