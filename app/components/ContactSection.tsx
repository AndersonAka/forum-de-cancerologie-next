'use client';

import Image from 'next/image';

export default function ContactSection() {
    return (
        <section className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Contacts</h1>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-2/3 mb-6 md:mb-0">
                            <p className="text-gray-300 leading-relaxed">
                                ROCHE Côte d&apos;Ivoire SARL Ivoire Trade Center,
                                Cocody les ambassades Angle de la rue Hassan 2
                                et de la rue Booker Washington, Bâtiment D 1er étage
                                18 BP 2377 Abidjan 18, Côte d&apos;Ivoire Tél : +225 27 22 48 23 55
                                <br /><br />
                                M-CI-00000287
                            </p>
                        </div>
                        <div className="md:w-1/3 text-center">
                            <Image
                                src="/img/logo-roche-white.png"
                                alt="Logo Roche"
                                width={150}
                                height={60}
                                className="mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 