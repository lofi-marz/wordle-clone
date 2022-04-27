import { WordleConfig } from './wordle';

//Idk bored

//Trying to transform f3(f2(f1(val)))) to
// f1(val).then(f2).then(f3).then(f4)
class Encoder {
    code: string;

    then(next: (val: string) => string): Encoder {
        return new Encoder(next(this.code));
    }

    finish(): string {
        return this.code;
    }

    constructor(word: string) {
        this.code = word;
    }
}

function encodeWord(word: string): string {
    if (word == '') return '';
    let encodedWord = '';
    for (let i = 0; i < word.length; i++) {
        const num = shift(word.charCodeAt(i) - 97, i % 2 == 0 ? i : -i);

        encodedWord += num.toString(26);
    }
    return encodedWord;
}

function shift(charCode: number, rightShift: number): number {
    if (rightShift < 0) rightShift = 26 + rightShift;
    return (charCode + rightShift) % 26;
}

function decodeWord(encodedWord: string) {
    let decodedWord = '';
    for (let i = 0; i < encodedWord.length; i++) {
        const hex = parseInt(encodedWord[i], 26);
        const char = String.fromCharCode(shift(hex, i % 2 == 0 ? -i : i) + 97);

        decodedWord += char;
    }
    return decodedWord;
}

export function decodeConfigCode(encodedConfig: string): WordleConfig {
    const maxGuesses = parseInt(encodedConfig.slice(0, 2), 10);
    const word = decodeWord(encodedConfig.slice(2, -1));
    const anyAllowed = encodedConfig.charAt(encodedConfig.length - 1) == '1';
    return {
        maxGuesses,
        word,
        allowAnything: anyAllowed,
    };
}

export function generateConfigCode(config: WordleConfig): string {
    if (Object.keys(config).length == 0) return '';
    return new Encoder(config.word)
        .then(encodeWord)
        .then((w) => encodeMaxGuesses(w, config.maxGuesses))
        .then((w) => encodeAnyAllowed(w, config.allowAnything))
        .finish();
}

function encodeMaxGuesses(encodedWord: string, maxGuesses: number): string {
    const base26 = maxGuesses.toString(26).padStart(2, '0');
    return base26 + encodedWord;
}

function encodeAnyAllowed(encodedWord: string, anyAllowed: boolean) {
    return encodedWord + (anyAllowed ? '0' : '1');
}
