import React from 'react';

import Wordle, { letterScore, LetterState, LetterStateMap } from '../wordle';
import classNames from 'classnames';

interface WordleCellProps {
    state: LetterState;
    letter: string | null;
}

const WordleCell: React.FC<WordleCellProps> = ({ state, letter }) => {
    const colours: LetterStateMap<string> = {
        absent: 'bg-red-500',
        correct: 'bg-green-500',
        present: 'bg-yellow-500',
        empty: '',
    };

    const cellColour = colours[state];

    return (
        <span
            className={classNames(
                'flex aspect-square w-full items-center justify-center rounded border border-slate-300 align-middle text-3xl',
                cellColour
            )}>
            {letter ?? ' '}
        </span>
    );
};

interface WordleGridProps {
    game: Wordle;
}

const WordleGrid: React.FC<WordleGridProps> = ({ game }) => {
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
        return <div className="grid w-full grid-cols-5 gap-1">{cells}</div>;
    };

    return buildBoard();
};

export default WordleGrid;
