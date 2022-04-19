export function encodeWord(word: string): string {
    let encodedWord = '';
    for (let i = 0; i < word.length; i++) {
        const num = 26 - (word.charCodeAt(i) - 97);

        encodedWord += num.toString(16).padStart(2, '0');
    }
    return encodedWord;
}

export function decodeWord(encodedWord: string) {
    let decodedWord = '';
    for (let i = 0; i < encodedWord.length; i += 2) {
        const hex = parseInt(encodedWord.slice(i, i + 2), 16);
        const char = String.fromCharCode(26 - hex + 97);

        decodedWord += char;
    }
    return decodedWord;
}
