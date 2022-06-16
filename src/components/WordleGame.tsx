import React, { useEffect, useReducer } from 'react';
import WordleGrid from './WordleGrid';

import Wordle, { LetterState, WordleConfig, wordleReducer } from '../wordle';
import KeyboardWrapper from './KeyboardWrapper';
import useLocalStorageSync from './useLocalStorageSync';

interface WordleGameProps {
    config: WordleConfig;
}

const WordleGame: React.FC<WordleGameProps> = ({ config }) => {
    const [storedGameState, setStoredGameState] = useLocalStorageSync<Wordle>(
        'gameState',
        null
    );

    const [gameState, gameDispatch] = useReducer(wordleReducer, {
        config,
        guesses: [],
        currentGuess: '',
        guessedLetters: new Map<string, LetterState>(),
        word: config.word,
    });

    useEffect(() => {
        if (storedGameState != null)
            gameDispatch({ type: 'load', payload: storedGameState });
    }, [storedGameState]);

    const groupLetters = (guessedLetters: Map<string, LetterState>) => {
        const letterStates = new Map<LetterState, string[]>();
        try {
            for (const [letter, state] of guessedLetters) {
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
                gameDispatch({ type: 'removeLetter' });
                break;
            case '{enter}':
                gameDispatch({ type: 'guess' });
                //TODO: Only do this sometimes
                if (gameState.currentGuess == '')
                    setStoredGameState({ ...gameState, currentGuess: '' });
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
