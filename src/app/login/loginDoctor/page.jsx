'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './page.module.css';
import { FaUser, FaLock, FaEnvelope, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';

export default function LoginPage() {
    const containerRef = useRef(null);

    // داتا المستخدمين
    const users = [
        { name: 'ahmed', pass: 'ahmed123' },
    ];

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        containerRef.current.classList.add(styles['sign-up-mode']);
    };

    const handleSignIn = () => {
        containerRef.current.classList.remove(styles['sign-up-mode']);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // تحقق من البيانات
        const found = users.find(
            (user) => user.name === username && user.pass === password
        );

        if (found) {
            // نجاح
            window.open("http://localhost:3001/", "_blank");
        } else {
            alert('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles['forms-container']}>
                <div className={styles['signin-signup']}>

                    {/* فورم تسجيل الدخول */}
                    <form onSubmit={handleLogin} className={`${styles['sign-in-form']} ${styles.formElement}`}>
                        <h2 className={styles.title}>تسجيل الدخول (الدكتور)</h2>
                        <div className={styles['input-field']}>
                            <FaUser />
                            <input
                                type="text"
                                placeholder="اسم المستخدم"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={styles['input-field']}>
                            <FaLock />
                            <input
                                type="password"
                                placeholder="كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={`${styles.btn} ${styles.solid}`}>
                            دخول
                        </button>

                        <p className={styles['social-text']}>أو سجل الدخول عبر الشبكات الاجتماعية</p>
                        <div className={styles['social-media']}>
                            <a href="#" className={styles['social-icon']}><FaFacebookF /></a>
                            <a href="#" className={styles['social-icon']}><FaTwitter /></a>
                            <a href="#" className={styles['social-icon']}><FaGoogle /></a>
                            <a href="#" className={styles['social-icon']}><FaLinkedinIn /></a>
                        </div>
                    </form>

                    {/*  فورم إنشاء حساب */}
                    <form className={`${styles['sign-up-form']} ${styles.formElement}`}>
                        <h2 className={styles.title}>إنشاء حساب</h2>
                        <div className={styles['input-field']}>
                            <FaUser />
                            <input type="text" placeholder="اسم المستخدم" />
                        </div>
                        <div className={styles['input-field']}>
                            <FaEnvelope />
                            <input type="email" placeholder="البريد الإلكتروني" />
                        </div>
                        <div className={styles['input-field']}>
                            <FaLock />
                            <input type="password" placeholder="كلمة المرور" />
                        </div>
                        <input type="submit" className={styles.btn} value="إنشاء" />
                        <p className={styles['social-text']}>أو أنشئ حساب عبر الشبكات الاجتماعية</p>
                        <div className={styles['social-media']}>
                            <a href="#" className={styles['social-icon']}><FaFacebookF /></a>
                            <a href="#" className={styles['social-icon']}><FaTwitter /></a>
                            <a href="#" className={styles['social-icon']}><FaGoogle /></a>
                            <a href="#" className={styles['social-icon']}><FaLinkedinIn /></a>
                        </div>
                    </form>
                </div>
            </div>

            {/* Panels */}
            <div className={styles['panels-container']}>
                <div className={`${styles.panel} ${styles['left-panel']}`}>
                    <div className={styles.panelContent}>
                        <h3 className={styles.panelTitle}>جديد هنا؟</h3>
                        <p className={styles.panelText}>
                            نحن هنا لخدمتك في أي وقت. انضم إلينا للاستفادة من جميع خدماتنا المميزة.
                        </p>
                        <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignUp}>
                            إنشاء حساب
                        </button>
                    </div>
                    <Image src="../undraw_medical-research_pze7.svg" width={400} height={400} className={styles.image} alt="" />
                </div>
                <div className={`${styles.panel} ${styles['right-panel']}`}>
                    <div className={styles.panelContent}>
                        <h3 className={styles.panelTitle}>هل لديك حساب؟</h3>
                        <p className={styles.panelText}>
                            احصل على أدويتك واحتياجاتك الطبية بسرعة وأمان من أقرب صيدلية إلى باب منزلك.
                        </p>
                        <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignIn}>
                            تسجيل الدخول
                        </button>
                    </div>
                    <Image src="../undraw_medicine_hqqg.svg" width={400} height={400} className={styles.image} alt="" />
                </div>
            </div>
        </div>
    );
}
