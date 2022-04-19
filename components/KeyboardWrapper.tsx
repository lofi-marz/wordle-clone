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
    const buttonTheme = [];
    let leftovers = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';

    for (const [state, letters] of usedLetters) {
        if (letters.length == 0) continue;
        letters.forEach((l) => (leftovers = leftovers.replace(l, '')));
        buttonTheme.push({
            class: `wordle-state-${state}`,
            buttons: letters.join(' '),
        });
    }

    console.log(buttonTheme);

    buttonTheme.push({
        class: 'wordle-state-empty',
        buttons: `${leftovers} {bksp} {enter}`,
    });
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
                    'Q W E R T Y U I O P',
                    'A S D F G H J K L',
                    '{enter} Z X C V B N M {bksp}',
                ],
            }}
        />
    );
};

export default KeyboardWrapper;
