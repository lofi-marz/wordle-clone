import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import { decodeWord, encodeWord } from '../word-encoder';

const CreateWordle: NextPage = () => {
    //TODO: Look at how to do a share page
    /*
        Word
        Allow Anything
        Max Guesses
     */

    const ShareLink = ({ link }: { link: string }): JSX.Element => {
        return <div>{link}</div>;
    };

    const [shareLink, setShareLink] = useState('');

    const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
        const encodedWord = encodeWord(e.currentTarget.value);
        console.log(decodeWord(encodedWord));
        setShareLink(`localhost:3000/play?isEncoded=true;word=${encodedWord}`);
    };

    return (
        <form className="flex flex-col items-center justify-center text-2xl">
            <input
                type="text"
                className="dark:text-black"
                onChange={handleChange}
            />
            <button type="submit">Share</button>
            <ShareLink link={shareLink} />
        </form>
    );
};

export default CreateWordle;
