import React, { useReducer } from 'react';
import { Box } from '@chakra-ui/react';
import WordleGrid from './WordleGrid';

import {
    LetterStateMap,
    WordleActionType,
    WordleConfig,
    wordleReducer,
} from '../wordle';

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
        currentGuess: [],
        guessedLetters: [],
        word: config.wordSource.getWord(),
    });

    const usedLetters: LetterStateMap<string[]> = {
        empty: [],
        absent: [],
        present: [],
        correct: [],
    };

    //gameDispatch({ type: WordleActionType.AddLetter, payload: 'b' });

    const onKeyPress = (button: string) => {
        console.log(button);
        switch (button) {
            case '{bksp}':
                break;
            case '{enter}':
                gameDispatch({ type: WordleActionType.Guess, payload: null });
                break;
            default:
                gameDispatch({
                    type: WordleActionType.AddLetter,
                    payload: button,
                });
        }
    };

    return (
        <Box>
            <WordleGrid game={gameState} />
            <KeyboardWrapper
                usedLetters={usedLetters}
                onKeyPress={onKeyPress}
            />
        </Box>
    );
};

export default WordleGame;
