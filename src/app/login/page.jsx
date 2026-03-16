'use client';

import styles from './page.module.css';

const users = [
    {
        title: 'دكتور صيدلي',
        img: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        alt: 'دكتور صيدلي',
        href: '/login/loginDoctor',
    },
    {
        title: 'مندوب التوصيل',
        img: 'https://c8.alamy.com/comp/KRGN91/delivery-scooter-icon-KRGN91.jpg',
        alt: 'مندوب التوصيل',
        href: '/login/loginDelivary',
    },
    {
        title: 'المستخدم',
        img: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',
        alt: 'المستخدم',
        href: '/login/loginUser',
    },
];

export default function UserTypePage() {
    const handleClick = (e, href) => {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = 0;
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    };

    return (
        <div className={styles.bgWrap}>
            <h1 className={styles.title}>اختر نوع المستخدم</h1>
            <div className={styles.cardsContainer}>
                {users.map((user, idx) => (
                    <div className={styles.card} key={idx}>
                        <div className={styles.avatar}>
                            <img src={user.img} alt={user.alt} />
                        </div>
                        <h3>{user.title}</h3>
                        <a href={user.href} onClick={e => handleClick(e, user.href)}>
                            تسجيل الدخول
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}