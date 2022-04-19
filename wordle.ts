import validWordList from './words.json';

export interface WordleConfig {
    maxGuesses: number;
    allowAnything: boolean;
    word: string;
}

export type LetterState = 'empty' | 'absent' | 'present' | 'correct';

export type WordleActionType = 'guess' | 'removeLetter' | 'addLetter';

export interface WordleAction {
    type: WordleActionType;
    payload?: string;
}

export function wordleReducer(state: Wordle, action: WordleAction): Wordle {
    console.log({ state, action });
    switch (action.type) {
        case 'addLetter':
            return addLetter(state, action.payload ?? ' ');
        case 'removeLetter':
            return removeLetter(state);
        case 'guess':
            return submitGuess(state);
        default:
            throw new Error();
    }
}

function addLetter(state: Wordle, letter: string): Wordle {
    if (state.currentGuess.length >= state.word.length) return state;
    const newGuess = state.currentGuess + letter;

    return { ...state, currentGuess: newGuess };
}

function removeLetter(state: Wordle): Wordle {
    if (state.currentGuess.length == 0) return state;

    return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
}

function isWordValid(allowAnything: boolean, word: string) {
    if (allowAnything) return true;

    return validWordList.includes(word);
}

function submitGuess(state: Wordle): Wordle {
    const guess = state.currentGuess;
    const { allowAnything } = state.config;

    if (guess.length < state.word.length) {
        console.log('Word unfinished');
        return state;
    }

    if (
        !isWordValid(allowAnything, guess.toLocaleLowerCase()) &&
        guess != state.word
    ) {
        console.log('Word invalid');
        return state;
    }

    //TODO: Keep track of guessed letters
    const newUsedLetters = state.guessedLetters;
    for (let i = 0; i < guess.length; i++) {
        const l = guess[i];
        newUsedLetters.set(l, letterScore(state.word, l, i));
    }

    return {
        ...state,
        guesses: [...state.guesses, guess],
        guessedLetters: newUsedLetters,
        currentGuess: '',
    };
}

export function letterScore(
    correctWord: string,
    letter: string,
    pos: number
): LetterState {
    console.log(`${letter} ${correctWord[pos]} ${pos}`);
    if (letter == correctWord[pos]) {
        return 'correct';
    } else if (correctWord.includes(letter)) {
        return 'present';
    } else {
        return 'absent';
    }
}

export type LetterStateMap<T> = {
    [k in LetterState]: T;
};

export default interface Wordle {
    config: WordleConfig;
    guesses: string[];
    currentGuess: string;
    guessedLetters: Map<string, LetterState>;
    word: string;
}
