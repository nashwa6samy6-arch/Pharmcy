"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { FaGlobe, FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp} from "react-icons/fa";

export default function Contact() {
    useEffect(() => {
        const inputs = document.querySelectorAll(`.${styles.input}`);
        function focusFunc() {
            let parent = this.parentNode;
            parent.classList.add(styles.focus);
        }
        function blurFunc() {
            let parent = this.parentNode;
            if (this.value === "") {
                parent.classList.remove(styles.focus);
            }
        }
        inputs.forEach((input) => {
            input.addEventListener("focus", focusFunc);
            input.addEventListener("blur", blurFunc);
        });
        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", focusFunc);
                input.removeEventListener("blur", blurFunc);
            });
        };
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.bigCircle}></span>
            <img src="/img/shape.png" className={styles.square} alt="" />
            <div className={styles.form}>
                <div className={styles.contactInfo}>
                    <h3 className={styles.title}>طلب نصيحة طبية</h3>
                    <p className={styles.text}>
                        نحن هنا لمساعدتك وتقديم النصيحة الطبية المناسبة لك. يرجى تعبئة النموذج بالأسفل وسنقوم بالرد عليك في أقرب وقت ممكن.
                    </p>
                    <div className={styles.info}>
                        <div className={styles.information}>
                            <FaGlobe />
                            <p>92 شارع شيري، مدينة الشروق، القاهرة</p>
                        </div>
                        <div className={styles.information}>
                            <FaEnvelope />
                            <p>info@pharmacare.com</p>
                        </div>
                        <div className={styles.information}>
                            <FaPhone />
                            <p>010-1234-5678</p>
                        </div>
                    </div>
                    <div className={styles.socialMedia}>
                     <p>تابعنا على</p>
                      <div className={styles.socialIcons}>
                         <a href="#" className={`${styles.facebook}`}><FaFacebookF /></a>
                         <a href="#" className={`${styles.instagram}`}><FaInstagram /></a>
                         <a href="#" className={`${styles.twitter}`}><FaTwitter /></a>
                         <a href="#" className={`${styles.Whatsapp}`}><FaWhatsapp /></a>
                        </div>
                    </div>
                </div>
                <div className={styles.contactForm}>
                    <span className={`${styles.circle} ${styles.one}`}></span>
                    <span className={`${styles.circle} ${styles.two}`}></span>
                    <form className={styles.formElement} autoComplete="off">
                        <h3 className={styles.title}>أرسل استفسارك الطبي</h3>
                        <div className={styles.inputContainer}>
                            <input type="text" name="name" className={styles.input} />
                            <label>الاسم الكامل</label>
                            <span>الاسم الكامل</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="email" name="email" className={styles.input} />
                            <label>البريد الإلكتروني</label>
                            <span>البريد الإلكتروني</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="tel" name="phone" className={styles.input} />
                            <label>رقم الهاتف</label>
                            <span>رقم الهاتف</span>
                        </div>
                        <div className={`${styles.inputContainer} ${styles.textarea}`}>
                            <textarea name="message" className={styles.input}></textarea>
                            <label>اكتب سؤالك أو حالتك الصحية</label>
                            <span>اكتب سؤالك أو حالتك الصحية</span>
                        </div>
                        <input type="submit" value="إرسال" className={styles.btn} />
                    </form>
                </div>
            </div>
        </div>
    );
}