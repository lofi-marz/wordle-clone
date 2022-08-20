import { Dispatch, useContext, useReducer } from 'react';
import {
    Wordle,
    LetterState,
    WordleAction,
    wordleReducer,
    WordleConfig,
} from '../wordle';

import { createContext } from 'react';
import { WithChildrenProps } from 'types';

export const WordleGameContext = createContext<Wordle | null>(null);
export const WordleGameDispatchContext =
    createContext<Dispatch<WordleAction> | null>(null);

export function useWordleGame() {
    return useContext(WordleGameContext) as Wordle; //Assume they're null, if not we'll deal with it
}

export function useWordleGameDispatch() {
    return useContext(WordleGameDispatchContext) as Dispatch<WordleAction>;
}

function WordleGameContextProvider({
    config,
    children,
}: { config: WordleConfig } & WithChildrenProps) {
    const [gameState, gameDispatch] = useReducer(wordleReducer, {
        config,
        guesses: [],
        currentGuess: '',
        guessedLetters: new Map<string, LetterState>(),
        word: config.word,
    });
    return (
        <WordleGameContext.Provider value={gameState}>
            <WordleGameDispatchContext.Provider value={gameDispatch}>
                {children}
            </WordleGameDispatchContext.Provider>
        </WordleGameContext.Provider>
    );
}

export default WordleGameContextProvider;
