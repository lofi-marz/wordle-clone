import { NextPage } from 'next';
import WordleGame from '../components/WordleGame';
import { useRouter } from 'next/router';
import { decodeWord } from '../word-encoder';
import { WordleConfig } from '../wordle';
import React from 'react';

const PlayWordle: NextPage = () => {
    const router = useRouter();
    const { isEncoded, word } = router.query;

    const getWord = (): string => {
        if (word) {
            if (isEncoded) return decodeWord(word as string);
            return word as string;
        } else {
            return 'omari';
        }
    };

    const config: WordleConfig = {
        maxGuesses: 5,
        allowAnything: true,
        word: getWord(),
    };

    //TODO: Look at how to do a share page
    return <WordleGame config={config} />;
};

PlayWordle.getInitialProps = async ({ req }) => {
    return {};
};

export default PlayWordle;
