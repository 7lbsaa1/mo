import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Search, Check } from 'lucide-react';

// قاعدة بيانات موسعة للملابس مع التصنيفات
const ALL_PRODUCTS = [
  { id: 1, name: "Premium Cyber Hoodie", price: 89, category: "Hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
  { id: 2, name: "Streetwear Cargo Pants", price: 75, category: "Pants", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
  { id: 3, name: "Oversized Anime Tee", price: 45, category: "T-Shirts", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
  { id: 4, name: "Urban Techwear Jacket", price: 120, category: "Jackets", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
  { id: 5, name: "Retro Graphic Sweatshirt", price: 65, category: "Hoodies", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500" },
  { id: 6, name: "Minimalist Black Cap", price: 25, category: "Accessories", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" }
];

export default function App() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const btnRef = useRef();

  // State الخاص بالسلة، البحث، والتصنيفات
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // أنيميشن GSAP عند الدخول الأول للموقع
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 80, skewY: 5 }, 
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" }
    );
    tl.fromTo(subtitleRef.current, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.6 }, 
      "-=0.4"
    );
    tl.fromTo(btnRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 
      "-=0.2"
    );
  }, []);

  // دالة إضافة منتج للسلة
  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
      setCart(cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // دالة تعديل الكمية داخل السلة
  const updateQty = (product, action) => {
    if (action === 'increase') {
      setCart(cart.map(x => x.id === product.id ? { ...product, qty: product.qty + 1 } : x));
    } else {
      if (product.qty === 1) {
        setCart(cart.filter(x => x.id !== product.id));
      } else {
        setCart(cart.map(x => x.id === product.id ? { ...product, qty: product.qty - 1 } : x));
      }
    }
  };

  // دالة حذف منتج نهائياً من السلة
  const removeFromCart = (product) => {
    setCart(cart.filter(x => x.id !== product.id));
  };

  // حساب إجمالي المنتجات والأسعار
  const totalItems = cart.reduce((a, c) => a + c.qty, 0);
  const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  // تصفية المنتجات بناءً على البحث والزر المختار
  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0b0b0b', color: '#fff', position: 'relative' }}>
      
      {/* الهيدر */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 8%', position: 'fixed', width: '100%', zIndex: 10, background: 'rgba(11, 11, 11, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1a1a1a' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '2px', color: '#ff3e6c', margin: 0 }}>7LBSAA</h1>
        
        {/* زر السلة التفاعلي */}
        <div onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer' }}>
          <ShoppingBag size={28} color="#fff" />
          {totalItems > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff3e6c', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}
            >
              {totalItems}
            </motion.span>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%', position: 'relative', borderBottom: '1px solid #1a1a1a', paddingTop: '80px' }}>
        <div style={{ zIndex: 2, maxWidth: '650px', textAlign: 'right' }}>
          <h1 ref={titleRef} style={{ fontSize: '4.5rem', lineHeight: '1.2', fontWeight: '800', marginBottom: '1.5rem' }}>
            مستقبل <br/>
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>الأزياء</span> هنا.
          </h1>
          <p ref={subtitleRef} style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            اكتشف تشكيلتنا الجديدة المصممة بروح الجيل القادم. جودة استثنائية وأسلوب يعبر عن هويتك الفريدة.
          </p>
          <button ref={btnRef} onClick={() => document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' })} style={{ background: '#ff3e6c', color: '#fff', border: 'none', padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: '700', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            اكتشف التشكيلة <ArrowLeft size={20} />
          </button>
        </div>
      </section>

      {/* المتجر والتحكم (Shop Section) */}
      <section id="shop-section" style={{ padding: '6rem 8%', background: '#0e0e0e' }}>
        
        {/* شريط البحث والتصنيفات */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>أحدث <span style={{ color: '#ff3e6c' }}>التصاميم</span></h2>
            
            {/* شريط البحث */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <input 
                type="text" 
                placeholder="ابحث عن تصميمك المفضل..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem', paddingRight: '2.5rem', borderRadius: '25px', background: '#161616', border: '1px solid #333', color: '#fff', fontSize: '1rem', outline: 'none' }}
              />
              <Search size={18} color="#aaa" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* أزرار التصنيفات التفاعلية */}
          <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {["All", "Hoodies", "Pants", "T-Shirts", "Jackets", "Accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ padding: '0.6rem 1.5rem', borderRadius: '20px', border: 'none', cursor: 'pointer', background: selectedCategory === cat ? '#ff3e6c' : '#161616', color: '#fff', fontWeight: '600', transition: 'all 0.3s ease' }}
              >
                {cat === "All" ? "الكل" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة عرض المنتجات الفلترة */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                style={{ background: '#161616', padding: '1.2rem', borderRadius: '16px', border: '1px solid #222', textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ overflow: 'hidden', borderRadius: '12px', height: '320px', marginBottom: '1rem' }}>
                    <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#ff3e6c', fontWeight: 'bold' }}>{product.category}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0.3rem 0 0.8rem 0' }}>{product.name}</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <p style={{ color: '#fff', fontWeight: '800', fontSize: '1.3rem', margin: 0 }}>${product.price}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    style={{ background: '#ff3e6c', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    إضافة للسلة
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: '1.2rem', marginTop: '3rem' }}>لا توجد نتائج تطابق بحثك حالياً.</p>
        )}
      </section>

      {/* لوحة السلة الجانبية (Cart Sidebar Popup) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* الخلفية المظلمة */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 99 }}
            />
            
            {/* نافذة السلة المنسدلة من اليسار بدعم Motion.dev */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', maxWidth: '450px', height: '100vh', background: '#111', zIndex: 100, boxShadow: '5px 0 25px rgba(0,0,0,0.5)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'right' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>سلة التسوق ({totalItems})</h3>
                  <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                </div>

                {/* قائمة العناصر المضافة */}
                <div style={{ overflowY: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {cart.length === 0 ? (
                    <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>السلة فارغة تماماً، ابدأ التسوق الآن!</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '1rem', background: '#161616', padding: '0.8rem', borderRadius: '12px', alignItems: 'center' }}>
                        <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1rem', margin: '0 0 0.3rem 0' }}>{item.name}</h4>
                          <p style={{ color: '#ff3e6c', fontWeight: 'bold', margin: 0 }}>${item.price}</p>
                          
                          {/* التحكم بالكمية */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
                            <button onClick={() => updateQty(item, 'decrease')} style={{ background: '#222', border: 'none', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Minus size={12} /></button>
                            <span>{item.qty}</span>
                            <button onClick={() => updateQty(item, 'increase')} style={{ background: '#222', border: 'none', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Plus size={12} /></button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item)} style={{ background: 'none', border: 'none', color: '#ff3e6c', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* مجموع الحساب وزر الشراء */}
              {cart.length > 0 && (
                <div style={{ borderTop: '1px solid #222', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    <span>إجمالي الحساب:</span>
                    <span style={{ color: '#ff3e6c' }}>${totalPrice}</span>
                  </div>
                  <button style={{ width: '100%', background: '#ff3e6c', color: '#fff', border: 'none', padding: '1rem', borderRadius: '25px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    إتمام الدفع الإلكتروني <Check size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
