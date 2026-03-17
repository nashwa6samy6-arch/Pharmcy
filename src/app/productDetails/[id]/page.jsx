"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function generateStaticParams() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("/data/products.json");
      const data = await res.json();
      const found = data.find((p) => p.id.toString() === id);
      setProduct(found);
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const savedCart = localStorage.getItem("cart");
    let cart = savedCart ? JSON.parse(savedCart) : [];

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + quantity }
          : item
      );
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.priceNow.replace(/[^\d.]/g, "")),
        qty: quantity,
        selected: true,
        image: product.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ إشعار
    toast.success(`${product.name} تمت إضافته للسلة`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  if (!product) return <p className="text-center mt-5">جارٍ تحميل التفاصيل...</p>;

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: "1000px", minHeight: "500px", width: "100%" }}
      >
        <div className="row g-0 h-100">
          {/* صورة المنتج */}
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-light p-4">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-between text-end">
            <div>
              <h2 className="fw-bold text-primary mb-4" style={{ fontSize: "2.2rem" }}>
                {product.name}
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                {product.description}
              </p>

              {/* السعر */}
              <div className="d-flex justify-content-end align-items-baseline gap-3 mb-3 flex-row-reverse">
                <small className="text-decoration-line-through text-muted fs-6">
                  {product.priceOld}
                </small>
                <span className="fs-3 fw-bold text-primary">
                  {product.priceNow}
                </span>
              </div>

              {/* التوفر */}
              <p style={{ fontSize: "1.1rem" }}>
                <span className="fw-bold">التوفر:</span>{" "}
                <span className="text-success">{product.availability}</span>
              </p>

              {/* كمية المنتج */}
              <div className="d-flex justify-content-end align-items-center gap-2 mb-3 flex-row-reverse">
                <button
                  className="btn btn-sm btn-primary rounded-circle"
                  style={{ width: "35px", height: "35px" }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
                <span className="px-3 fw-bold" style={{ fontSize: "1.1rem" }}>
                  {quantity}
                </span>
                <button
                  className="btn btn-sm btn-primary rounded-circle"
                  style={{ width: "35px", height: "35px" }}
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                >
                  -
                </button>
              </div>
            </div>

            {/* زر السلة */}
            <button
              className="btn btn-primary btn-lg w-100 rounded-pill mt-4"
              style={{ fontSize: "1.2rem" }}
              onClick={addToCart}
            >
              🛒 أضف إلى السلة ({quantity})
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Toast */} 
      <ToastContainer />
    </div>
  );
}
