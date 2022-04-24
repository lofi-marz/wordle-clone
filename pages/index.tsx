import type { NextPage } from 'next';
import { decodeWord } from '../word-encoder';
import { useRouter } from 'next/router';
import React from 'react';
import ButtonLink from '../components/ButtonLink';

const Home: NextPage = () => {
    const router = useRouter();
    const { isEncoded, word } = router.query;

    //const [retrievedWord, setRetrievedWord] = useState('');

    const getWord = (): string => {
        if (word) {
            if (isEncoded) return decodeWord(word as string);
            return word as string;
        } else {
            return 'omari';
        }
    };

    //setRetrievedWord(getWord());

    return (
        <menu className="flex h-full w-full flex-col place-content-center place-items-center dark:bg-dark-primary">
            <ButtonLink href={`/play ${word ? '?word=' + word : ''}`}>
                Play
            </ButtonLink>

            <ButtonLink href="/create">Create</ButtonLink>
        </menu>
    );
};

export default Home;
