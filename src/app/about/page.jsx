'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import recipesData from '../../../data/about.json';

export default function MedicalFormulations() {
  const [currentCategory, setCurrentCategory] = useState('');
  const [productQuantities, setProductQuantities] = useState({});
  const [orderedProducts, setOrderedProducts] = useState({});

  // Initialize quantities when category changes
  useEffect(() => {
    if (currentCategory && recipesData[currentCategory]) {
      const initialQuantities = {};
      recipesData[currentCategory].formulations.forEach(product => {
        initialQuantities[product.id] = 1;
      });
      setProductQuantities(initialQuantities);
    }
  }, [currentCategory]);

  // Update quantity
  const updateQuantity = (productId, change) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(10, (prev[productId] || 1) + change))
    }));
  };

  // Add product to cart (linked to localStorage for CartPage)
  const handleAddToCart = (productId) => {
    const product = Object.values(recipesData)
      .flatMap(cat => cat.formulations)
      .find(p => p.id === productId);
    if (!product) return;

    const quantity = productQuantities[productId] || 1;

    try {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];

      const existingIndex = cart.findIndex(p => p.id === productId);
      if (existingIndex >= 0) {
        cart[existingIndex].qty += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price.split(' ')[0]),
          qty: quantity,
          image: product.image || '/images/product-placeholder.jpg',
          selected: true
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setOrderedProducts(prev => ({ ...prev, [productId]: true }));

      alert(`تم إضافة ${quantity} من "${product.name}" إلى سلة الطلبات`);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  // Show selected category
  const handleShowCategory = (categoryId) => setCurrentCategory(categoryId);

  return (
    <div dir="rtl" className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>التركيبات الطبية</h1>
        <p>اكتشف تركيبات الصيدلية المصممة خصيصًا لتلبية احتياجاتك الطبية والجمالية</p>
        <div className={styles.categoriesContainer}>
          <div className={styles.categoriesSidebar}>
            <button
              onClick={() => handleShowCategory('hair-care')}
              className={`${styles.categoryBtn} ${currentCategory === 'hair-care' ? styles.active : ''}`}
            >
              تركيبات الشعر
            </button>
            <button
              onClick={() => handleShowCategory('dental-care')}
              className={`${styles.categoryBtn} ${currentCategory === 'dental-care' ? styles.active : ''}`}
            >
              تركيبات الأسنان
            </button>
            <button
              onClick={() => handleShowCategory('skin-care')}
              className={`${styles.categoryBtn} ${currentCategory === 'skin-care' ? styles.active : ''}`}
            >
              تركيبات البشرة
            </button>
          </div>
        </div>
      </header>

      <main className={styles.productsArea} id="content-area">
        {!currentCategory ? (
          <>
            <h2>أهلاً بك في قسم التركيبات!</h2>
            <p className={styles.placeholder}>اختر فئة من القائمة لعرض التركيبات المتاحة</p>
          </>
        ) : (
          <>
            <h2>{recipesData[currentCategory]?.title}</h2>
            <div className={styles.productsGrid}>
              {recipesData[currentCategory]?.formulations.map(formulation => {
                const isOrdered = orderedProducts[formulation.id];
                const quantity = productQuantities[formulation.id] || 1;

                return (
                  <div key={formulation.id} className={`${styles.productCard} ${isOrdered ? styles.ordered : ''}`}>
                    <h3>{formulation.name}</h3>
                    <div className={styles.productPrice}>{formulation.price}</div>
                    <p className={styles.description}>{formulation.description}</p>

                    <div className={styles.ingredientsSection}>
                      <h4>المكونات الرئيسية</h4>
                      <ul className={styles.ingredientsList}>
                        {formulation.ingredients.map((ing, index) => (
                          <li key={index}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.usageSection}>
                      <h4>طريقة الاستخدام</h4>
                      <p className={styles.usageText}>{formulation.usage}</p>
                    </div>

                    <div className={styles.productActions}>
                      {!isOrdered ? (
                        <>
                          <div className={styles.quantityControls}>
                            <button className={styles.quantityBtn} onClick={() => updateQuantity(formulation.id, -1)}>-</button>
                            <input
                              type="number"
                              className={styles.quantityInput}
                              value={quantity}
                              min="1"
                              max="10"
                              onChange={(e) => {
                                const newValue = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                                setProductQuantities(prev => ({ ...prev, [formulation.id]: newValue }));
                              }}
                            />
                            <button className={styles.quantityBtn} onClick={() => updateQuantity(formulation.id, 1)}>+</button>
                          </div>
                          <button className={styles.buyBtn} onClick={() => handleAddToCart(formulation.id)}>إضافة للسلة</button>
                        </>
                      ) : (
                        <button className={styles.cancelBtn} disabled>تم الإضافة</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
