import React, { useReducer } from 'react';
import WordleGrid from './WordleGrid';

import { LetterState, WordleConfig, wordleReducer } from '../wordle';
import KeyboardWrapper from './KeyboardWrapper';

interface WordleGameProps {
    config: WordleConfig;
}

const WordleGame: React.FC<WordleGameProps> = ({ config }) => {
    const [gameState, gameDispatch] = useReducer(wordleReducer, {
        config,
        guesses: [],
        currentGuess: '',
        guessedLetters: new Map<string, LetterState>(),
        word: config.word.toLocaleUpperCase(),
    });

    const groupLetters = (guessedLetters: Map<string, LetterState>) => {
        console.log(guessedLetters);
        const letterStates = new Map<LetterState, string[]>();
        for (const [letter, state] of guessedLetters) {
            const oldState = letterStates.get(state) ?? [];
            letterStates.set(state, [...oldState, letter]);
        }
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
                gameDispatch({
                    type: 'addLetter',
                    payload: button,
                });
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden overflow-hidden md:w-2/3 md:max-w-screen-sm">
            <div className="flex h-full w-full grow overflow-auto md:p-10">
                <WordleGrid game={gameState} />
            </div>
            <KeyboardWrapper
                usedLetters={groupLetters(gameState.guessedLetters)}
                onKeyPress={onKeyPress}
            />
        </div>
    );
};

export default WordleGame;
