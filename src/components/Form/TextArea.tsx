import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea as ChakraTextArea,
    TextareaProps as ChakraTextAreaProps,
    InputLeftElement,
    InputGroup,
} from '@chakra-ui/react';

import {
    useState,
    useEffect,
    useCallback,
    ForwardRefRenderFunction,
    forwardRef,
} from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

interface TextAreaProps extends ChakraTextAreaProps {
    name: string;
    label?: string;
    error?: FieldError | null;
    icon?: IconType;
}

type textAreaVariationOptions = {
    [key: string]: string;
};

const inputVariation: textAreaVariationOptions = {
    error: 'red.500',
    default: 'gray.200',
    focus: 'purple.800',
    filled: 'green.500',
};

const TextAreaBase: ForwardRefRenderFunction<
    HTMLTextAreaElement,
    TextAreaProps
> = ({ name, error = null, icon: Icon, label, ...rest }, ref) => {
    const [value, setValue] = useState('');
    const [variant, setVariant] = useState('default');

    useEffect(() => {
        if (error) {
            return setVariant('error');
        }
    }, [error]);

    const handleTextAreaFocus = useCallback(() => {
        if (!error) {
            return setVariant('focus');
        }
    }, [error]);

    const handleTextAreaBlur = useCallback(() => {
        if (value.length > 1 && !error) {
            return setVariant('filled');
        }
    }, [error, value]);

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel color="gray.400">{label}</FormLabel>}

            <InputGroup flexDirection="column">
                {Icon && (
                    <InputLeftElement color={inputVariation[variant]} mt="2.5">
                        <Icon />
                    </InputLeftElement>
                )}

                <ChakraTextArea
                    name={name}
                    bg="gray.50"
                    color={inputVariation[variant]}
                    borderColor={inputVariation[variant]}
                    onFocus={handleTextAreaFocus}
                    onChangeCapture={(e) => setValue(e.currentTarget.value)}
                    onBlurCapture={handleTextAreaBlur}
                    variant="outline"
                    _hover={{ bg: 'gray.100' }}
                    _placeholder={{ color: 'gray.300' }}
                    _focus={{ bg: 'gray.100' }}
                    size="lg"
                    h="60px"
                    ref={ref}
                    {...rest}
                    maxLength={100}
                />

                {!!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
            </InputGroup>
        </FormControl>
    );
};

export const TextArea = forwardRef(TextAreaBase);
