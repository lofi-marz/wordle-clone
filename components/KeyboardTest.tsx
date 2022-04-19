import React, { useState } from 'react';
import { chakra } from '@chakra-ui/react';
import Keyboard from 'react-simple-keyboard';

const KeyboardTest = (): JSX.Element => {
    const ChakraKeyboard = chakra(Keyboard, {
        baseStyle: {
            bg: 'red.500',
        },
    });
    const [input, setInput] = useState('');
    const onKeyPress = (button: string) => {
        console.log(button);
        setInput(button);
    };
    return <ChakraKeyboard onKeyPress={onKeyPress} />;
};

export default KeyboardTest;
