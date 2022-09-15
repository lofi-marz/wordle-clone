import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { WordleConfig } from '../wordle/wordle';
import { generateConfigCode } from '../word-encoder/word-encoder';

type FormData = WordleConfig;

const ShareLink = ({ link }: { link: string }): JSX.Element => {
    return (
        <output className="flex h-16 w-full rounded text-xl dark:bg-white dark:text-black">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(link);
                }}
                className="h-full rounded-l  bg-blue-400 p-5">
                <FaLink />
            </button>
            <span className="box-border flex select-all items-center justify-self-end truncate p-5">
                {link}
            </span>
        </output>
    );
};

const CreateWordle: NextPage = () => {
    //TODO: Look at how to do a share page
    /*
        Word
        Allow Anything
        Max Guesses
     */

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const watchAllFields = watch();

    const [shareLink, setShareLink] = useState('');

    useEffect(() => {
        console.log(watchAllFields);
        const encodedConfig = generateConfigCode(watchAllFields);
        console.log(`Code: ${encodedConfig}`);
        //console.log(decodeConfigCode(encodedConfig));
        setShareLink(`/play?code=${encodedConfig}`);
    }, [watchAllFields]);

    return (
        <form className="flex h-full w-full flex-col items-center justify-evenly p-10 text-2xl md:w-1/2">
            <label className="flex w-full items-center justify-between text-left">
                <input
                    type="text"
                    className="h-16 w-full rounded border p-5 text-center text-2xl dark:border-dark-accent dark:bg-white dark:text-black"
                    placeholder="Word"
                    {...register('word')}
                />
            </label>

            <label className="flex w-full items-center justify-between text-left">
                Max Guesses
                <input
                    type="number"
                    min="1"
                    max="8"
                    step="1"
                    className="h-16 w-16 rounded text-center dark:text-black"
                    {...register('maxGuesses', { min: 1, max: 8 })}
                />
            </label>

            <label className="flex w-full items-center justify-between text-left">
                Allow anything?
                <input
                    type="checkbox"
                    className="h-16 w-16 rounded"
                    {...register('allowAnything')}
                />
            </label>

            <ShareLink link={shareLink} />
        </form>
    );
};

export default CreateWordle;
