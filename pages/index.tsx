import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Yourdle</title>
                <meta name="description" content="Omaridle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Home;
