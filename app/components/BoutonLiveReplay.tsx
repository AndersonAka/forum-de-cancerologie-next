// Bouton live et replay
import Link from "next/link";
import Image from "next/image";

interface BoutonLiveReplayProps {
    activeReplay?: boolean;
    activeLive?: boolean;
    width?: number;
    height?: number;
}

export const BoutonLiveReplay = ({ activeReplay = true, activeLive = true, width = 270, height = 65 }: BoutonLiveReplayProps) => {
    return (
        <div className="live-replay">
            {activeLive && (
                <Link href="/direct" className={`live lv1 ${activeLive ? 'active' : ''}`}><Image src="/img/live.png" alt="#" width={width} height={height} /></Link>
            )}
            {activeReplay && (
                <Link href="/rediffusion" className={`live lv2 ${activeReplay ? 'active' : ''}`}><Image src="/img/replay.png" alt="#" width={width} height={height} /></Link>
            )}
        </div>
    );
};