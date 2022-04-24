import React from 'react';
import { WithChildrenProps } from '../types';
import Link from 'next/link';

type ButtonLinkProps = {
    href: string;
} & WithChildrenProps;

export default function ButtonLink({
    children,
    href,
}: ButtonLinkProps): JSX.Element {
    return (
        <Link href={href}>
            <a className="active: m-5 flex h-20 w-1/2 items-center justify-center rounded border border-neutral-800 text-2xl duration-300 ease-in-out hover:-translate-y-4 hover:invert active:-translate-y-2 dark:bg-dark-primary dark:text-white">
                {children}
            </a>
        </Link>
    );
}
