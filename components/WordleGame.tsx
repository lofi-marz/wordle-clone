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
                gameDispatch({
                    type: 'addLetter',
                    payload: button,
                });
        }
    };

    return (
        <div className="flex h-full flex-col content-between items-center">
            <div className="flex w-4/5 grow place-content-center place-items-center">
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
