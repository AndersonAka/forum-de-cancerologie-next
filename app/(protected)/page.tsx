// Page d'accueil
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="popup-selector">
        <div className="popup-container">
            <div className="popup-title">
                <h1>
                    Sélectionnez une édition du forum
                </h1>
            </div>
            <div className="popup-group">
                <div className="popup-img ppimg-1">
                    <Link href="/edition-2025" className="img-selector">
                        <Image width={500} height={500} src="/img/edition-select-2025.png" alt="#" />
                    </Link>
                </div>

                <div className="popup-img ppimg-2">
                    <Link href="/edition-2024" className="img-selector">
                        <Image width={500} height={500} src="/img/edition-select-2024.png" alt="#" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}