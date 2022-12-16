import { Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { GoBackButton } from 'pages/Signup/GoBackButton';
import { SignupInfo } from 'pages/Signup/SignupInfo';
import { SignupForm } from 'pages/Signup/SignupForm';
import { ModalSuccess } from 'components/Modal/ModalSuccess';
import { ModalError } from 'components/Modal/ModalError';
import { useHistory } from 'react-router-dom';

export const SignUp = () => {
    const history = useHistory();

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true,
    });

    const {
        isOpen: isModalSuccessOpen,
        onOpen: onModalSuccessOpen,
        onClose: onModalSuccessClose,
    } = useDisclosure();

    const {
        isOpen: isModalErrorOpen,
        onOpen: onModalErrorOpen,
        onClose: onModalErrorClose,
    } = useDisclosure();

    return (
        <>
            <ModalSuccess
                buttonMessage="Ir para o login agora"
                message="Seu cadastro deu super certo, <b> vamos lá </b>"
                onClick={() => history.push('/')}
                secondaryText="Você ja pode começar criando <b> suas listas </b> de tarefas agora mesmo..."
                isOpen={isModalSuccessOpen}
                onClose={onModalSuccessClose}
            />
            <ModalError
                error="Seu email ja esta em uso"
                isOpen={isModalErrorOpen}
                onClose={onModalErrorClose}
                secondaryText="Você já pode tentar novamente, <b> clicando </b> no botão acima ou aguarde alguns minutos..."
            />
            <Flex
                padding={['10px 15px', '10px 15px', '0px', '0px']}
                justifyContent="center"
                alignItems="center"
                height={['auto', 'auto', '100vh', '100vh']}
                bgGradient={[
                    'linear(to-b, purple.800 65%, white 35%)',
                    'linear(to-b, purple.800 65%, white 35%)',
                    'linear(to-l, purple.800 65%, white 35%)',
                    'linear(to-l, purple.800 65%, white 35%)',
                ]}
                color="white"
            >
                <Flex
                    w={['100%', '100%', '80%', '70%']}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={['column', 'column', 'row', 'row']}
                >
                    {isWideVersion ? (
                        <>
                            <GoBackButton
                                top={['40px', '40px', '35px, 35px']}
                                left="20px"
                            />
                            <SignupForm
                                onModalErrorOpen={onModalErrorOpen}
                                onModalSuccessOpen={onModalSuccessOpen}
                            />
                            <SignupInfo />
                        </>
                    ) : (
                        <>
                            <GoBackButton
                                top={['30px', '40px', '35px, 35px']}
                                left="75vw"
                            />
                            <SignupInfo />
                            <SignupForm
                                onModalErrorOpen={onModalErrorOpen}
                                onModalSuccessOpen={onModalSuccessOpen}
                            />
                        </>
                    )}
                </Flex>
            </Flex>
        </>
    );
};
