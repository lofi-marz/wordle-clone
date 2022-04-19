import React from 'react';
import { LetterState } from '../wordle';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

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

    const buttonTheme = [];

    for (const [state, letters] of usedLetters) {
        if (letters.length == 0) continue;
        buttonTheme.push({
            class: `wordle-state-${state}`,
            buttons: letters.join(' '),
        });
    }

    return (
        <Keyboard
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
