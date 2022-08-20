import { NextPage } from 'next';
import WordleGame from '../components/WordleGame';
import { useRouter } from 'next/router';
import { decodeConfigCode } from '../word-encoder';
import { WordleConfig } from '../wordle';
import React, { useEffect } from 'react';
import WordleGameContextProvider from '../components/WordleGameContext';
import { useLocalGameState } from '../hooks/useLocalGameState';

const PlayWordle: NextPage = () => {
    const router = useRouter();
    const { code, word } = router.query;
    const [localGameState] = useLocalGameState();

    let config: WordleConfig = {
        maxGuesses: 5,
        allowAnything: true,
        word: 'omari',
    };

    if (localGameState) {
        config = localGameState.config;
    } else if (code) {
        config = decodeConfigCode(code as string);
    } else if (word) {
        config.word = word as string;
    }

    //TODO: Look at how to do a share page
    return (
        <WordleGameContextProvider
            config={config}
            initialState={localGameState}>
            <WordleGame />
        </WordleGameContextProvider>
    );
};

export default PlayWordle;
