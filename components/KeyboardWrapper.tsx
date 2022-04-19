import React, { useRef } from 'react';
import { LetterState } from '../wordle';
import { chakra } from '@chakra-ui/react';
import Keyboard from 'react-simple-keyboard';

interface KeyboardWrapperProps {
    onKeyPress: (button: string) => void;
    usedLetters: Map<LetterState, string[]>;
    onChange?: (input: string) => void;
}

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
    onKeyPress,
    onChange,
    usedLetters,
}) => {
    console.log(usedLetters);

    const keyboard = useRef();

    const buttonTheme = [];

    for (const [state, letters] of usedLetters) {
        if (letters.length == 0) continue;
        buttonTheme.push({
            class: `wordle-letter-${state}`,
            buttons: letters.join(' '),
        });
    }

    //TODO: This breaks everything
    const ChakraKeyboard = chakra(Keyboard, {
        baseStyle: {
            bg: 'red.500',
        },
    });

    return (
        <ChakraKeyboard
            buttonTheme={buttonTheme}
            onKeyPress={onKeyPress}
            onChange={onChange}
            layoutName="default"
            syncInstanceInputs={true}
            useMouseEvents={false}
            layout={{
                default: [
                    'q w e r t y u i o p',
                    'a s d f g h j k l',
                    '{enter} z x c v b n m {bksp}',
                ],
            }}
        />
    );
};

export default KeyboardWrapper;
