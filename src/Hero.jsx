"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, HeartPulse, Stethoscope, Pill } from "lucide-react";
import animationData from "../public/data/healthinsurance.json";

// Dynamic import للـ Lottie
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="hero">
      {/* فقاعات الخلفية */}
      <ul className="bubbles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      <div className="container hero-container">
        {/* النصوص */}
        <div className="hero-text">
          <h1 className="hero-title">صحتك أولويتنا</h1>
          <p className="hero-subtitle">
            اطلب أدويتك بسهولة ووصلها لحد باب بيتك في دقائق
          </p>
          <p className="hero-desc">
            مع <strong>موقعنا الطبي</strong>، كل اللي تحتاجه من أدوية وخدمات صحية في مكان واحد.
          </p>
          <button className="hero-btn">
            تسوق الآن <ArrowLeft className="btn-icon" size={20} />
          </button>
        </div>

        {/* الأنيميشن */}
        <div className="hero-visual">
          <div className="hero-animation-wrapper">
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: "400px", width: "400px" }}
            />

            {/* أيقونات متحركة حوالين الأنيميشن */}
            <div className="floating-icon icon1">
              <HeartPulse size={32} />
            </div>
            <div className="floating-icon icon2">
              <Stethoscope size={32} />
            </div>
            <div className="floating-icon icon3">
              <Pill size={32} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
        }
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }
        .hero-text {
          flex: 1;
          min-width: 320px;
        }
        .hero-title {
          font-size: 54px;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .hero-subtitle {
          font-size: 24px;
          margin-bottom: 15px;
        }
        .hero-desc {
          font-size: 18px;
          margin-bottom: 30px;
          color: #f1f1f1;
        }
        .hero-btn {
          background: #fff;
          color: #0072ff;
          border: none;
          padding: 16px 34px;
          border-radius: 40px;
          font-weight: 600;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .hero-btn:hover {
          background: #f1f1f1;
          transform: translateY(-3px);
        }
        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
        }
        .hero-animation-wrapper {
          position: relative;
        }
        /* الأيقونات الطبية */
        .floating-icon {
          position: absolute;
          color: #fff;
          opacity: 0.9;
          animation: float 4s ease-in-out infinite;
        }
        .icon1 {
          top: -30px;
          left: -40px;
          animation-delay: 0s;
        }
        .icon2 {
          bottom: -20px;
          right: -30px;
          animation-delay: 1s;
        }
        .icon3 {
          top: 40%;
          right: -50px;
          animation-delay: 2s;
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }

        /* فقاعات الخلفية */
        .bubbles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        .bubbles li {
          position: absolute;
          list-style: none;
          display: block;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.3);
          bottom: -150px;
          border-radius: 50%;
          animation: bubble 20s infinite;
        }
        .bubbles li:nth-child(1) {
          left: 10%;
          width: 40px;
          height: 40px;
          animation-duration: 18s;
        }
        .bubbles li:nth-child(2) {
          left: 20%;
          width: 25px;
          height: 25px;
          animation-duration: 22s;
          animation-delay: 2s;
        }
        .bubbles li:nth-child(3) {
          left: 35%;
          width: 15px;
          height: 15px;
          animation-duration: 25s;
          animation-delay: 4s;
        }
        .bubbles li:nth-child(4) {
          left: 50%;
          width: 50px;
          height: 50px;
          animation-duration: 20s;
          animation-delay: 0s;
        }
        .bubbles li:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-duration: 17s;
          animation-delay: 3s;
        }
        .bubbles li:nth-child(6) {
          left: 75%;
          width: 35px;
          height: 35px;
          animation-duration: 26s;
          animation-delay: 5s;
        }
        .bubbles li:nth-child(7) {
          left: 85%;
          width: 25px;
          height: 25px;
          animation-duration: 21s;
          animation-delay: 1s;
        }
        .bubbles li:nth-child(8) {
          left: 95%;
          width: 30px;
          height: 30px;
          animation-duration: 24s;
          animation-delay: 4s;
        }

        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
