import { Flex } from '@chakra-ui/react';
import { LoginInfo } from './LoginInfo';
import { LoginForm } from './LoginForm';

import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const signInSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória'),
});

interface SignInData {
    email: string;
    password: string;
}

export const Login = () => {
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<SignInData>({
        resolver: yupResolver(signInSchema),
    });

    const handleSignIn = ({ email, password }: SignInData) => {
        setLoading(true);
        signIn({ email, password })
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    };

    return (
        <Flex
            padding={['10px 15px', '10px 15px', '0px', '0px']}
            justifyContent="center"
            alignItems="center"
            height={['auto', 'auto', '100vh', '100vh']}
            bgGradient={[
                'linear(to-b, purple.800 65%, white 35%)',
                'linear(to-b, purple.800 65%, white 35%)',
                'linear(to-r, purple.800 65%, white 35%)',
                'linear(to-r, purple.800 65%, white 35%)',
            ]}
            color="white"
        >
            <Flex
                w={['100%', '100%', '90%', '70%']}
                justifyContent="center"
                alignItems="center"
                flexDirection={['column', 'column', 'row', 'row']}
            >
                <LoginInfo />
                <LoginForm
                    errors={errors}
                    handleSignIn={handleSubmit(handleSignIn)}
                    loading={loading}
                    register={register}
                />
            </Flex>
        </Flex>
    );
};
