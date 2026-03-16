"use client";
import React, { useState, useEffect } from "react";

// import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/LOGO.png";
import Link from "next/link";
import styleNavbar from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faTag,
  faBell,
  faHeartPulse,
  faCircleQuestion,
  faCapsules,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import styled from "styled-components"; // مهم
// serch
const StyledWrapper = styled.div`
  .navbar-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    background-color: rgba(21, 37, 102, 1);
    padding: 0.5rem 1rem;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    border: 1px solid #2a2b33;
  }

  .search-bar:focus-within {
    background-color: #0e1c59ff;
    border-color: #00ff99;
    box-shadow: 0 4px 15px rgba(0, 255, 153, 0.35);
  }

  .search-bar:hover {
    background-color: #222533;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  }

  .InputContainer {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 0.75rem;
  }

  .input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: none;
    color: #f0f0f0;
    padding: 0.5rem 0;
    font-family: inherit;
  }

  .input::placeholder {
    color: #ffffffff;
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  .input:focus::placeholder {
    opacity: 0.5;
  }

  .searchIcon {
    width: 20px;
    height: 20px;
    fill: #fff9f9ff;
    transition: fill 0.2s ease;
  }

  .search-bar:focus-within .searchIcon {
    fill: #00ff99;
  }

  .border {
    width: 1px;
    height: 24px;
    background-color: #433c3aff;
    margin: 0 0.75rem;
  }

  .micButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .micButton:hover {
    background-color: #2a2b33;
  }

  .micIcon {
    width: 18px;
    height: 18px;
    fill: #fffbfbff;
    transition: fill 0.2s ease;
  }

  .micButton:hover .micIcon {
    fill: #ff5100;
  }
// Styled Components لازم تكون برّه الـ function

  .cartBtn {
    width: 155px;
    height: 50px;
    border: none;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 70px;
    gap: 7px;
    color: white;
    font-weight: 500;
    position: relative;
    background-color: rgba(21, 37, 102, 1);
    box-shadow: 0 20px 30px -7px rgba(29, 17, 17, 0.74);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    overflow: hidden;
  }

  .cart {
    z-index: 3;
  }

  .cartBtn:active {
    transform: scale(0.96);
  }

  .product {
    position: absolute;
    width: 12px;
    border-radius: 3px;
    content: "";
    left: 23px;
    bottom: 23px;
    opacity: 0;
    z-index: 1;
    fill: rgb(211, 211, 211);
  }

  .cartBtn:hover .product {
    animation: slide-in-top 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-30px);
      opacity: 1;
    }

    100% {
      transform: translateY(0) rotate(-90deg);
      opacity: 1;
    }
  }

  .cartBtn:hover .cart {
    animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }`;


