'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills, faCalculator, faClock, faSave, faShoppingCart, faEdit, faTrashAlt, faCheckCircle, faExclamationCircle, faExclamationTriangle, faCapsules, faCalendarDay, faBell } from '@fortawesome/free-solid-svg-icons'; import styles from './page.module.css';

const STEPS = [
    {
        number: 1,
        title: 'اختر الدواء الخاص بك',
        description: 'قم بتسجيل أدويتك والكمية المتاحة لديك',
        icon: faPills,
    },
    {
        number: 2,
        title: 'حدد الجرعات والمواعيد',
        description: 'أدخل بيانات تناول كل دواء',
        icon: faClock,
    },
    {
        number: 3,
        title: 'استلم التذكيرات',
        description: 'احصل على إشعار بقرب انتهاء الكمية المتاحة',
        icon: faBell,
    },
];

export default function Home() {
    const [medications, setMedications] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        dosagePerDay: '',
        notificationDays: '3',
        notificationMethod: 'email',
    });

    useEffect(() => {
        const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        setMedications(storedMedications);
    }, []);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newMedication = {
            ...formData,
            quantity: parseInt(formData.quantity),
            dosagePerDay: parseInt(formData.dosagePerDay),
            notificationDays: parseInt(formData.notificationDays),
        };

        if (newMedication.quantity <= 0 || newMedication.dosagePerDay <= 0) {
            showNotification('الكمية والجرعات يجب أن تكون أكبر من الصفر', 'error');
            return;
        }

        const updatedMedications = [...medications, newMedication];
        setMedications(updatedMedications);
        localStorage.setItem('medications', JSON.stringify(updatedMedications));
        setFormData({
            name: '',
            quantity: '',
            dosagePerDay: '',
            notificationDays: '3',
            notificationMethod: 'email',
        });
        showNotification('تم حفظ الدواء بنجاح!', 'success');
    };

    const handleEdit = (index) => {
        const medToEdit = medications[index];
        setFormData({
            name: medToEdit.name,
            quantity: medToEdit.quantity,
            dosagePerDay: medToEdit.dosagePerDay,
            notificationDays: medToEdit.notificationDays,
            notificationMethod: medToEdit.notificationMethod,
        });
        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
        localStorage.setItem('medications', JSON.stringify(updatedMedications));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (index) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الدواء؟')) {
            const medName = medications[index].name;
            const updatedMedications = medications.filter((_, i) => i !== index);
            setMedications(updatedMedications);
            localStorage.setItem('medications', JSON.stringify(updatedMedications));
            showNotification(`تم حذف دواء ${medName} بنجاح`, 'success');
        }
    };

    const handleOrder = () => {
        if (medications.length === 0) {
            showNotification('لا توجد أدوية مسجلة لطلبها', 'error');
            return;
        }

        showNotification('يرجى تعديل بيانات الدواء يدوياً لإضافة كمية جديدة.', 'warning');

        handleEdit(0);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.h1}>نظام التذكير الآلي للأدوية</h1>
                <p className={styles.headerDescription}>
                    صيدليات Pharamcare توفر لك خدمة التذكير الآلي بقرب انتهاء كمية الدواء المزمن لضمان طلب كمية إضافية في الوقت المناسب.
                </p>
            </header>

            <div className={styles.stepsContainer}>
                {STEPS.map((step, index) => (
                    <div key={index} className={styles.step}>
                        <div className={styles.stepNumber}>{step.number}</div>
                        <h2 className={styles.stepTitle}>{step.title}</h2>
                        <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                ))}
            </div>

            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>إضافة دواء جديد</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className={`${styles.formGroup} ${styles.withIcon}`}>
                        <label htmlFor="name">اسم الدواء</label>
                        <FontAwesomeIcon icon={faPills} className={styles.inputIcon} />
                        <input type="text" id="name" value={formData.name} onChange={handleFormChange} required placeholder="أدخل اسم الدواء" />
                    </div>

                    <div className={`${styles.formGroup} ${styles.withIcon}`}>
                        <label htmlFor="quantity">الكمية المتاحة</label>
                        <FontAwesomeIcon icon={faCalculator} className={styles.inputIcon} />
                        <input type="number" id="quantity" value={formData.quantity} onChange={handleFormChange} required placeholder="عدد الأقراص/الجرعات" />
                    </div>

                    <div className={`${styles.formGroup} ${styles.withIcon}`}>
                        <label htmlFor="dosagePerDay">الجرعات اليومية</label>
                        <FontAwesomeIcon icon={faClock} className={styles.inputIcon} />
                        <input type="number" id="dosagePerDay" value={formData.dosagePerDay} onChange={handleFormChange} required placeholder="عدد الجرعات في اليوم" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="notificationDays">أرسل لي تنبيه قبل انتهاء الدواء بـ</label>
                        <select id="notificationDays" value={formData.notificationDays} onChange={handleFormChange} required>
                            <option value="1">يوم واحد</option>
                            <option value="3">3 أيام</option>
                            <option value="7">أسبوع</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="notificationMethod">طريقة التذكير</label>
                        <select id="notificationMethod" value={formData.notificationMethod} onChange={handleFormChange} required>
                            <option value="email">البريد الإلكتروني</option>
                            <option value="sms">رسالة SMS</option>
                            <option value="both">كلاهما</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.button}>
                        <FontAwesomeIcon icon={faSave} />
                        حفظ الدواء
                    </button>
                </form>
            </div>

            <div className={styles.medicationList}>
                <h2>أدويتك المسجلة</h2>
                {medications.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FontAwesomeIcon icon={faPills} />
                        <p>لا توجد أدوية مسجلة بعد. قم بإضافة دواءك الأول لتبدأ</p>
                    </div>
                ) : (
                    medications.map((med, index) => {
                        const daysLeft = Math.floor(med.quantity / med.dosagePerDay);
                        const statusClass = daysLeft <= med.notificationDays ? styles.warningStatus : styles.successStatus;

                        return (
                            <div key={index} className={styles.medicationItem}>
                                <div className={styles.medicationInfo}>
                                    <h3>{med.name}</h3>
                                    <p><FontAwesomeIcon icon={faCapsules} /> الكمية: {med.quantity} جرعة</p>
                                    <p><FontAwesomeIcon icon={faClock} /> الجرعات اليومية: {med.dosagePerDay}</p>
                                    <p className={statusClass}><FontAwesomeIcon icon={faCalendarDay} /> الأيام المتبقية: {daysLeft} يوم</p>
                                </div>
                                <div className={styles.medicationActions}>
                                    <button className={`${styles.button} ${styles.editBtn}`} onClick={() => handleEdit(index)}>
                                        <FontAwesomeIcon icon={faEdit} /> تعديل
                                    </button>
                                    <button className={`${styles.button} ${styles.deleteBtn}`} onClick={() => handleDelete(index)}>
                                        <FontAwesomeIcon icon={faTrashAlt} /> حذف
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className={styles.btnContainer}>
                <button className={`${styles.button} ${styles.btnPrimary}`} onClick={handleOrder}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    طلب كمية إضافية الآن
                </button>
            </div>

            {notification.message && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    <FontAwesomeIcon icon={notification.type === 'error' ? faExclamationCircle : notification.type === 'warning' ? faExclamationTriangle : faCheckCircle} />
                    <span className={styles.notificationMessage}>{notification.message}</span>
                </div>
            )}
        </div>
    );

}
