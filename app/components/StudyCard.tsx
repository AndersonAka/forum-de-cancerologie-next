import Image from 'next/image';

interface StudyCardProps {
    title: string;
    description: string;
    imageUrl: string;
    pdfUrl: string;
}

export default function StudyCard({ title, description, imageUrl, pdfUrl }: StudyCardProps) {
    return (
        <div className="study-card">
            <div className="study-image">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={300}
                    height={200}
                    className="study-img"
                />
            </div>
            <div className="study-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="study-link">
                    Voir l&apos;étude
                </a>
            </div>
        </div>
    );
} 