import React, { useReducer, useState } from 'react';
import { Box } from '@chakra-ui/react';
import WordleGrid from './WordleGrid';

import { LetterState, WordleConfig, wordleReducer } from '../wordle';
import KeyboardWrapper from './KeyboardWrapper';

const config: WordleConfig = {
    maxGuesses: 5,
    wordLength: 5,
    wordSource: { getWord: () => 'omari' },
};

const WordleGame: React.FC = () => {
    const [gameState, gameDispatch] = useReducer(wordleReducer, {
        config,
        guesses: [],
        currentGuess: '',
        guessedLetters: new Map<string, LetterState>(),
        word: config.wordSource.getWord(),
    });

    const [button, setButton] = useState('');

    const groupLetters = (guessedLetters: Map<string, LetterState>) => {
        console.log(guessedLetters);
        const letterStates = new Map<LetterState, string[]>();
        for (const [letter, state] of guessedLetters) {
            const oldState = letterStates.get(state) ?? [];
            letterStates.set(state, [...oldState, letter]);
        }
        console.log(letterStates);
        return letterStates;
    };

    const onKeyPress = (button: string) => {
        switch (button) {
            case '{bksp}':
                gameDispatch({ type: 'removeLetter' });
                break;
            case '{enter}':
                gameDispatch({ type: 'guess' });
                break;
            default:
                setButton(button);
            /*gameDispatch({
                    type: 'addLetter',
                    payload: button,
                });*/
        }
    };

    return (
        <Box>
            <WordleGrid game={gameState} />

            <KeyboardWrapper
                usedLetters={groupLetters(gameState.guessedLetters)}
                onKeyPress={onKeyPress}
            />
        </Box>
    );
};

export default WordleGame;
