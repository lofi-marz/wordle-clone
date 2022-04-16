import React from 'react';
import Keyboard from 'react-simple-keyboard';
import { LetterStateMap } from '../wordle';
import { chakra } from '@chakra-ui/react';

interface KeyboardWrapperProps {
    //Grouped by state
    usedLetters: LetterStateMap<string[]>;
    onKeyPress: (button: string) => void;
    onChange?: (input: string) => void;
}

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
    usedLetters,
    onKeyPress,
    onChange,
}) => {
    const buttonTheme = Object.entries(usedLetters)
        .filter(([_, letters]) => letters.length > 0)
        .map(([state, letters]) => {
            return {
                class: `wordle-letter-${state}`,
                buttons: letters.join(' '),
            };
        });

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
