"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import productsData from "../../../data/products.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SearchPage.module.css"; // ✅ ملف الاستايل

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const results = productsData.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  // ⭐ عرض التقييم بالنجوم
  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i < rounded ? "#FFD700" : "#ccc",
            fontSize: "18px",
          }}
        >
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
  };

  // 🛒 إضافة للسلة
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.priceNow.replace(/[^\d.]/g, "")),
        qty: 1,
        selected: true,
        image: product.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} تمت إضافته للسلة`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.searchTitle}>
        نتائج البحث عن: <span className={styles.highlight}>"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {results.map((product) => (
              <div key={product.id} className="col">
                <div
                  className={`${styles.productCard} card h-100 border-0 rounded-5 text-center position-relative`}
                >
                  {product.discount && (
                    <span className={`${styles.discountBadge} badge`}>
                      خصم {product.discount.replace("-", "")}
                    </span>
                  )}

                  <div className={styles.imageWrapper}>
                    <img
                      src={product.image}
                      className="img-fluid w-100 h-100"
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="card-body d-flex flex-column text-center pt-4 pb-3 px-3">
                    <h5 className={styles.productTitle}>{product.name}</h5>

                    {renderStars(product.rating || 4)}
                    <small className="text-muted">
                      ({product.reviews} تقييم)
                    </small>

                    <div className={styles.priceWrapper}>
                      <span className={styles.priceNow}>
                        {product.priceNow}{" "}
                        <span className="fw-bold">EGP</span>
                      </span>
                      <small className={styles.priceOld}>
                        {product.priceOld} EGP
                      </small>
                    </div>

                    <p className={styles.availability}>
                      <span className={styles.dot}></span>
                      {product.availability}
                    </p>

                    <div className="d-flex flex-column gap-3 mt-auto">
                      <button
                        className={styles.addToCartBtn}
                        onClick={() => addToCart(product)}
                      >
                        <span className="me-2 fs-5">🛒</span> أضف إلى السلة
                      </button>

                      <Link
                        href={`/productDetails/${product.id}`}
                        className={styles.detailsBtn}
                      >
                        تفاصيل المنتج
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Toast */}
          <ToastContainer />
        </div>
      ) : (
        <p className={styles.noResults}>❌ لا توجد منتجات مطابقة.</p>
      )}
    </div>
  );
}
