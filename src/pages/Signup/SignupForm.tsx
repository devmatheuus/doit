import { Grid, Button, Text, VStack, Heading, Box } from '@chakra-ui/react';
import { Input } from 'components/Form/Input';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import * as yup from 'yup';
import { api } from 'services/api';

interface SignupData {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const signupSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória'),
    confirm_password: yup
        .string()
        .required('Confirmação de senha obrigatória')
        .oneOf([yup.ref('password')], 'Senhas diferentes'),
});

interface SignupFormProps {
    onModalErrorOpen: () => void;
    onModalSuccessOpen: () => void;
}

export const SignupForm = ({
    onModalErrorOpen,
    onModalSuccessOpen,
}: SignupFormProps) => {
    const [loading, setLoading] = useState(false);

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<SignupData>({
        resolver: yupResolver(signupSchema),
    });

    const handleSignup = ({ email, password, name }: SignupData) => {
        setLoading(true);

        api.post('/register', { name, email, password })
            .then(() => {
                setLoading(false);
                onModalSuccessOpen();
            })
            .catch(() => {
                setLoading(false);
                onModalErrorOpen();
            });
    };

    return (
        <Grid
            onSubmit={handleSubmit(handleSignup)}
            as="form"
            padding="15px 20px"
            border="3px solid"
            borderColor="gray.100"
            bg="white"
            color="gray.900"
            w={['100%', '100%', '50%', '50%']}
            mt={['6', '6', '0']}
        >
            <Heading size="lg">Crie sua conta</Heading>
            <VStack mt="2" spacing="2">
                <Input
                    autoFocus
                    placeholder="Digite seu nome"
                    icon={FaUser}
                    label="Nome"
                    error={errors.name}
                    {...register('name')}
                />
                <Box w="100%">
                    <Input
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
                    label="Senha"
                    type="password"
                    error={errors.password}
                    {...register('password')}
                />
                <Input
                    placeholder="Confirme sua senha"
                    icon={FaLock}
                    label="Confirmação de Senha"
                    type="password"
                    error={errors.confirm_password}
                    {...register('confirm_password')}
                />
            </VStack>
            <Button
                isLoading={loading}
                type="submit"
                bg="purple.800"
                w="100%"
                color="white"
                h="60px"
                mt="4"
                borderRadius="8px"
                _hover={{ bg: 'purple.900' }}
            >
                Finalizar cadastro
            </Button>
        </Grid>
    );
};
