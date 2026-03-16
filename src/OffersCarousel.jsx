"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

const banners = [
  {
    src: "https://cdn.chefaa.com/filters:format(webp)/fit-in/1256x522/public/uploads/sliders/images/gaojDZhgGHe7uYftWtoBVbse5Vtn7fT1y09a2SLq.jpg",
    alt: "pharmacare",
    bg: "linear-gradient(135deg, #bbdefb, #e3f2fd)", // أزرق فاتح
  },
  {
    src: "https://cdn.chefaa.com/filters:format(webp)/fit-in/1256x522/public/uploads/sliders/9lmVxpxubK5O7kIN1wNRJWFER6nGBqOFfFZE2OxG.png",
    alt: "pharmacare",
    bg: "linear-gradient(135deg, #90caf9, #e3f2fd)",
  },
  {
    src: "https://cdn.chefaa.com/filters:format(webp)/fit-in/1256x522/public/uploads/sliders/images/kpFXAqYQvgsAEmP49EIrKEZARn5pMHy6bk7Roed8.png",
    alt: "pharmacare",
    bg: "linear-gradient(135deg, #64b5f6, #bbdefb)",
  },
  {
    src: "https://cdn.chefaa.com/filters:format(webp)/fit-in/1256x522/public/uploads/sliders/images/66BzStgSYwD0Pyv2MpVlqZhvGchcG06UdAPOUqmv.png",
    alt: "pharmacare",
    bg: "linear-gradient(135deg, #42a5f5, #e3f2fd)",
  },
  {
    src: "https://cdn.chefaa.com/filters:format(webp)/fit-in/1256x522/public/uploads/sliders/VB83Mt4Y432LwpPKHwwYHBY9GwT9KQc2KkpjWx1G.png",
    alt: "pharmacare",
    bg: "linear-gradient(135deg, #2196f3, #bbdefb)",
  },
];

export default function OffersCarousel() {
  const intervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
    startAutoPlay();
  };

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prev) => (prev + 1) % banners.length);
    startAutoPlay();
  };

  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    startAutoPlay();
  };

  return (
    <div className="pharmacy-carousel">
      <style jsx>{`
        .pharmacy-carousel {
          max-width: 1200px;
          margin: 7rem auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .carousel-item {
          opacity: 0;
          transition: opacity 1s ease, transform 1s ease;
          transform: scale(1.05);
          position: absolute;
          inset: 0;
        }

        .carousel-item.active {
          opacity: 1;
          transform: scale(1);
          position: relative;
        }

        .carousel-image-container {
          height: 420px;
          position: relative;
        }

        /* ----- تخصيص الأسهم المحسّن (المعدل) ----- */
        .carousel-control-prev,
        .carousel-control-next {
          width: 48px;
          height: 48px;
          background-color: #2196f3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease; /* تم إزالة transform من الانتقال */
          opacity: 0.9;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          background-color: #1e88e5; /* لون أزرق أغمق (Material Design Blue 600) */
          opacity: 1;
          /* تم إزالة خاصية transform: scale(1.05); */
        }

        .carousel-control-prev {
          left: 15px;
        }
        .carousel-control-next {
          right: 15px;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          width: 24px;
          height: 24px;
          background-size: 100% 100%;
        }

        .carousel-control-prev-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3e%3cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3e%3c/svg%3e");
        }

        .carousel-control-next-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3e%3cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3e%3c/svg%3e");
        }


        /* ----- تخصيص المؤشرات (النقاط) ----- */
        .carousel-indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
          z-index: 10;
        }

        .carousel-indicators [data-bs-target] {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          border: none;
          opacity: 0.7;
          transition: background-color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
          cursor: pointer;
          padding: 0;
        }

        .carousel-indicators .active {
          background-color: #2196f3;
          opacity: 1;
          transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
          .carousel-image-container {
            height: 280px;
          }
          .carousel-control-prev,
          .carousel-control-next {
            width: 40px;
            height: 40px;
          }
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 20px;
            height: 20px;
          }
          .carousel-control-prev { left: 10px; }
          .carousel-control-next { right: 10px; }
        }

        @media (max-width: 576px) {
          .carousel-image-container {
            height: 200px;
          }
          .carousel-control-prev,
          .carousel-control-next {
            width: 32px;
            height: 32px;
          }
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 16px;
            height: 16px;
          }
          .carousel-control-prev { left: 5px; }
          .carousel-control-next { right: 5px; }
           .carousel-indicators {
             bottom: 5px;
             gap: 5px;
           }
           .carousel-indicators [data-bs-target] {
             width: 8px;
             height: 8px;
           }
        }
      `}</style>

      <div className="carousel slide">
        {/* مؤشرات الكاروسيل (النقاط) */}
        <div className="carousel-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#carouselIndicators`}
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? "active" : ""
                }`}
              style={{ background: banner.bg }}
            >
              <div className="carousel-image-container">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="img-fluid"
                  loading={index === 0 ? "eager" : "lazy"}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" onClick={handlePrev}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button className="carousel-control-next" type="button" onClick={handleNext}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}