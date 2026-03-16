"use client";
import React from "react";

const steps = [
  {
    title: "اختر دواءك بسهولة",
    text: "ابحث وتصفح قائمة الأدوية والمكملات بشكل سريع ومرتب",
    icon: "💊",
  },
  {
    title: "أضف إلى قائمتك",
    text: "رتب كل ما تحتاجه في سلة أنيقة قبل الدفع",
    icon: "🛒",
  },
  {
    title: "توصيل آمن وسريع",
    text: "سنحرص على وصول الأدوية إليك بسرعة وأمان",
    icon: "🚚",
  },
];

export default function NewSteps() {
  return (
    <section
      className="py-5 text-center"
      style={{
        // تدرجات الأزرق الفاتح للخلفية
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
      }}
      dir="rtl"
    >
      <div className="container">
        <h2 className="fw-bold mb-3 fs-1 text-gradient">رحلتك العلاجية</h2>
        <p className="text-muted mb-5 fs-5">
          خطوات بسيطة لتصلك أدويتك بأمان وسهولة
        </p>
        <div className="row g-4 justify-content-center">
          {steps.map((step, index) => (
            <div key={index} className="col-md-6 col-lg-4 d-flex">
              <div className="step-card w-100">
                <div className="icon-wrap">{step.icon}</div>
                <h3 className="fw-bold fs-4 mt-3">{step.title}</h3>
                <p className="text-muted">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* العنوان بخط أزرق متدرج من فوق */
        .text-gradient {
          background: linear-gradient(to top, #1976d2, #2196f3); /* تدرج أزرق داكن وفاتح */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          opacity: 0;
          transform: translateY(-60px); /* يبدأ أعلى لإظهار الحركة من الأعلى للأسفل */
          animation: slideDown 0.9s forwards;
        }
        .step-card:nth-child(1) { animation-delay: 0.2s; }
        .step-card:nth-child(2) { animation-delay: 0.4s; }
        .step-card:nth-child(3) { animation-delay: 0.6s; }

        .step-card:hover {
          transform: scale(1.05) rotate(-1deg);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .icon-wrap {
          font-size: 3rem;
          width: 90px;
          height: 90px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e88e5, #42a5f5); /* تدرج أزرق للأيقونات */
          color: white;
          box-shadow: 0 0 20px rgba(33, 150, 243, 0.6); /* ظل أزرق */
          transition: transform 0.3s ease;
        }

        .step-card:hover .icon-wrap {
          transform: rotate(10deg) scale(1.1);
        }

        /* الانيميشن من فوق لتحت */
        @keyframes slideDown {
          to {
            opacity: 1;
            transform: translateY(0); /* يصل إلى مكانه الأصلي */
          }
        }
      `}</style>
    </section>
  );
}