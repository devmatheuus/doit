import { useHistory } from 'react-router-dom';

import { Center } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { theme } from 'styles/theme';

interface GoBackButtonProps {
    top: string[] | string;
    left: string;
}

export const GoBackButton = ({ top, left }: GoBackButtonProps) => {
    const history = useHistory();

    return (
        <Center
            as="button"
            position="absolute"
            w={['50px', '60px']}
            h="50px"
            bg="purple.500"
            fontSize="2xl"
            borderRadius="md"
            top={top}
            left={left}
            _hover={{ bg: 'purple.600' }}
            onClick={() => history.push('/')}
        >
            <FaArrowLeft color={theme.colors.white} />
        </Center>
    );
};
