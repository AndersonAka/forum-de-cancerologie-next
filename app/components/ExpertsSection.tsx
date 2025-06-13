'use client';

import Image from 'next/image';

export default function ExpertsSection() {
    return (
        <div className="experts">
            <div className="expert-text">
                <div className="expert exp-1">
                    <h1>+30</h1>
                    <h5>
                        Experts régionaux <br />& internationaux
                    </h5>
                </div>
                <div className="expert exp-2">
                    <h5 >
                        Des partages<br />d&apos;expériences
                    </h5>
                </div>
            </div>
            <div className="expert-des">
                <Image
                    src="/img/people-connect.png"
                    alt="Experts connectés"
                    width={500}
                    height={300}
                    className="mx-auto"
                />
            </div>
        </div>
    );
} 