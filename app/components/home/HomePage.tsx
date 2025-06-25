"use client"

//Page d'accueil
import { ThemeTitle } from '../ThemeTitle';
import { ProgrammeElement } from './ProgrammeElement';
import VideoSection from '../VideoSection';

export const HomePage = () => {
    return (
        <header className='body-head'>
            <ThemeTitle />
            <VideoSection
                src="https://medias.forumcancerologie-roche.com/teaser-forum-de-cancerologie.mp4"
                title=""
                className="mt-8 mb-4"
            />
            <ProgrammeElement />
        </header>
    );
}