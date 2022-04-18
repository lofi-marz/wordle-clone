export interface WordleConfig {
    wordLength: number;
    maxGuesses: number;
    wordSource: WordFactory;
}

export interface WordFactory {
    getWord: () => string;
}

export type LetterState = 'empty' | 'absent' | 'present' | 'correct';

export enum WordleActionType {
    Guess,
    RemoveLetter,
    AddLetter,
}

export interface WordleAction {
    type: WordleActionType;
    payload: string | null;
}

export function wordleReducer(state: Wordle, action: WordleAction): Wordle {
    console.log({ state, action });
    switch (action.type) {
        case WordleActionType.AddLetter:
            return addLetter(state, action.payload ?? ' ');
        case WordleActionType.Guess:
            return submitGuess(state);
        default:
            throw new Error();
    }

    return state;
}

function addLetter(state: Wordle, letter: string): Wordle {
    if (state.currentGuess.length >= state.config.wordLength) return state;
    //return state;
    const newState: Wordle = { ...state };
    newState.currentGuess.push(letter);

    return newState;
}

function submitGuess(state: Wordle): Wordle {
    const guess = state.currentGuess.join('');
    const newState: Wordle = { ...state };
    if (guess.length < state.config.wordLength) {
        console.log('Word unfinished');
        return state;
    }

    newState.guesses.push(guess);

    for (let i = 0; i < guess.length; i++) {
        if (newState.guesses.includes(guess[i]))
            newState.guessedLetters.push([guess[i], i]);
    }

    const guessState = guessScore(newState.word, guess);
    if (guessState.filter((g) => g == 'correct').length == guess.length) {
        console.log('Win!');
    } else if (newState.guesses.length == newState.config.maxGuesses) {
        console.log('Lose!');
    }

    newState.currentGuess = [];
    return newState;
}

export function letterScore(
    correctWord: string,
    letter: string,
    pos: number
): LetterState {
    if (letter == correctWord[pos]) {
        return 'correct';
    } else if (correctWord.includes(letter)) {
        return 'present';
    } else {
        return 'absent';
    }
}

function guessScore(guess: string, correctWord: string): LetterState[] {
    const states: LetterState[] = [];
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        states.push(letterScore(correctWord, letter, i));
    }
    return states;
}

export type LetterStateMap<T> = {
    [k in LetterState]: T;
};

export default interface Wordle {
    config: WordleConfig;
    guesses: string[];
    currentGuess: string[];
    guessedLetters: [string, number][];
    word: string;

    /*addLetter(letter: string): Wordle {
        if (this.currentGuess.length >= this.config.wordLength) return this;
        this.currentGuess.push(letter);
        console.log(this.currentGuess);
        return this;
    }

    removeLetter(): Wordle {
        if (this.currentGuess.length <= 0) return this;
        this.currentGuess.pop();
        return this;
    }

    guessWord(word: string) {
        for (let i = 0; i < word.length; i++) {
            this.addLetter(word[i]);
        }
        this.submitGuess();
    }

    submitGuess(): Wordle {
        const word = this.currentGuess.join('');

        if (word.length < this.config.wordLength) {
            console.log('Word unfinished');
            return this;
        }

        this.guesses.push(word);

        for (let i = 0; i < word.length; i++) {
            if (!this.guesses.includes(word[i]))
                this.guessedLetters.push([word[i], i]);
        }

        const guessState = this.guessState(word);
        if (guessState.filter((g) => g == 'correct').length == word.length) {
            console.log('Win!');
        } else if (this.guesses.length == this.config.maxGuesses) {
            console.log('Lose!');
        }

        this.currentGuess = [];
        return this;
    }

    letterState(letter: string, pos: number): LetterState {
        if (letter == this.word[pos]) {
            return 'correct';
        } else if (this.word.includes(letter)) {
            return 'present';
        } else {
            return 'absent';
        }
    }

    guessState(guess: string): LetterState[] {
        const states: LetterState[] = [];
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            states.push(this.letterState(letter, i));
        }
        return states;
    }
    */
}
