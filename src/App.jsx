import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Search, Check, Star } from 'lucide-react';

// 3D Component: صندوق عرض ملابس 7LBSAA المجسم التفاعلي
const NeonCube3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. إعداد المشهد والكاميرا
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 2.2;

    // 2. المحرك الشفاف لـ WebGL
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // 3. تحميل الصور ولصقها على أوجه المكعب الستة
    const textureLoader = new THREE.TextureLoader();
    
    // يمكنك تغيير هذه الروابط الستة في أي وقت بروابط صور ملابسك الخاصة
    const materials = [
      new THREE.MeshBasicMaterial({ map: textureLoader.load('https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400') }), // الوجه 1
      new THREE.MeshBasicMaterial({ map: textureLoader.load('https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400') }), // الوجه 2
      new THREE.MeshBasicMaterial({ map: textureLoader.load('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400') }), // الوجه 3
      new THREE.MeshBasicMaterial({ map: textureLoader.load('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400') }), // الوجه 4
      new THREE.MeshBasicMaterial({ map: textureLoader.load('https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400') }), // الوجه 5
      new THREE.MeshBasicMaterial({ map: textureLoader.load('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400') }), // الوجه 6
    ];

    // 4. إنشاء هيكل المكعب وإضافة الأوجه المكسوة بالصور إليه
    const geometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
    const clothingCube = new THREE.Mesh(geometry, materials);
    scene.add(clothingCube);

    // 5. متغيرات لتخزين حركة الماوس لعمل تفاعل ناعم
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      targetX = (event.clientX / innerWidth) - 0.5;
      targetY = (event.clientY / innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. حلقة الرسوم المتحركة والتدوير التلقائي مع دمج تفاعل الماوس
    const animate = () => {
      requestAnimationFrame(animate);
      
      // دوران تلقائي مستمر هادئ ليظهر كل الملابس للعميل
      clothingCube.rotation.y += 0.003;
      
      // التفاعل المرن والانسيابي عند حركة ماوس المستخدم
      clothingCube.rotation.y += (targetX * 1.5 - clothingCube.rotation.y) * 0.05;
      clothingCube.rotation.x += (targetY * 1.5 - clothingCube.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // تنظيف الذاكرة وفك الأحداث عند الخروج من الصفحة
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '300px', height: '300px', margin: '0 auto', cursor: 'grab' }} />;
};

