import Image from 'next/image';

interface HeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function Header({ title, subtitle, backgroundImage = '/img/header-bg.jpg' }: HeaderProps) {
    return (
        <div className="header" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="header-content">
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </div>
    );
} 