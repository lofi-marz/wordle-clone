import React from 'react';
import { Center, SimpleGrid } from '@chakra-ui/react';
import Wordle, { letterScore, LetterState, LetterStateMap } from '../wordle';

interface WordleCellProps {
    state: LetterState;
    letter: string | null;
}

const WordleCell: React.FC<WordleCellProps> = ({ state, letter }) => {
    const colours: LetterStateMap<string> = {
        absent: 'red.500',
        correct: 'green.500',
        present: 'yellow.500',
        empty: 'gray.500',
    };

    return (
        <Center w="50px" h="50px" bg={colours[state]}>
            {letter ?? ' '}
        </Center>
    );
};

interface WordleGridProps {
    game: Wordle;
}

const WordleGrid: React.FC<WordleGridProps> = ({ game }) => {
    console.log('Grid re-render');
    const toBoardRow = (guess: string) => {
        const cells = [];
        for (let i = 0; i < guess.length; i++) {
            //TODO: This key isn't unique
            cells.push(
                <WordleCell
                    key={guess[i]}
                    state={letterScore(game.word, guess[i], i)}
                    letter={guess[i]}
                />
            );
        }
        return cells;
    };

    const buildBoard = () => {
        const cells = [];
        cells.push(game.guesses.map(toBoardRow));
        const currentGuessCells: JSX.Element[] = [];

        for (let i = 0; i < game.currentGuess.length; i++) {
            const l = game.currentGuess[i];
            currentGuessCells.push(
                <WordleCell key={l} state="empty" letter={l} />
            );
        }

        cells.push(currentGuessCells);
        //Fill the remaining space with empty cells
        const emptySpaces =
            (game.config.maxGuesses - game.guesses.length + 1) *
                game.config.wordLength -
            game.currentGuess.length;
        for (let i = 0; i < emptySpaces; i++) {
            cells.push(
                <WordleCell key={`empty-${i}`} state="empty" letter={null} />
            );
        }
        return (
            <Center>
                <SimpleGrid
                    columns={game.config.wordLength}
                    width="fit-content"
                    spacing={1}>
                    {cells}
                </SimpleGrid>
            </Center>
        );
    };

    return buildBoard();
};

export default WordleGrid;
