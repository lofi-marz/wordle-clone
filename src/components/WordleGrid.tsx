import React from 'react';
import {
    letterScore,
    LetterState,
    LetterStateMap,
    Wordle,
} from '../wordle/wordle';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

interface WordleCellProps {
    state: LetterState;
    letter: Uppercase<string> | null;
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
        absent: 'wordle-state-absent',
        correct: 'wordle-state-correct',
        present: 'wordle-state-present',
        empty: '',
    };
    //TODO: Animate color
    const variants: Variants = {
        lastTyped: { scale: [1, 1.1, 1], transition: { duration: 0.3 } },
        notEmpty: {
            scaleX: [1, 0, 1],
            transition: { duration: 0.5, delay: (column ?? 0) * 0.2 },
        },
    };

    let animate = '';

    animate += lastTyped ? 'lastTyped' : '';
    animate += state != 'empty' ? 'notEmpty' : '';

    return (
        <motion.span
            className={classNames(
                'flex aspect-square w-full items-center justify-center rounded border align-middle text-3xl font-extrabold dark:text-white',
                colours[state],
                {
                    'dark:border-dark-accent': colours[state] == '',
                    'border-transparent': colours[state] != '',
                }
            )}
            animate={animate}
            variants={variants}>
            {letter?.toLocaleUpperCase() ?? ' '}
        </motion.span>
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
        //Tailwind doesn't support dynamic class names properly, using inline styles as a workaround
        return (
            <div
                style={{
                    gridTemplateColumns: `repeat(${game.config.word.length}, minmax(0, 1fr))`,
                }}
                className="m-auto grid w-full gap-1 p-5 sm:w-96">
                {cells}
            </div>
        );
    };

    return buildBoard();
};

export default WordleGrid;
