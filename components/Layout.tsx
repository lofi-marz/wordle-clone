import React from 'react';
import Navbar from './Navbar';
import useWindowDimensions from './useWindowDimensions';
import classNames from 'classnames';
import Head from 'next/head';
import { WithChildrenProps } from '../types';

type LayoutProps = WithChildrenProps;

export default function Layout({ children }: LayoutProps) {
    const { height, width } = useWindowDimensions();

    return (
        <div
            className={classNames('dark dark:bg-dark-800 z-10 flex flex-col')}
            style={{ height: height ?? 0, width: width ?? 0 }}>
            <Head>
                <title>Yourdle</title>
                <meta name="description" content="Yourdle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <main className="z-0 h-full w-full dark:bg-dark-primary dark:text-white">
                {children}
            </main>
        </div>
    );
}