export default function Navbar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // تحميل البيانات من data.json
  useEffect(() => {
    fetch("/data/db.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  // فلترة المنتجات عند الكتابة
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchValue, products]);

  if (pathname.startsWith("/login")) return null;
  return (
    <header className={`header ${styleNavbar.header}`}>
      {/* Top Bar */}
      <div className={`top-bar ${styleNavbar.topbar}`}>
        <div className="container">
          <div className={`top-bar-content ${styleNavbar.topbarcontent}`}>
            <button className={`loginbtn ${styleNavbar.loginbtn}`}>
              <Link href="/login">تسجيل الدخول</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`main-header ${styleNavbar.mainheader}`}>
        <div className="container">
          <div className={`header-content ${styleNavbar.headercontent}`}>
            {/* Logo */}
            <div className={`logo-section ${styleNavbar.logosection}`}>
              <div className={`logo-circle ${styleNavbar.logocircle}`}>
                <Image src={Logo} alt="PharmaCare Logo" width={50} height={50} />
              </div>
              <div className={`logo-text ${styleNavbar.logotext}`}>
                <h1>PharmaCare</h1>
                <p>صحتك أولاً</p>
              </div>
            </div>
            {/* Search Bar */}
            <StyledWrapper>
              <div className="navbar-container">
                <div className="search-bar">
                  <div className="InputContainer">
                    <svg className="searchIcon" width="20px" viewBox="0 0 24 24" height="20px" xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M15.5 14h-.79l-.28-.27A6.518 6.518 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    <input
                      className="input"
                      placeholder="بحث ..."
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchValue.trim() !== "") {
                          window.location.href = `/search?query=${encodeURIComponent(searchValue)}`;
                        }
                      }}
                    />

                  </div>
                  <div className="border" />
                  <button aria-label="Voice search" className="micButton">
                    <svg width="20px" viewBox="0 0 384 512" height="20px" className="micIcon" xmlns="http://www.w3.org/2000/svg">
                      <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" />
                    </svg>
                  </button>
                </div>

                {/* عرض نتائج البحث */}
                {filteredProducts.length > 0 && (
                  <div className="results-box">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/offers/${product.id}`}
                        className="result-item"
                      >
                        {product.name} - {product.price} ج.م
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </StyledWrapper>

            {/* Cart Button */}
            <StyledWrapper>
              <Link href="/cart">

                <button className="cartBtn">
                  <b></b>عربة  المشتريات
                  <svg className="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>

                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className="product">
                    <path d="M112 32C50.1 32 0 82.1 0 144c0 29.5 11.8 57.7 32.8 78.2L233.8 423.2c20.5 20.5 48.7 32.8 78.2 32.8c61.9 0 112-50.1 112-112c0-29.5-11.8-57.7-32.8-78.2L190.2 64.8C169.7 44.3 141.5 32 112 32zM464 32c-29.5 0-57.7 11.8-78.2 32.8L285.8 164.8c-9 9-14.5 20.9-15.7 33.4L400 328.2V368c0 26.5 21.5 48 48 48s48-21.5 48-48V144c0-61.9-50.1-112-112-112z" />
                  </svg>
                </button>
              </Link>
            </StyledWrapper>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`navigation ${styleNavbar.navigation}`}>
        <div className="container">
          <nav className={`nav-menu ${styleNavbar.navmenu}`}>
            <Link
              href="/about"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/about" ? styleNavbar.active : ""}`}
            >
              <FontAwesomeIcon icon={faCapsules} className="px-1" />
              وصفتك هنا
            </Link>

            <Link
              href="/offers"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/offers" ? styleNavbar.active : ""}`}
            >
              <FontAwesomeIcon icon={faTag} className="px-1" />
              العروض
            </Link>

            <Link
              href="/categories"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/categories" ? styleNavbar.active : ""}`}
            >
              <FontAwesomeIcon icon={faBoxesStacked} className="px-1" />
              منتجاتنا
            </Link>

            <Link
              href="/"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/" ? styleNavbar.active : ""}`}
            >
              <div className={`main-logo ${styleNavbar.mainlogo}`}>
                <div className={`logo-circle ${styleNavbar.logocircle}`}>
                  <Image src={Logo} alt="Home Logo" width={50} height={50} />
                </div>
                <p>الرئيسية</p>
              </div>
            </Link>

            <Link
              href="/remember"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/remember" ? styleNavbar.active : ""}`}
            >
              <FontAwesomeIcon icon={faBell} className="px-1" />
              التذكير الآلي
            </Link>

            <Link
              href="/tips"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/tips" ? styleNavbar.active : ""}`}
            >
              <FontAwesomeIcon icon={faHeartPulse} className="px-1" />
              صحة ومعافاة
            </Link>

            <Link
              href="/contact"
              className={`nav-link ${styleNavbar.navlink} ${pathname === "/contact" ? styleNavbar.active : ""}`}
            >
              <FontAwesomeIcon icon={faCircleQuestion} className="px-1" />
              طلب نصيحة
            </Link>
          </nav>
        </div>
        <style jsx>{`
  .active {
    color: #0d6efd;               
    font-weight: bold;            
    border-bottom: 3px solid #0d6efd; 
    transition: 0.3s;
  }
`}</style>

      </div>

    </header>
  );
}
