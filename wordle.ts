export interface WordleConfig {
    wordLength: number;
    maxGuesses: number;
    wordSource: WordFactory;
}

export interface WordFactory {
    getWord: () => string;
}

export type LetterState = 'empty' | 'absent' | 'present' | 'correct';
export type LetterStateMap<T> = {
    [k in LetterState]: T;
};

export default class Wordle {
    config: WordleConfig;
    guesses: string[];
    currentGuess: string[];
    guessedLetters: [string, number][];
    word: string;

    constructor(config: WordleConfig) {
        this.config = config;
        this.word = config.wordSource.getWord();
        this.guesses = [];
        this.currentGuess = [];
        this.guessedLetters = [];
    }

    addLetter(letter: string): Wordle {
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
}
