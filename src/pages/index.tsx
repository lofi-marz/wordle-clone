import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import ButtonLink from '../components/ButtonLink';

const Home: NextPage = () => {
    const router = useRouter();
    const { word } = router.query;

    //const [retrievedWord, setRetrievedWord] = useState('');

    //setRetrievedWord(getWord());

    return (
        <menu className="flex h-full w-full flex-col place-content-center place-items-center dark:bg-dark-primary">
            <ButtonLink href={`/play ${word ? '?code=' + word : ''}`}>
                Play
            </ButtonLink>

            <ButtonLink href="/create">Create</ButtonLink>
        </menu>
    );
};

export default Home;
