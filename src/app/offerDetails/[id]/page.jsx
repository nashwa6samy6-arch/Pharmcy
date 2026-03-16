"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import productsData from "../../../../data/offers.json";
import style from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.offers.find((f) => f.id.toString() === id.toString());
      setOffer(foundProduct);
    }
  }, [id]);

  if (!offer) {
    return <p className="text-center text-primary fs-4">جاري تحميل العرض...</p>;
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // 🛒 إضافة إلى السلة
// 🛒 إضافة إلى السلة
const addToCart = () => {
  const savedCart = localStorage.getItem("cart");
  let cart = savedCart ? JSON.parse(savedCart) : [];

  const existing = cart.find((item) => item.id === offer.id);
  if (existing) {
    cart = cart.map((item) =>
      item.id === offer.id
        ? { ...item, qty: item.qty + quantity }
        : item
    );
  } else {
    cart.push({
      id: offer.id,
      name: offer.title,
      price: Number(offer.newPrice.replace(/[^\d.]/g, "")),
      qty: quantity,
      selected: true,
      image: offer.image,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

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


  return (
    <section className={`ProductDetails py-5 ${style.ProductDetails}`}>
      <div
        className={`bigCard ${style.bigCard} card shadow-lg rounded-4 p-4`}
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        {/* صورة المنتج */}
        <div className={`${style.imageWrapper} mb-4`}>
          <img
            src={offer.image}
            alt={offer.title}
            className={`img-fluid rounded ${style.productImage}`}
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* تفاصيل العرض */}
        <div className={style.details}>
          <h1 className="fw-bold text-primary mb-3">{offer.title}</h1>
          <p className="text-muted mb-3">{offer.description}</p>

          {/* الأسعار */}
          <div className="d-flex justify-content-end align-items-baseline gap-3 mb-3 flex-row-reverse">
            <span className="text-decoration-line-through text-muted fs-6">
              {offer.oldPrice}
            </span>
            <span className="fs-3 fw-bold text-primary">{offer.newPrice}</span>
          </div>

          {/* الكمية */}
          <div className="d-flex justify-content-end align-items-center gap-2 mb-3 flex-row-reverse">
            <button
              className="btn btn-sm btn-primary rounded-circle"
              style={{ width: "35px", height: "35px" }}
              onClick={increaseQuantity}
            >
              +
            </button>
            <span className="px-3 fw-bold" style={{ fontSize: "1.1rem" }}>
              {quantity}
            </span>
            <button
              className="btn btn-sm btn-primary rounded-circle"
              style={{ width: "35px", height: "35px" }}
              onClick={decreaseQuantity}
            >
              -
            </button>
          </div>

          {/* زر السلة */}
          <button
            className="btn btn-primary btn-lg w-100 rounded-pill mt-4"
            style={{ fontSize: "1.2rem" }}
            onClick={addToCart}
          >
            🛒 إضافة إلى السلة ({quantity})
          </button>
        </div>
      </div>

      {/* ✅ Toast */}
      <ToastContainer />

      <style>{`
        .toast-modern {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #0d6efd;
          color: #fff;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: bold;
          z-index: 9999;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          animation: slideIn 0.5s ease, fadeOut 1s ease 3s forwards;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(30px); }
        }
      `}</style>
    </section>
  );
}
