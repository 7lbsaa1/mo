import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ShirtModel from './components/ShirtModel';
import Products from './components/Products';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const titleRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    // حركة دخول حماسية للنصوص باستخدام GSAP
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 100, skewY: 7 }, 
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out" }
    );
    tl.fromTo(subtitleRef.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.8 }, 
      "-=0.6"
    );
  }, []);

  return (
    <div>
      {/* الهيدر */}
      <nav style={{ display: 'flex', justifyContent: 'between', padding: '2rem 10%', position: 'absolute', width: '100%', zIndex: 10, justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '2px', color: '#ff3e6c' }}>7LBSAA</h1>
        <ShoppingBag style={{ cursor: 'pointer' }} size={28} />
      </nav>

      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10%', position: 'relative' }}>
        <div style={{ zIndex: 2, maxWidth: '600px' }}>
          <h1 ref={titleRef} style={{ fontSize: '4.5rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '1rem' }}>
            مستقبل <br/><span style={{ color: '#transparent', WebkitTextStroke: '2px #fff' }}>الأزياء</span> هنا.
          </h1>
          <p ref={subtitleRef} style={{ fontSize: '1.1rem', color: '#aaa', marginBottom: '2rem' }}>
            اكتشف تشكيلتنا الجديدة المصممة بروح الجيل القادم. جودة استثنائية وأسلوب لا يماثل.
          </p>
          <button style={{ background: '#ff3e6c', color: '#fff', border: 'none', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: '600', borderRadius: '30px', cursor: 'pointer' }}>
            تسوق الآن
          </button>
        </div>

        {/* عرض الـ 3D في الخلفية */}
        <ShirtModel />
      </section>

      {/* قسم المنتجات */}
      <Products />
    </div>
  );
}
