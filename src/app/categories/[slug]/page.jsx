"use client";

import { useEffect, useState } from "react";
import productsData from "../../../../data/db.json";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page({ params }) {
  const { slug } = params;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // ⭐ دالة عرض النجوم
  const renderStars = (rating) => {
    const starsCount = (rating?.split("★").length || 0) - 1;
    return (
      <div className="d-flex justify-content-center text-warning mb-2 fs-5">
        {"★".repeat(starsCount > 0 ? starsCount : 4)}
        {"☆".repeat(5 - (starsCount > 0 ? starsCount : 4))}
      </div>
    );
  };

  // 🛒 دالة إضافة للسلة
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: product.id,
          name: product.title,
          price: Number(product.newPrice || product.price || 0),
          qty: 1,
          image: product.image,
          selected: true,
        },
      ];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // ✅ إشعار
    toast.success(`${product.title} تمت إضافته للسلة`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const products = productsData.Products || [];
  const categories = productsData.categories || [];

  const category = categories.find(
    (cat) => cat.slug.toLowerCase() === slug.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) => product.categories?.toLowerCase() === slug.toLowerCase()
  );

  return (
    <section className="section-products py-5">
      <div className="container">
        <h1 className="mb-4">{category ? category.title : "المنتجات"}</h1>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 border-0 rounded-5 product-card-modern text-center position-relative dark-card">
                {/* خصم */}
                {product.discount && (
                  <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-light rounded-pill px-3 py-2 fw-bold fs-6 shadow">
                    خصم {product.discount.replace("-", "")}
                  </span>
                )}

                {/* الصورة */}
                <div className="image-wrapper-modern rounded-top-5 overflow-hidden">
                  <img
                    src={product.image}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    alt={product.title}
                    loading="lazy"
                  />
                </div>

                {/* تفاصيل المنتج */}
                <div className="card-body d-flex flex-column text-center pt-4 pb-3 px-3">
                  <h5 className="card-title fw-bold mb-2 text-primary fs-5">
                    {product.title}
                  </h5>

                  {renderStars(product.rating || "★★★★☆")}
                  <small className="text-muted">
                    ({product.reviews || 20} تقييم)
                  </small>

                  <div className="d-flex align-items-baseline gap-2 mb-3 justify-content-center">
                    <span className="fs-4 fw-bold text-primary">
                      {product.newPrice || product.price}{" "}
                      <span className="fs-4 fw-bold">EGP</span>
                    </span>
                    {product.oldPrice && (
                      <small className="text-muted text-decoration-line-through fs-5 fw-bold">
                        {product.oldPrice} EGP
                      </small>
                    )}
                  </div>

                  <p className="card-text mb-4 d-flex align-items-center justify-content-center gap-2 text-dark">
                    <span
                      className="bg-success rounded-circle"
                      style={{ width: "10px", height: "10px" }}
                    ></span>
                    {product.availability || "متاح"}
                  </p>

                  {/* الأزرار */}
                  <div className="d-flex flex-column gap-3 mt-auto">
                    <button
                      className="btn btn-primary fw-bold btn-lg rounded-pill shadow-sm"
                      onClick={() => addToCart(product)}
                    >
                      <span className="me-2 fs-5">🛒</span> أضف إلى السلة
                    </button>

                    <Link
                      href={`/product/${product.id}`}
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

      {/* ✅ Toast */}
      <ToastContainer />

      <style jsx global>{`
        .dark-card {
          background-color: #f8f9fa; /* أبيض غامق */
        }

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
      `}</style>
    </section>
  );
}
