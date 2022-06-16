import React from 'react';

const Navbar = (): JSX.Element => {
    return (
        <header className="z-10 flex h-16 w-full flex-shrink-0 items-center justify-center border-b border-dark-accent font-logo text-3xl shadow-md dark:bg-dark-primary dark:text-white">
            <h1>Yourdle</h1>
        </header>
    );
};

export default Navbar;
