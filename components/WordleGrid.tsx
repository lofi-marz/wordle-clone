import React from 'react';

import Wordle, { letterScore, LetterState, LetterStateMap } from '../wordle';
import classNames from 'classnames';

interface WordleCellProps {
    state: LetterState;
    letter: string | null;
    lastTyped?: boolean;
    column?: number;
}

const WordleCell: React.FC<WordleCellProps> = ({
    state,
    letter,
    lastTyped,
    column,
}) => {
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
                'flex aspect-square w-full items-center justify-center rounded border border-neutral-800 align-middle text-3xl font-extrabold transition-all duration-300 ease-in-out dark:border-dark-accent dark:text-white',
                cellColour,
                {
                    'animate-biggle': lastTyped,
                    'animate-flip': state != 'empty',
                    [`animation-delay-${column ? column * 100 : 'none'}`]:
                        column && state != 'empty',
                }
            )}>
            {letter ?? ' '}
        </span>
    );
};

interface WordleGridProps {
    game: Wordle;
}

const WordleGrid: React.FC<WordleGridProps> = ({ game }) => {
    const toBoardRow = (guess: string, row: number) => {
        const cells = [];
        for (let i = 0; i < guess.length; i++) {
            cells.push(
                <WordleCell
                    key={`${row}-${i}-${guess[i]}`}
                    column={i}
                    state={letterScore(game.word, guess[i], i)}
                    letter={guess[i]}
                />
            );
        }
        return cells;
    };

    const buildBoard = () => {
        const cells = [];
        for (let i = 0; i < game.guesses.length; i++) {
            const guess = game.guesses[i];
            cells.push(toBoardRow(guess, i));
        }
        const currentGuessCells: JSX.Element[] = [];

        for (let i = 0; i < game.currentGuess.length; i++) {
            const l = game.currentGuess[i];
            currentGuessCells.push(
                <WordleCell
                    key={`${i}-${l}`}
                    lastTyped={i == game.currentGuess.length - 1}
                    state="empty"
                    letter={l}
                />
            );
        }

        cells.push(currentGuessCells);
        //Fill the remaining space with empty cells
        const emptySpaces =
            (game.config.maxGuesses - game.guesses.length + 1) *
                game.word.length -
            game.currentGuess.length;
        for (let i = 0; i < emptySpaces; i++) {
            cells.push(
                <WordleCell key={`empty-${i}`} state="empty" letter={null} />
            );
        }
        return (
            <div
                className={`grid w-full grid-cols-${game.config.word.length} gap-1`}>
                {cells}
            </div>
        );
    };

    return buildBoard();
};

export default WordleGrid;
