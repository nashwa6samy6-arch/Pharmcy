"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLock, FaCheckCircle, FaArrowLeft, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash"); // طريقة الدفع
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // إذا الدفع بالبطاقة، لازم البيانات موجودة
    if (
      paymentMethod === "card" &&
      (!cardData.cardNumber || !cardData.cardName || !cardData.expiry || !cardData.cvv)
    ) {
      alert("من فضلك املأ بيانات البطاقة كاملة");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setOrderComplete(true);
      localStorage.removeItem("cart");
      setCartItems([]);
    }, 2000);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div style={{ minHeight: "80vh", textAlign: "center", padding: 40 }}>
        <FaArrowLeft style={{ fontSize: 50, color: "#888" }} />
        <h2>عربة التسوق فارغة</h2>
        <p>لا يمكن إتمام الدفع بدون منتجات</p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 20px",
            background: "#18358b",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          العودة للتسوق
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div style={{ minHeight: "80vh", textAlign: "center", padding: 40 }}>
        <FaCheckCircle style={{ fontSize: 60, color: "green", marginBottom: 10 }} />
        <h1>تم إتمام الطلب بنجاح!</h1>
        <p>شكراً لك، سيتم توصيل طلبك قريباً</p>
        <p style={{ fontWeight: "bold" }}>المبلغ المدفوع: {totalPrice} ج.م</p>
        <p>طريقة الدفع: {paymentMethod === "cash" ? "كاش عند الاستلام" : "بطاقة"} </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 20px",
            background: "#18358b",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          الاستمرار في التسوق
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", direction: "rtl" }}>
      <h1 style={{ textAlign: "center", color: "#18358b", marginBottom: 20 }}>
        إتمام الدفع
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginBottom: 10 }}>معلومات العميل</h2>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="الاسم الكامل"
            required
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="البريد الإلكتروني"
            required
            style={inputStyle}
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="رقم الهاتف"
            required
            style={inputStyle}
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="العنوان"
            required
            style={{ ...inputStyle, height: 80 }}
          />

          {/* Payment Method */}
          <h3 style={{ margin: "10px 0" }}>طريقة الدفع</h3>
          <div style={{ display: "flex", gap: 12 }}>
            <div
              onClick={() => setPaymentMethod("cash")}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: paymentMethod === "cash" ? "2px solid #18358b" : "1px solid #ccc",
                textAlign: "center",
                cursor: "pointer",
                background: "#f9f9f9",
              }}
            >
              <FaMoneyBillWave size={30} style={{ marginBottom: 6 }} />
              <div>كاش عند الاستلام</div>
            </div>

            <div
              onClick={() => setPaymentMethod("card")}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: paymentMethod === "card" ? "2px solid #18358b" : "1px solid #ccc",
                textAlign: "center",
                cursor: "pointer",
                background: "#f9f9f9",
              }}
            >
              <FaCreditCard size={30} style={{ marginBottom: 6 }} />
              <div>بطاقة</div>
            </div>
          </div>

          {/* Card Form يظهر فقط لو تم اختيار البطاقة */}
          {paymentMethod === "card" && (
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              <input
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardChange}
                placeholder="رقم البطاقة"
                required
                style={inputStyle}
              />
              <input
                name="cardName"
                value={cardData.cardName}
                onChange={handleCardChange}
                placeholder="اسم صاحب البطاقة"
                required
                style={inputStyle}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleCardChange}
                  placeholder="تاريخ الانتهاء (MM/YY)"
                  required
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  placeholder="CVV"
                  required
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={processing}
            style={{
              ...btnStyle,
              background: processing ? "#888" : "#18358b",
              marginTop: 20,
            }}
          >
            {processing ? "جاري المعالجة..." : "تأكيد الطلب والدفع"}
          </button>
        </form>

        {/* Summary */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            height: "fit-content",
          }}
        >
          <h2 style={{ marginBottom: 10 }}>ملخص الطلب</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span>{item.name} x{item.qty}</span>
              <span>{item.price * item.qty} ج.م</span>
            </div>
          ))}
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: 10,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            الإجمالي: {totalPrice} ج.م
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FaLock style={{ marginRight: 6, color: "green" }} />
            معاملة آمنة
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ddd",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};
