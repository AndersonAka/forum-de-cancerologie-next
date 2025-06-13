'use client';

import Image from 'next/image';

export default function ExpertsSection() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-blue-600 mb-2">+30</h1>
                                <h5 className="text-lg text-gray-700">
                                    Experts régionaux <br />& internationaux
                                </h5>
                            </div>
                            <div className="text-center">
                                <h5 className="text-lg text-gray-700">
                                    Des partages<br />d&apos;expériences
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            src="/img/people-connect.png"
                            alt="Experts connectés"
                            width={500}
                            height={300}
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
} 