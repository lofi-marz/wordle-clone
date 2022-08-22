import React, { useEffect, useReducer } from 'react';
import WordleGrid from './WordleGrid';

import { LetterState, WordleConfig, wordleReducer } from '../wordle';
import KeyboardWrapper from './KeyboardWrapper';
import { useWordleGame, useWordleGameDispatch } from './WordleGameContext';
import { useLocalGameState } from '../hooks/useLocalGameState';
import { useKeyPress } from '../hooks/useKeyPress';

interface WordleGameProps {
    config: WordleConfig;
}

function isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function WordleGame() {
    const wordleGame = useWordleGame();
    const wordleGameDispatch = useWordleGameDispatch();
    const [, updateLocalGameState] = useLocalGameState();

    useKeyPress((key) => {
        let wordleInput = null;
        switch (key) {
            case 'Enter':
                wordleInput = '{enter}';
                break;
            case 'Backspace':
                wordleInput = '{bksp}';
                break;
            default:
                if (isLetter(key)) wordleInput = key;
        }
        if (wordleInput) onKeyPress(wordleInput);
    });

    const groupLetters = (guessedLetters: Record<string, LetterState>) => {
        const letterStates = new Map<LetterState, string[]>();
        try {
            for (const [letter, state] of Object.entries(guessedLetters)) {
                const oldState = letterStates.get(state) ?? [];
                letterStates.set(state, [...oldState, letter]);
            }
        } catch (e) {
            console.log(e);
        }

        return letterStates;
    };

    const onKeyPress = (button: string) => {
        switch (button) {
            case '{bksp}':
                wordleGameDispatch({ type: 'removeLetter' });
                break;
            case '{enter}':
                wordleGameDispatch({ type: 'guess' });
                //TODO: Only do this sometimes
                if (wordleGame.currentGuess == '')
                    updateLocalGameState(wordleGame);

                break;
            default:
                wordleGameDispatch({
                    type: 'addLetter',
                    payload: button,
                });
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden overflow-hidden md:w-1/2 md:max-w-screen-sm">
            <div className="flex h-full w-full grow overflow-auto">
                <WordleGrid game={wordleGame} />
            </div>
            <KeyboardWrapper
                usedLetters={groupLetters(wordleGame.guessedLetters)}
                onKeyPress={onKeyPress}
            />
        </div>
    );
}

export default WordleGame;