// قاعدة بيانات الملابس المعروضة بالأسفل في المتجر
const ALL_PRODUCTS = [
  { id: 1, name: "Premium Cyber Hoodie", price: 89, category: "Hoodies", rating: 4.9, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },
  { id: 2, name: "Streetwear Cargo Pants", price: 75, category: "Pants", rating: 4.7, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600" },
  { id: 3, name: "Oversized Anime Tee", price: 45, category: "T-Shirts", rating: 4.8, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600" },
  { id: 4, name: "Urban Techwear Jacket", price: 120, category: "Jackets", rating: 5.0, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
  { id: 5, name: "Retro Graphic Sweatshirt", price: 65, category: "Hoodies", rating: 4.6, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600" },
  { id: 6, name: "Minimalist Black Cap", price: 25, category: "Accessories", rating: 4.5, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600" }
];

export default function App() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const btnRef = useRef();

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // تأثيرات GSAP عند فتح الموقع لأول مرة (Hero Animations)
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { opacity: 0, y: 80, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" });
    tl.fromTo(subtitleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    tl.fromTo(btnRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.2");
  }, []);

  // دوال التحكم في عربة التسوق (السلة)
  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
      setCart(cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

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

  const removeFromCart = (product) => {
    setCart(cart.filter(x => x.id !== product.id));
  };

  const totalItems = cart.reduce((a, c) => a + c.qty, 0);
  const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  // تصفية الملابس بناءً على الفئة أو كلمة البحث
  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0b0b0b', color: '#fff', position: 'relative', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* شريط التنقل العلوي الزجاجي (Navbar) */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 8%', position: 'fixed', width: '100%', top: 0, zIndex: 50, background: 'rgba(11, 11, 11, 0.75)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', letterSpacing: '3px', color: '#ff3e6c', margin: 0 }}>7LBSAA</h1>
        
        <div onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}>
          <ShoppingBag size={26} color="#fff" />
          {totalItems > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ff3e6c', borderRadius: '50%', width: '19px', height: '19px', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
              {totalItems}
            </motion.span>
          )}
        </div>
      </nav>

      {/* قسم الهيرو الرئيسي ومكعب الـ 3D المستحدث */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8%', flexWrap: 'wrap', paddingTop: '80px', gap: '2rem', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '600px', textAlign: 'right', flex: '1 1 400px' }}>
          <h1 ref={titleRef} style={{ fontSize: '4.5rem', lineHeight: '1.2', fontWeight: '900', marginBottom: '1.5rem', margin: 0 }}>
            مستقبل <br/>
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>الأزياء</span> هنا.
          </h1>
          <p ref={subtitleRef} style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            اكتشف تشكيلتنا الحصرية بروح الجيل القادم وتصاميم النيون العصرية. حركات تفاعلية وصندوق عرض ثلاثي أبعاد يمنحك تجربة غامرة وفريدة.
          </p>
          <button ref={btnRef} onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })} style={{ background: '#ff3e6c', color: '#fff', border: 'none', padding: '1.1rem 2.8rem', fontSize: '1.1rem', fontWeight: '700', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'transform 0.2s' }}>
            تصفح المتجر الآن <ArrowLeft size={20} />
          </button>
        </div>

        {/* عرض صندوق الملابس المجسم هنا */}
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <NeonCube3D />
        </div>
      </section>

      {/* قسم المتجر وعرض كروت الملابس (Shop Section) */}
      <section id="shop" style={{ padding: '6rem 8%', background: '#0e0e0e', borderTop: '1px solid #161616' }}>
        <div style={{ display: 'flex', middle: 'center', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', margin: 0 }}>مجموعتنا <span style={{ color: '#ff3e6c' }}>الجديدة</span></h2>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <input 
                type="text" 
                placeholder="ابحث عما يناسب أسلوبك..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.9rem 1.2rem', paddingRight: '2.8rem', borderRadius: '30px', background: '#161616', border: '1px solid #252525', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
              />
              <Search size={18} color="#666" style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* فلاتر تصنيف الملابس الـ زجاجية */}
          <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {["All", "Hoodies", "Pants", "T-Shirts", "Jackets", "Accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ padding: '0.7rem 1.6rem', borderRadius: '25px', border: 'none', cursor: 'pointer', background: selectedCategory === cat ? '#ff3e6c' : '#161616', color: '#fff', fontWeight: '600', transition: 'all 0.3s ease', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
              >
                {cat === "All" ? "عرض الكل" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة عرض الملابس مع حركات الـ Scroll الظاهرية من Framer Motion */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: '#161616', padding: '1.2rem', borderRadius: '20px', border: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ overflow: 'hidden', borderRadius: '14px', height: '340px', marginBottom: '1.2rem', position: 'relative' }}>
                    <motion.img 
                      src={product.img} 
                      alt={product.name} 
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                      <Star size={12} color="#ffb800" fill="#ffb800" />
                      <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{product.rating}</span>
                    </div>
                  </div>
                  
                  <span style={{ fontSize: '0.8rem', color: '#ff3e6c', fontWeight: '700' }}>{product.category}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0.4rem 0 1rem 0' }}>{product.name}</h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <p style={{ color: '#fff', fontWeight: '800', fontSize: '1.35rem', margin: 0 }}>${product.price}</p>
                  <button onClick={() => addToCart(product)} style={{ background: '#ff3e6c', color: '#fff', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '25px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    إضافة للسلة
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* شاشة السلة الجانبية (Slide-out Cart Panel) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* الغطاء الشفاف الخلفي */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 99 }} />
            
            {/* اللوحة الجانبية */}
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.35 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', maxWidth: '440px', height: '100vh', background: '#111', zIndex: 100, boxShadow: '10px 0 30px rgba(0,0,0,0.6)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'right', boxSizing: 'border-box' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>حقيبة التسوق ({totalItems})</h3>
                  <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
                </div>

                {/* قائمة السلع المضافة للسلة */}
                <div style={{ overflowY: 'auto', maxHeight: '62vh', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {cart.length === 0 ? (
                    <p style={{ color: '#555', textAlign: 'center', marginTop: '4rem' }}>حقيبتك فارغة، تصفح واقنص قطعك المفضلة!</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '1.2rem', background: '#161616', padding: '1rem', borderRadius: '16px', alignItems: 'center', border: '1px solid #222' }}>
                        <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1rem', margin: '0 0 0.3rem 0', fontWeight: '600' }}>{item.name}</h4>
                          <p style={{ color: '#ff3e6c', fontWeight: '800', margin: 0 }}>${item.price}</p>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                            <button onClick={() => updateQty(item, 'decrease')} style={{ background: '#252525', border: 'none', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Minus size={10} /></button>
                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item, 'increase')} style={{ background: '#252525', border: 'none', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Plus size={10} /></button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* مجموع الحساب النهائي وزر الدفع */}
              {cart.length > 0 && (
                <div style={{ borderTop: '1px solid #222', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>
                    <span>المجموع الإجمالي:</span>
                    <span style={{ color: '#ff3e6c' }}>${totalPrice}</span>
                  </div>
                  <button style={{ width: '100%', background: '#ff3e6c', color: '#fff', border: 'none', padding: '1.1rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    الذهاب لتأكيد الدفع <Check size={20} />
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
