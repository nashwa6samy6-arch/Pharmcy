"use client";

import dynamic from "next/dynamic";

// Dynamically import Player to avoid SSR document error
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

export default function StepsSection() {
  return (
    <section className="steps-section">
      <div className="step-box">
        <Player
          src="/Medicine Pills.json"
          background="transparent"
          speed={1}
          loop
          autoplay
          style={{ height: 300, width: 300 }}
        />
      </div>

      <div className="step-box">
        <Player
          src="/Heartbeat Lottie Animation.json"
          background="transparent"
          speed={1}
          loop
          autoplay
          style={{ height: 300, width: 300 }}
        />
      </div>
    </section>
  );
}
