"use client"

//Page d'accueil
import { ThemeTitle } from '../ThemeTitle';
import { ProgrammeElement } from './ProgrammeElement';

export const HomePage = () => {
    return (
        <header className='body-head'>
            <ThemeTitle />
            <ProgrammeElement />
        </header>
    );
}