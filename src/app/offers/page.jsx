"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import offersData from "../../../data/offers.json" assert { type: "json" };
import Link from "next/link";

export default function OffersPage() {
  const offers = offersData.offers || [];
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (offer) => {
  const existing = cart.find((item) => item.id === offer.id);
  if (existing) {
    setCart(
      cart.map((item) =>
        item.id === offer.id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  } else {
    setCart([...cart, { ...offer, qty: 1, selected: true }]);
  }

  toast.success(`${offer.title} تمت إضافته للسلة`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};


  // === Component لعرض النجوم حسب التقييم ===
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="d-flex justify-content-center text-warning mb-2 fs-5">
        {"★".repeat(fullStars)}
        {halfStar && "★"}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  return (
    <>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {offers.map((offer) => (
            <div key={offer.id} className="col">
              <div className="card h-100 border-0 rounded-5 product-card-modern text-center position-relative">
                {/* شارة الخصم */}
                {offer.discount && (
                  <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-light rounded-pill px-3 py-2 fw-bold fs-6 shadow">
                    خصم {offer.discount}
                  </span>
                )}

                {/* الصورة */}
                <div className="image-wrapper-modern rounded-top-5 overflow-hidden">
                  <Image
                    src={offer.image}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    alt={offer.title}
                    width={300}
                    height={250}
                    unoptimized
                  />
                </div>

                <div className="card-body d-flex flex-column text-center pt-4 pb-3 px-3">
                  {/* اسم المنتج */}
                  <h5 className="card-title fw-bold mb-2 text-primary fs-5">
                    {offer.title}
                  </h5>

                  {/* التقييم */}
                  <StarRating rating={offer.rating || 4.5} />

                  {/* الأسعار */}
                  <div className="d-flex align-items-baseline gap-2 mb-3 justify-content-center">
                    <span className="fs-4 fw-bold text-primary">
                      {offer.newPrice}
                    </span>
                    <small className="text-muted text-decoration-line-through fs-6">
                      {offer.oldPrice}
                    </small>
                  </div>

                  {/* متوفر الآن */}
                  <p className="card-text mb-3 d-flex align-items-center justify-content-center gap-2 text-dark">
                    <span
                      className="bg-success rounded-circle"
                      style={{ width: "10px", height: "10px" }}
                    ></span>
                    {offer.availability || "متوفر الآن"}
                  </p>

                  {/* الأزرار */}
                  <div className="d-flex flex-column gap-3 mt-auto">
                    <button
                      className="btn btn-primary fw-bold btn-lg rounded-pill shadow-sm"
                      onClick={() =>
                        addToCart({
                          ...offer,
                          price: Number(
                            offer.newPrice.replace(/[^\d.]/g, "")
                          ),
                        })
                      }
                    >
                      <span className="me-2 fs-5">🛒</span> أضف إلى السلة
                    </button>

                    <Link
                      href={`/offerDetails/${offer.id}`}
                      className="btn btn-outline-primary fw-bold btn-lg rounded-pill"
                    >
                      تفاصيل المنتج
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

      {/* Toast notification */}
      <ToastContainer />

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Cairo', sans-serif;
          background: #f0f2f5; 
          margin: 0;
          padding: 0;
          direction: rtl; 
          text-align: right;
        }

        /* Modern Card Styling */
        .product-card-modern {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); 
          transition: all 0.3s ease-in-out; 
        }

        .product-card-modern:hover {
          transform: translateY(-8px); 
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15); 
        }

        .image-wrapper-modern {
          height: 220px; 
          background-color: #f8f9fa; 
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-wrapper-modern img {
          max-height: 100%; 
          width: 100%;
          object-fit: cover; 
          transition: transform 0.3s ease-in-out;
        }

        .product-card-modern:hover .image-wrapper-modern img {
          transform: scale(1.05); 
        }

        /* Toast Styles */
        .toast-modern {
          position: fixed;
          top: 20px;
          right: -300px;
          background: #0d6efd;
          color: #fff;
          padding: 15px 25px;
          border-radius: 12px;
          font-weight: bold;
          z-index: 9999;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          animation: slideInOut 5s ease forwards;
        }

        @keyframes slideInOut {
          0% { right: -300px; opacity: 0; }
          10% { right: 20px; opacity: 1; }
          80% { right: 20px; opacity: 1; }
          100% { right: -300px; opacity: 0; }
        }
      `}</style>
    </>
  );
}
