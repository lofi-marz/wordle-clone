import { NextPage } from 'next';
import WordleGame from '../components/WordleGame';
import { useRouter } from 'next/router';
import { decodeConfigCode } from '../word-encoder';
import { WordleConfig } from '../wordle';
import React from 'react';

const PlayWordle: NextPage = () => {
    const router = useRouter();
    const { code, word } = router.query;

    let config: WordleConfig = {
        maxGuesses: 5,
        allowAnything: true,
        word: 'omari',
    };

    if (code) {
        config = decodeConfigCode(code as string);
    } else if (word) {
        config.word = word as string;
    }

    //TODO: Look at how to do a share page
    return <WordleGame config={config} />;
};

export default PlayWordle;
