import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

// قائمة المنتجات مدمجة مباشرة هنا لتجنب مشاكل المجلدات المتداخلة
const PRODUCTS = [
  { id: 1, name: "Premium Cyber Hoodie", price: "$89", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
  { id: 2, name: "Streetwear Cargo Pants", price: "$75", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
  { id: 3, name: "Oversized Anime Tee", price: "$45", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" }
];

export default function App() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    // أنيميشن الدخول الخارق للنصوص باستخدام GSAP
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

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0b0b0b' }}>
      
      {/* الهيدر (Navigation) */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 8%', position: 'absolute', width: '100%', zIndex: 10 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '2px', color: '#ff3e6c' }}>7LBSAA</h1>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <ShoppingBag size={28} color="#fff" />
          <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff3e6c', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>0</span>
        </div>
      </nav>

      {/* قسم الواجهة الرئيسية (Hero Section) */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%', position: 'relative', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ zIndex: 2, maxWidth: '650px', textAlign: 'right' }}>
          <h1 ref={titleRef} style={{ fontSize: '4.5rem', lineHeight: '1.2', fontWeight: '800', marginBottom: '1.5rem' }}>
            مستقبل <br/>
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>الأزياء</span> هنا.
          </h1>
          <p ref={subtitleRef} style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            اكتشف تشكيلتنا الجديدة المصممة بروح الجيل القادم. جودة استثنائية وأسلوب يعبر عن هويتك الفريدة.
          </p>
          <button ref={btnRef} className="cta-btn" style={{ background: '#ff3e6c', color: '#fff', border: 'none', padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: '700', borderRadius: '30px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }}>
            تسوق الآن <ArrowLeft size={20} />
          </button>
        </div>
      </section>

      {/* قسم المنتجات المطور باستخدام Motion.dev */}
      <section style={{ padding: '6rem 8%', background: '#0e0e0e' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'right', fontWeight: '700' }}>
          أحدث <span style={{ color: '#ff3e6c' }}>التصاميم</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              style={{ background: '#161616', padding: '1.2rem', borderRadius: '16px', border: '1px solid #222', textAlign: 'right', cursor: 'pointer' }}
            >
              <div style={{ overflow: 'hidden', borderRadius: '12px', height: '380px', marginBottom: '1rem' }}>
                <motion.img 
                  src={product.img} 
                  alt={product.name} 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>{product.name}</h3>
              <p style={{ color: '#ff3e6c', fontWeight: '800', fontSize: '1.2rem' }}>{product.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
