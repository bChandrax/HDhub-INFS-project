import { useEffect, useState } from "react";

export default function IntroOverlay({ onComplete }) {
    const [phase, setPhase] = useState("idle");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("wipe"), 200);   // slight delay so CSS is ready
        const t2 = setTimeout(() => setPhase("zoom"), 2100);  // wipe runs for ~1.2s then zoom starts
        const t3 = setTimeout(() => onComplete(), 2800);      // zoom runs for ~1.2s then unmount
        return () => [t1, t2, t3].forEach(clearTimeout);
    }, []);

    return (
        <div className={`intro-overlay ${phase}`}>
            <div className="roll-1">HD</div>
            <div className="roll-2">HD</div>
        </div>
    );
}