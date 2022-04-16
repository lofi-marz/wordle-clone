import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import WordleGrid from './WordleGrid';
import KeyboardWrapper from './KeyboardWrapper';
import Wordle, { LetterStateMap, WordleConfig } from '../wordle';

const WordleGame: React.FC = () => {
    const config: WordleConfig = {
        maxGuesses: 5,
        wordLength: 5,
        wordSource: { getWord: () => 'omari' },
    };
    const [game, setGame] = useState(new Wordle(config));

    game.guessWord('omaid');

    const usedLetters: LetterStateMap<string[]> = {
        empty: [],
        absent: [],
        present: [],
        correct: [],
    };

    game.guessedLetters.forEach((l) => {
        //TODO: Maybe make this tuple code cleaner, find a better way to store letter and position
        usedLetters[game.letterState(...l)].push(l[0]);
    });

    const onKeyPress = (button: string) => {
        switch (button) {
            case '{bksp}':
                setGame((g) => g.removeLetter());

                break;
            case '{enter}':
                setGame((g) => g.submitGuess());

                break;
            default:
                setGame((g) => g.addLetter(button));
        }
    };

    return (
        <Box>
            <WordleGrid game={game} />
            <KeyboardWrapper
                usedLetters={usedLetters}
                onKeyPress={onKeyPress}
            />
        </Box>
    );
};

export default WordleGame;
