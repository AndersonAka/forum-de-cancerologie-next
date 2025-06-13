import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="contacts-container">
            <div className="contact">
                <div className="title">
                    <h1>Contacts</h1>
                </div>
                <div className="flex ">
                    <p>
                        ROCHE Côte d&apos;Ivoire SARL Ivoire Trade Center,
                        Cocody les ambassades Angle de la rue Hassan 2
                        et de la rue Booker Washington, Bâtiment D 1er étage
                        18 BP 2377 Abidjan 18, Côte d&apos;Ivoire Tél : +225 27 22 48 23 55
                        <br /><br />
                        M-CI-00000287
                    </p>
                    <Image
                        src="/img/logo-roche-white.png"
                        alt="Logo Roche"
                        width={80}
                        height={45}
                    />
                </div>
            </div>
        </footer>
    );
} 