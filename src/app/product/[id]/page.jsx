"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import productsData from "../../../../data/db.json";
import style from "./style.module.css";

export default function generateStaticParams() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // 🔹 Counter state

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.Products.find(
        (p) => String(p.id) === String(id) // تأكد من المقارنة كـ string
      );
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  // 🔹 Increase quantity
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  // 🔹 Decrease quantity (minimum 1)
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // 🔹 Add to Cart
  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = savedCart.find((p) => p.id === product.id);

    if (existing) {
      existing.qty += quantity;
    } else {
      savedCart.push({
        id: product.id,
        name: product.title || product.name,
        price: Number(product.price || product.newPrice || 0),
        qty: quantity,
        image: product.image || "/images/product-placeholder.jpg",
        selected: true,
      });
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));

    // ✅ يا إما تدي تنبيه، يا إما تنقله لصفحة الكارت
    if (confirm("✅ تمت إضافة المنتج إلى السلة. هل تريد الانتقال للسلة الآن؟")) {
      router.push("/cart");
    }
  };

  return (
    <section className={`productDetails p-5 ${style.ProductDetails}`}>
      <div
        className={`container p-5 d-flex justify-content-end ${style.container}`}
      >
        <div className="image px-5">
          <img src={product.image} alt={product.name} width="400" />
        </div>
        <div className="row ">
          <div
            className={`details d-grid justify-items-start px-5 ${style.details}`}
          >
            <h1>{product.title}</h1>
            <p style={{ fontSize: "18px" }}>{product.description}</p>
            <p style={{ fontWeight: "bold", fontSize: "24px" }}>
              {product.price} EGP
            </p>

            <div className="d-flex align-items-center my-3">
              <button
                className="btn btn-outline-secondary"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="mx-3 fs-5">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <button className="btn btn-lg px-5 btn-primary" onClick={addToCart}>
              إضافة إلى السلة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
