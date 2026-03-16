"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";
import logo from "../../public/images/LOGO.png";
import Image from "next/image";

export default function Footer() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // تحميل البيانات + Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    fetch("/data/footerData.json")
      .then((res) => {
        if (!res.ok) throw new Error("فشل تحميل البيانات");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("حدث خطأ أثناء تحميل بيانات الفوتر"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.lucide) {
      window.lucide.createIcons();
    }
  }, [data]);

  if (error) return <div className="text-danger text-center my-4">{error}</div>;
  if (!data) return <div className="text-center my-4">جاري التحميل...</div>;

  // إعدادات الأنيميشن
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <footer className="custom-footer" dir="rtl">
      <div className="container">
        <div className="row gy-4">
          {/* اللوجو والمعلومات */}
          <motion.div
            className="col-lg-3 col-md-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="footer-logo">
              <Image src={logo} alt="Logo" width={60} height={60} />
              <h5>{data.logo.title}</h5>
              <p className="subtitle">{data.logo.subtitle}</p>
              <p className="desc">{data.description}</p>
              <div className="social-icons">
                {data.socialIcons.map((icon, i) => (
                  <motion.a
                    key={i}
                    href={icon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: "#ffcc00" }}
                  >
                    <i data-lucide={icon.name}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* روابط سريعة */}
          <motion.div
            className="col-lg-2 col-md-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <h5 className="footer-title">روابط سريعة</h5>
            <ul className="footer-links">
              {data.quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* خدمة العملاء */}
          <motion.div
            className="col-lg-2 col-md-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <h5 className="footer-title">خدمة العملاء</h5>
            <ul className="footer-links">
              {data.customerService.map((link, i) => (
                <li key={i}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* النشرة البريدية */}
          <motion.div
            className="col-lg-4 col-md-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <h5 className="footer-title">{data.newsletter.title}</h5>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder={data.newsletter.placeholder}
                className="form-control"
              />
              <motion.button
                className="btn btn-primary"
                type="submit"
                whileHover={{ scale: 1.05 }}
              >
                {data.newsletter.button}
              </motion.button>
            </form>
            <div className="payment-methods">
              {data.paymentMethods.map((method, i) => (
                <motion.img
                  key={i}
                  src={method.image}
                  alt={method.alt}
                  height={30}
                  className="payment-icon"
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.hr
          className="footer-separator"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          © {new Date().getFullYear()} جميع الحقوق محفوظة | {data.logo.title}
        </motion.p>
      </div>
    </footer>
  );
}
