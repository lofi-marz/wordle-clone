import { Dispatch, useContext, useEffect, useReducer } from 'react';
import {
    Wordle,
    LetterState,
    WordleAction,
    wordleReducer,
    WordleConfig,
} from '../wordle';

import { createContext } from 'react';
import { WithChildrenProps } from 'types';
import { useLocalGameState } from '../hooks/useLocalGameState';

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
    initialState,
    children,
}: { config: WordleConfig; initialState: Wordle | null } & WithChildrenProps) {
    const [localGameState] = useLocalGameState();
    const [gameState, gameDispatch] = useReducer(
        wordleReducer,
        initialState ?? {
            config,
            guesses: [],
            currentGuess: '',
            guessedLetters: {},
            word: config.word,
        }
    );
    console.log('Initial state:', initialState, 'Game state:', gameState);
    useEffect(() => {
        if (localGameState)
            gameDispatch({ type: 'load', payload: localGameState });
    }, [localGameState]);

    return (
        <WordleGameContext.Provider value={gameState}>
            <WordleGameDispatchContext.Provider value={gameDispatch}>
                {children}
            </WordleGameDispatchContext.Provider>
        </WordleGameContext.Provider>
    );
}

export default WordleGameContextProvider;
