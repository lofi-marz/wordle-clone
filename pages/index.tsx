import type { NextPage } from 'next';
import Head from 'next/head';

import WordleGame from '../components/WordleGame';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Omaridle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen w-screen">
                <WordleGame />
            </main>
        </div>
    );
};

export default Home;
