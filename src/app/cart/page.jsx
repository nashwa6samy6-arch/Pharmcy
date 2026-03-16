"use client";
import Link from "next/link";

import styles from "./Form.module.css";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "../../../data/products.json";
import offersData from "../../../data/offers.json";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("+201");
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(20);
  const invoiceRef = useRef(null);

  // 🟢 تحميل بيانات السلة من localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) return;

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) return;

      const offersArray = Array.isArray(offersData)
        ? offersData
        : offersData?.offers || []; // ✅ تأكد إنها Array

      const parsed = parsedCart.map((p) => {
        const offerMatch = offersArray.find(
          (o) => o?.id?.toString() === p?.id?.toString()
        );

        const productMatch = productsData.find(
          (pr) => pr?.id?.toString() === p?.id?.toString()
        );

        const finalPrice =
          (offerMatch && Number(offerMatch.priceNow)) ||
          (productMatch && Number(productMatch.priceNow)) ||
          0;

        return {
          ...p,
          name: p.name || offerMatch?.title || productMatch?.name || "منتج",
          price: finalPrice,
          qty: p.qty || 1,
          selected: p.selected ?? true,
          image:
            p.image ||
            offerMatch?.image ||
            productMatch?.image ||
            "/images/product-placeholder.jpg",
        };
      });

      setCart(parsed);
    } catch (error) {
      console.error("Error parsing cart:", error);
      setCart([]); // في حالة خطأ خليه فاضي
    }
  }, []);

  // 🟢 تحديث localStorage لما تتغير السلة
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // 🟢 حسابات
  const selectedItems = useMemo(() => cart.filter((p) => p.selected), [cart]);
  const productsSubtotal = useMemo(
    () => selectedItems.reduce((s, p) => s + p.price * p.qty, 0),
    [selectedItems]
  );
  const total = productsSubtotal + (selectedItems.length ? deliveryFee : 0);

  // 🟢 دوال التحكم
  const toggleSelect = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );

  const changeQty = (id, delta) =>
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
      )
    );

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const generatePDF = async () => {
    if (!selectedItems.length) {
      alert("من فضلك اختر منتجًا واحدًا على الأقل للطباعة");
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: [12, 12, 12, 12],
      filename: `invoice_${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    window.scrollTo(0, 0);

    try {
      await html2pdf().set(opt).from(invoiceRef.current).save();
    } catch (err) {
      console.error("html2pdf error:", err);
      alert("حَدَثَ خطأ أثناء توليد الـ PDF — افتح الكونسول للمزيد من التفاصيل.");
    }
  };


  const handleChange = (e) => {
    let value = e.target.value;

    // تأكد إن المدخل بيبدأ بـ +201
    if (!value.startsWith("+201")) {
      value = "+201";
    }

    // السماح فقط بالأرقام بعد +201
    value = "+201" + value.slice(4).replace(/\D/g, "");

    // منع إدخال أكتر من 11 رقم بعد +20 (الطول الكلي = 13)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhone(value);
  };

  const isValid = phone.length === 13; // الطول الكلي لازم يكون 13 (+201 + 9 أرقام)
  


  return (
    <div
      style={{
        direction: "rtl",
        fontFamily: "Cairo, Tahoma, Arial, sans-serif",
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "#18358b", marginBottom: 18 }}>
          🛒 سلة الطلبات
        </h1>

        {/* Products list */}
        <div style={{ display: "grid", gap: 12 }}>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 90px 1fr auto",
                  gap: 12,
                  alignItems: "center",
                  background: "#fff",
                  padding: 12,
                  borderRadius: 12,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelect(item.id)}
                  title="تحديد للشراء"
                  style={{ width: 20, height: 20 }}
                />

                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/images/product-placeholder.jpg";
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong>{item.name}</strong>
                    <span style={{ color: "#16a34a", fontWeight: 700 }}>
                      {item.price} ج.م
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      style={btnSmallStyle}
                    >
                      −
                    </button>
                    <motion.span
                      key={item.qty}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      style={{ minWidth: 26, textAlign: "center" }}
                    >
                      {item.qty}
                    </motion.span>
                    <button
                      onClick={() => changeQty(item.id, +1)}
                      style={btnSmallStyle}
                    >
                      +
                    </button>

                    <div style={{ marginLeft: 8 }}>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          ...btnSmallStyle,
                          background: "#ef4444",
                          width: "auto",
                        }}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCart([])}
              style={{ ...btnPrimaryStyle, background: "#ef4444" }}
            >
              إفراغ السلة
            </button>
          </div>
        </div>

        {/* Form + Summary + Invoice preview */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 16,
          }}
        >
          {/* Left: Form */}
          <div
            style={{
              background: "#fff",
              padding: 14,
              borderRadius: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ marginBottom: 8 }}>بيانات المستخدم</h3>

            <label class="label">رقم الموبايل</label>

            <div className={styles.inputContainer}>
              <input
                type="text"
                value={phone}
                onChange={handleChange}
                placeholder="+20 1XXXXXXXXX"
                className={`${styles.input} ${isValid ? styles.valid : styles.invalid}`}
              />

              <span className={`${styles.icon} ${isValid ? styles.success : styles.error}`}>
                {isValid ? "✅" : "❌"}
              </span>
            </div>

            <p className={`${styles.message} ${isValid ? styles.successText : styles.errorText}`}>
              {isValid ? "✅ الرقم صحيح" : "⚠️ يجب أن يبدأ بـ 01 2+ ويحتوي على 11 رقم"}
            </p>

            <div>
              <label className={styles.label}>📍 العنوان</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="العنوان التفصيلي"
                className={styles.textarea}
              />
            </div>

            <label style={labelStyle}>🚚 سعر التوصيل (جنيه)</label>
            <span
              style={{
                ...inputStyle,
                width: 140,
                display: "inline-block",
                textAlign: "center",
              }}
            >
              {deliveryFee} جنيه
            </span>

            <div style={{ marginTop: 12 }}>
              <button
                onClick={generatePDF}
                style={{ ...btnPrimaryStyle, width: "100%" }}
              >
                🧾 طباعة الفاتورة PDF
              </button>
            </div>
          </div>

          {/* Right: Summary + Invoice Preview */}
          <div>
            <div
              style={{
                background: "#fff",
                padding: 12,
                borderRadius: 12,
                marginBottom: 12,
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
              }}
            >
              <h4>الملخص</h4>
              <p>
                سعر المنتجات: <strong>{productsSubtotal}</strong> ج.م
              </p>
              <p>
                سعر التوصيل:{" "}
                <strong>{selectedItems.length ? deliveryFee : 0}</strong> ج.م
              </p>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#e11d48",
                }}
              >
                الإجمالي الكلي: {total} ج.م
              </p>
            </div>

            {/* Invoice Preview */}
            <div
              ref={invoiceRef}
              style={{
                background: "#fff",
                padding: 14,
                borderRadius: 12,
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
              }}
            >

              <div
                className="logo"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center", // يخليها في النص أفقي
                  alignItems: "center", // في النص عمودي
                  marginBottom: 15,
                }}
              >
                <img
                  src="/images/LOGO.png"
                  alt="Company Logo"
                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
              </div>

              <h2 style={{ textAlign: "center", marginBottom: 8 }}>
                فاتورة مشتريات
              </h2>

              <div style={{ fontSize: 14, marginBottom: 8 }}>
                <div>📞 رقم المستخدم: {phone || "-"}</div>
                <div>📍 العنوان: {address || "-"}</div>
                <div>
                  🗓 التاريخ: {new Date().toLocaleDateString("ar-EG")}
                </div>
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr style={{ background: "#357dcf", color: "#fff" }}>
                    <th style={thStyle}>المنتج</th>
                    <th style={thStyle}>الكمية</th>
                    <th style={thStyle}>سعر الوحدة</th>
                    <th style={thStyle}>الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((si) => (
                    <tr key={si.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={tdStyle}>{si.name}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        {si.qty}
                      </td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        {si.price} ج.م
                      </td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        {si.price * si.qty} ج.م
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: 10, textAlign: "right" }}>
                <div>
                  سعر التوصيل: {selectedItems.length ? deliveryFee : 0} ج.م
                </div>
                <div style={{ marginTop: 6, fontWeight: 800 }}>
                  الإجمالي: {total} ج.م
                </div>
                <div style={{ marginTop: 6, fontWeight: 300 }}>
                  شكرأ لتسوقك معنا ---- هده الفاتوة مولده من موقعنا --حافظ عليها عند الاستلام
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <Link href="/checkout" className={`${styles.linkButton} ${styles.linkPrimary}`}>
          إتمام الشراء
        </Link>

        <Link href="/" className={`${styles.linkButton} ${styles.linkSecondary}`}>
          الاستمرار في التسوق
        </Link>

      </div>
    </div>
  );
}

// Small inline styles
const btnSmallStyle = {
  border: "none",
  background: "#2563eb",
  color: "#fff",
  width: 28,
  height: 28,
  borderRadius: 8,
  cursor: "pointer",
};
const btnPrimaryStyle = {
  border: "none",
  background: "#18358b",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 700,
};
const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  outline: "none",
  marginTop: 6,
  marginBottom: 10,
  fontSize: 14,
};

const labelStyle = { display: "block", marginTop: 6, fontWeight: 600 };
const thStyle = { padding: "8px 10px", textAlign: "right" };
const tdStyle = { padding: "8px 10px", textAlign: "right" };
