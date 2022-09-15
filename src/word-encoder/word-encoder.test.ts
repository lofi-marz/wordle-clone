import '@testing-library/jest-dom';
import { decodeWord, encodeWord, generateConfigCode } from './word-encoder';
import { WordleConfig } from '../wordle/wordle';

describe('Word Encoder', () => {
    it('is reflexive', () => {
        const WORD = 'omari';
        const encoded = encodeWord(WORD);
        const decoded = decodeWord(encoded);
        expect(decoded).toEqual(WORD);
    });

    it('generates config code correctly', () => {
        const config: WordleConfig = {
            allowAnything: Math.random() > 0.5,
            maxGuesses: Math.floor(Math.random() * 5 + 5), //Just a random range
            word: 'omari', //Maybe randomise the word as well?
        };
        const code = generateConfigCode(config);
        console.log(code);
        const encodedMaxGuesses = config.maxGuesses
            .toString(26)
            .padStart(2, '0');
        const encodedWord = encodeWord('omari');
        expect(code).toEqual(
            encodedMaxGuesses + encodedWord + (config.allowAnything ? '0' : '1')
        );
    });
});
