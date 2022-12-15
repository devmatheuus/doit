import { Grid, Button, Text, VStack, Heading, Box } from '@chakra-ui/react';
import { Input } from 'components/Form/Input';

import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

import { FaEnvelope, FaLock } from 'react-icons/fa';

interface SignInData {
    email: string;
    password: string;
}

interface LoginFormProps {
    handleSignIn: () => void;
    errors: DeepMap<FieldValues, FieldError>;
    register: UseFormRegister<SignInData>;
    loading: boolean;
}

export const LoginForm = ({
    handleSignIn,
    errors,
    register,
    loading,
}: LoginFormProps) => (
    <Grid
        onSubmit={handleSignIn}
        as="form"
        padding="30px 15px"
        border="3px solid"
        borderColor="gray.100"
        bg="white"
        color="gray.900"
        w={['100%', '100%', '50%', '50%']}
        mt={['6', '6', '0']}
    >
        <Heading size="lg">Bem vindo de volta!</Heading>
        <VStack mt="6" spacing="5">
            <Box w="100%">
                <Input
                    autoFocus
                    placeholder="Digite seu login"
                    icon={FaEnvelope}
                    label="Login"
                    type="email"
                    error={errors.email}
                    {...register('email')}
                />
                {!errors.email && (
                    <Text ml="1" mt="1" color="gray.300">
                        Exemplo: nome@email.com
                    </Text>
                )}
            </Box>
            <Input
                placeholder="Digite sua senha"
                icon={FaLock}
                type="password"
                error={errors.password}
                {...register('password')}
            />
        </VStack>
        <VStack mt="4" spacing="5">
            <Button
                isLoading={loading}
                type="submit"
                bg="purple.800"
                w="100%"
                color="white"
                h="60px"
                borderRadius="8px"
                _hover={{ bg: 'purple.900' }}
            >
                Entrar
            </Button>

            <Text color="gray.400">Ainda não possui uma conta?</Text>

            <Button
                bg="gray.100"
                w="100%"
                color="gray.300"
                h="60px"
                borderRadius="8px"
                _hover={{ bg: 'gray.200' }}
            >
                Cadastrar
            </Button>
        </VStack>
    </Grid>
);
