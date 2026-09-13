import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const products = [
  {
    name: "Premium Rice",
    eng: "Aromatic Paddy Rice",
    icon: "🌾",
    desc: "Freshly milled aromatic rice sourced directly from paddy fields of Dinajpur and Sylhet.",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&auto=format",
  },
  {
    name: "Organic Lentils",
    eng: "Farm Dal & Pulses",
    icon: "🫘",
    desc: "Protein-rich masoor, mung, and chana lentils grown without pesticides in northern Bengal.",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop&auto=format",
  },
  {
    name: "Pure Honey",
    eng: "Sundarbans Wild Honey",
    icon: "🍯",
    desc: "Raw, unfiltered honey harvested by moualis from the mangrove forests of Sundarbans.",
    img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop&auto=format",
  },
  {
    name: "Country Ghee",
    eng: "Pure Deshi Cow Ghee",
    icon: "🥛",
    desc: "Hand-churned pure ghee from free-range deshi cows in Pabna — rich, golden, and aromatic.",
    img: "https://images.unsplash.com/photo-1571167366136-b57e0f29decc?w=400&h=300&fit=crop&auto=format",
  },
  {
    name: "Fresh Fish",
    eng: "River & Haor Fish",
    icon: "🐟",
    desc: "Hilsa, rohu, and catla delivered fresh from the rivers and haors of Sylhet and Mymensingh.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&auto=format",
  },
  {
    name: "Farm Vegetables",
    eng: "Seasonal Organic Produce",
    icon: "🥬",
    desc: "Daily-harvested tomatoes, cauliflower, spinach, and beans from organic farms in Bogra.",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop&auto=format",
  },
];

const stats = [
  { value: "500+", label: "Farmer Partners" },
  { value: "12K+", label: "Happy Families" },
  { value: "8", label: "Districts Covered" },
  { value: "100%", label: "Authentic Sourcing" },
];

const process = [
  {
    step: "01",
    icon: "🌱",
    title: "Farm Sourcing",
    desc: "We partner directly with farmers across Bangladesh — no middlemen, full traceability.",
  },
  {
    step: "02",
    icon: "🧺",
    title: "Fresh Harvest",
    desc: "Products are harvested at peak freshness and immediately prepared for distribution.",
  },
  {
    step: "03",
    icon: "🚐",
    title: "Van Delivery",
    desc: "Our fleet of vans carries goods same-day from villages to urban collection points.",
  },
  {
    step: "04",
    icon: "🏪",
    title: "Local Market",
    desc: "Delivered fresh to local markets and directly to your doorstep across the city.",
  },
];

const ticker = [
  "🌾 Authentic Rice",
  "🫘 Organic Lentils",
  "🍯 Sundarbans Honey",
  "🥛 Pure Ghee",
  "🐟 Fresh River Fish",
  "🥬 Farm Vegetables",
  "🌿 100% Natural",
  "🚐 Same-Day Delivery",
  "🤝 Direct from Farmers",
];

/* ─────────────────────── ANIMATED FOOTER SVG ─────────────────────── */
function FooterScene() {
  return (
    <div className="relative w-full overflow-hidden bg-green-900" style={{ height: 220 }}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0d2f0f 0%, #1a4d20 40%, #2d6e38 100%)",
        }}
      />

      {/* Sun */}
      <div
        className="sun-rise absolute"
        style={{ top: 18, right: 80, width: 46, height: 46 }}
      >
        <svg viewBox="0 0 46 46" fill="none">
          <circle cx="23" cy="23" r="14" fill="#fbbf24" opacity="0.95" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line
              key={i}
              x1="23"
              y1="23"
              x2={23 + 22 * Math.cos((deg * Math.PI) / 180)}
              y2={23 + 22 * Math.sin((deg * Math.PI) / 180)}
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.6"
            />
          ))}
        </svg>
      </div>

      {/* Birds */}
      <div className="bird-float absolute" style={{ top: 30, left: 120 }}>
        <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
          <path d="M4 10 Q12 2 20 10" stroke="#a3e635" strokeWidth="1.5" fill="none" />
          <path d="M28 10 Q36 2 44 10" stroke="#a3e635" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div
        className="bird-float absolute"
        style={{ top: 50, left: 200, animationDelay: "1.5s" }}
      >
        <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
          <path d="M2 7 Q8 1 14 7" stroke="#86efac" strokeWidth="1.2" fill="none" />
          <path d="M18 7 Q24 1 30 7" stroke="#86efac" strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      {/* Distant trees */}
      {[60, 180, 320, 520, 680, 820, 960, 1100].map((x, i) => (
        <svg
          key={i}
          className="absolute"
          style={{ bottom: 80, left: x, opacity: 0.5 + (i % 3) * 0.15 }}
          width="22"
          height="42"
          viewBox="0 0 22 42"
        >
          <rect x="9" y="28" width="4" height="14" fill="#5d3a1a" />
          <polygon points="11,0 0,30 22,30" fill="#1a5c2a" />
          <polygon points="11,8 1,32 21,32" fill="#2d8a47" opacity="0.8" />
        </svg>
      ))}

      {/* Ground / field base */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 80,
          background: "linear-gradient(to bottom, #1a5c2a 0%, #145220 100%)",
        }}
      />

      {/* Crop rows — swaying */}
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="crop-sway absolute"
          style={{
            bottom: 76,
            left: 40 + i * 42,
            animationDelay: `${(i * 0.18) % 2.5}s`,
          }}
        >
          <svg width="14" height="38" viewBox="0 0 14 38" fill="none">
            <path d="M7 38 Q7 20 7 10" stroke="#4cc872" strokeWidth="1.5" />
            <ellipse cx="7" cy="10" rx="5" ry="8" fill="#3aad5c" opacity="0.9" />
            <ellipse cx="3" cy="20" rx="4" ry="6" fill="#2d8a47" opacity="0.7" transform="rotate(-25 3 20)" />
            <ellipse cx="11" cy="18" rx="4" ry="6" fill="#2d8a47" opacity="0.7" transform="rotate(25 11 18)" />
          </svg>
        </div>
      ))}

      {/* Farmer figure harvesting */}
      <div className="absolute" style={{ bottom: 74, left: 90 }}>
        <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
          {/* Body */}
          <rect x="18" y="22" width="16" height="20" rx="4" fill="#854d0e" />
          {/* Head */}
          <circle cx="26" cy="16" r="9" fill="#fde68a" />
          {/* Hat */}
          <ellipse cx="26" cy="10" rx="13" ry="4" fill="#92400e" />
          <rect x="20" y="7" width="12" height="5" rx="2" fill="#a16207" />
          {/* Legs */}
          <rect x="20" y="41" width="5" height="14" rx="2" fill="#1e40af" />
          <rect x="27" y="41" width="5" height="14" rx="2" fill="#1e40af" />
          {/* Harvesting arm */}
          <g className="harvest-anim">
            <rect x="8" y="28" width="12" height="4" rx="2" fill="#854d0e" />
            {/* Sickle */}
            <path d="M6 32 Q2 40 10 44" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
          {/* Other arm */}
          <rect x="34" y="28" width="10" height="4" rx="2" fill="#854d0e" />
        </svg>
      </div>

      {/* Second farmer */}
      <div className="absolute" style={{ bottom: 74, left: 200 }}>
        <svg width="44" height="54" viewBox="0 0 44 54" fill="none">
          <rect x="15" y="20" width="14" height="18" rx="3" fill="#166534" />
          <circle cx="22" cy="14" r="8" fill="#fde68a" />
          <ellipse cx="22" cy="9" rx="12" ry="3.5" fill="#92400e" />
          <rect x="17" y="7" width="10" height="4" rx="2" fill="#a16207" />
          <rect x="18" y="37" width="4" height="12" rx="2" fill="#1e40af" />
          <rect x="24" y="37" width="4" height="12" rx="2" fill="#1e40af" />
          <rect x="5" y="25" width="11" height="3.5" rx="2" fill="#166534" />
          {/* Basket */}
          <ellipse cx="5" cy="27" rx="6" ry="4" fill="#92400e" opacity="0.9" />
          <path d="M0 27 Q5 35 10 27" fill="#7c3d12" opacity="0.9" />
        </svg>
      </div>

      {/* Vegetable basket on ground */}
      <div className="absolute" style={{ bottom: 73, left: 160 }}>
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <path d="M2 10 Q18 28 34 10" fill="#92400e" />
          <rect x="6" y="4" width="24" height="8" rx="4" fill="#a16207" />
          {/* Veggies in basket */}
          <circle cx="10" cy="6" r="4" fill="#ef4444" />
          <circle cx="18" cy="5" r="4.5" fill="#22c55e" />
          <circle cx="26" cy="6" r="4" fill="#f97316" />
        </svg>
      </div>

      {/* Van — animated across the scene */}
      <div className="van-drive absolute" style={{ bottom: 70, left: 0 }}>
        <div className="bounce-van-anim">
          <svg width="120" height="64" viewBox="0 0 120 64" fill="none">
            {/* Body */}
            <rect x="4" y="14" width="96" height="36" rx="6" fill="#16a34a" />
            {/* Cab */}
            <rect x="72" y="6" width="30" height="26" rx="6" fill="#15803d" />
            {/* Windshield */}
            <rect x="76" y="10" width="22" height="16" rx="3" fill="#bae6fd" opacity="0.8" />
            {/* Logo on van */}
            <text x="20" y="36" fontSize="8" fill="white" fontWeight="bold" fontFamily="Poppins">AGRO NEXUS</text>
            {/* Cargo area */}
            <rect x="6" y="16" width="62" height="30" rx="4" fill="#14532d" />
            {/* Veggies visible in back */}
            <circle cx="18" cy="28" r="5" fill="#22c55e" />
            <circle cx="30" cy="26" r="6" fill="#f97316" />
            <circle cx="42" cy="28" r="5" fill="#ef4444" />
            <circle cx="54" cy="27" r="5" fill="#fbbf24" />
            {/* Wheels */}
            <circle cx="28" cy="50" r="10" fill="#1c1917" />
            <circle cx="28" cy="50" r="5" fill="#78716c" />
            <circle cx="88" cy="50" r="10" fill="#1c1917" />
            <circle cx="88" cy="50" r="5" fill="#78716c" />
            {/* Exhaust */}
            <path d="M100 46 Q110 40 116 44" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Road / path */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 16,
          background: "#0f2e10",
          borderTop: "2px solid #166534",
        }}
      />

      {/* Road dashes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: 4,
            left: i * 70 + 20,
            width: 36,
            height: 3,
            background: "#fbbf24",
            opacity: 0.4,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── NAVBAR ─────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(5,46,16,0.97)"
          : "rgba(5,46,16,0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(45,138,71,0.3)" : "none",
      }}
    >
      {/* Top bar */}
      <div
        className="text-xs px-6 py-1 flex items-center justify-between"
        style={{ background: "#052e10", borderBottom: "1px solid #1a5c2a" }}
      >
        <div className="flex items-center gap-4 text-green-400">
          <span>📞 +880 1700-000000</span>
          <span>✉️ info@agronexus.com.bd</span>
          <span>📍 Dhaka, Bangladesh</span>
        </div>
        <div className="flex items-center gap-3">
          {["Facebook", "WhatsApp", "YouTube"].map((s) => (
            <button
              key={s}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
              style={{ background: "#2d8a47" }}
            >
              {s[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <div className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center leaf-pulse"
            style={{ background: "linear-gradient(135deg, #2d8a47, #4cc872)" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 2 C11 2 4 6 4 13 C4 17.4 7.1 21 11 21 C14.9 21 18 17.4 18 13 C18 6 11 2 11 2Z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M11 8 L11 21"
                stroke="#052e10"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11 13 Q15 11 17 7"
                stroke="#052e10"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div>
            <div
              className="font-bold text-lg leading-none tracking-wider"
              style={{ fontFamily: "Playfair Display, serif", color: "#4cc872" }}
            >
              AGRO NEXUS
            </div>
            <div className="text-xs text-green-400 tracking-widest uppercase">
              Farm to Market
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Products", "Process", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-green-100 hover:text-green-400 transition-colors tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
          style={{ background: "#2d8a47", color: "white" }}
        >
          Order Now
        </button>

        <button
          className="md:hidden text-green-400"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-3"
          style={{ background: "rgba(5,46,16,0.98)" }}
        >
          {["Home", "About", "Products", "Process", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-green-200 py-2 border-b border-green-900 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop&auto=format"
          alt="Green farm fields at sunrise"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(5,46,16,0.92) 0%, rgba(13,61,26,0.78) 50%, rgba(5,46,16,0.65) 100%)",
          }}
        />
      </div>

      {/* Decorative leaf */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(45,138,71,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-20">
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: "rgba(45,138,71,0.25)", color: "#4cc872", border: "1px solid #2d8a47" }}
          >
            🌿 From the Field to Your Door
          </div>

          <h1
            className="text-5xl lg:text-7xl font-extrabold leading-none mb-2"
            style={{ fontFamily: "Playfair Display, serif", color: "white" }}
          >
            AGRO
          </h1>
          <h1
            className="text-5xl lg:text-7xl font-extrabold leading-none mb-6"
            style={{
              fontFamily: "Playfair Display, serif",
              WebkitTextStroke: "2px #4cc872",
              color: "transparent",
            }}
          >
            NEXUS
          </h1>

          <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-xl">
            We source rice, lentils, honey, ghee, fish, and fresh vegetables directly from farmers —
            no middlemen, completely authentic. Delivered straight to your local market.
          </p>
          <p className="text-green-300 text-sm mb-10">
            Direct authentic sourcing from farms · Delivered to local markets daily
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #2d8a47, #4cc872)",
                color: "white",
                boxShadow: "0 4px 24px rgba(45,138,71,0.4)",
              }}
            >
              Explore Our Products →
            </a>
            <a
              href="#about"
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:bg-green-900"
              style={{
                border: "1.5px solid #2d8a47",
                color: "#4cc872",
                background: "transparent",
              }}
            >
              About Us
            </a>
          </div>
        </div>

        {/* Right side: floating cards */}
        <div className="hidden lg:flex flex-col gap-4 items-end">
          {[
            { label: "Today's Harvest", value: "8 Varieties", icon: "🌾", color: "#2d8a47" },
            { label: "Active Farmers", value: "500+", icon: "👨‍🌾", color: "#15803d" },
            { label: "Delivery Zones", value: "8 Districts", icon: "🚐", color: "#166534" },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl px-6 py-4 flex items-center gap-4 backdrop-blur-md"
              style={{
                background: "rgba(13,61,26,0.7)",
                border: "1px solid rgba(45,138,71,0.4)",
                animationDelay: `${i * 0.2}s`,
                transform: `translateX(${i * -16}px)`,
                minWidth: 240,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: card.color }}
              >
                {card.icon}
              </div>
              <div>
                <div className="text-green-400 text-xs uppercase tracking-wider">{card.label}</div>
                <div className="text-white text-xl font-bold" style={{ fontFamily: "Playfair Display" }}>
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-400 text-xs">
        <span>Scroll</span>
        <div
          className="w-0.5 h-8 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #2d8a47, transparent)",
            animation: "rise-sun 1.5s ease-in-out infinite alternate",
          }}
        />
      </div>
    </section>
  );
}

/* ─────────────────────────── TICKER ─────────────────────────── */
function Ticker() {
  const doubled = [...ticker, ...ticker];
  return (
    <div
      className="py-3 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1a5c2a, #2d8a47, #1a5c2a)",
        borderTop: "1px solid #3aad5c",
        borderBottom: "1px solid #3aad5c",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold text-green-100 tracking-wide">
            {item}
            <span className="mx-6 text-green-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────── */
function About() {
  return (
    <section id="about" className="py-24" style={{ background: "#0a3316" }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&h=520&fit=crop&auto=format"
            alt="Bangladeshi farmer harvesting crops in a green field"
            className="w-full rounded-3xl object-cover"
            style={{ height: 420 }}
          />
          <div
            className="absolute -bottom-6 -right-6 rounded-2xl p-5 shadow-xl"
            style={{ background: "#1a5c2a", border: "1px solid #2d8a47" }}
          >
            <div
              className="text-4xl font-extrabold text-green-400"
              style={{ fontFamily: "Playfair Display" }}
            >
              2019
            </div>
            <div className="text-green-200 text-sm">Founded with a farmer's vision</div>
          </div>
          <div
            className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl flex items-center justify-center text-4xl"
            style={{ background: "#2d8a47", opacity: 0.85 }}
          >
            🌿
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="#4cc872">
              <path d="M9 1C9 1 3 5 3 11C3 14.3 5.7 17 9 17C12.3 17 15 14.3 15 11C15 5 9 1 9 1Z" />
            </svg>
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">
              About AGRO NEXUS
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Playfair Display" }}
          >
            From the Village Field{" "}
            <span style={{ color: "#4cc872" }}>to Your Table</span>
          </h2>

          <p className="text-green-200 text-base leading-relaxed mb-4">
            AGRO NEXUS works directly with farmers across Bangladesh — no middlemen, no compromise.
            We collect fresh, authentic agricultural produce and ensure farmers receive fair prices
            while consumers get the purest food possible.
          </p>
          <p className="text-green-300 text-sm leading-relaxed mb-8">
            From paddy fields of Dinajpur to fish haors of Sylhet — our network spans 8 districts,
            working with 500+ farmer families to bring authentic, seasonal produce to your local market daily.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              "Sourced directly from farmers",
              "No chemical additives",
              "Same-day delivery",
              "Fair pricing for all",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-green-200 text-sm">
                <span className="text-green-400">✓</span>
                {item}
              </div>
            ))}
          </div>

          <a
            href="#products"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "#2d8a47", color: "white" }}
          >
            Explore Our Products →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── STATS ─────────────────────────── */
function Stats() {
  return (
    <section
      className="py-16"
      style={{
        background: "linear-gradient(135deg, #1a5c2a 0%, #2d8a47 50%, #1a5c2a 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div
              className="text-5xl font-extrabold text-white mb-1"
              style={{ fontFamily: "Playfair Display" }}
            >
              {s.value}
            </div>
            <div className="text-green-100 text-sm uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── PRODUCTS ─────────────────────────── */
function Products() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="products" className="py-24" style={{ background: "#052e10" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#4cc872">
              <path d="M8 0C8 0 2 4 2 9C2 12.3 4.7 15 8 15C11.3 15 14 12.3 14 9C14 4 8 0 8 0Z" />
            </svg>
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">
              Our Products
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "Playfair Display" }}
          >
            Pure Products, Direct{" "}
            <span style={{ color: "#4cc872" }}>from the Farm</span>
          </h2>
          <p className="text-green-300 mt-3 max-w-xl mx-auto text-sm">
            Every product is sourced fresh, verified for quality, and delivered without chemical additives.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: "#0d3d1a",
                border: active === i ? "1.5px solid #4cc872" : "1.5px solid #1a5c2a",
                transform: active === i ? "translateY(-4px)" : "none",
                boxShadow: active === i ? "0 12px 32px rgba(76,200,114,0.2)" : "none",
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.eng}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: active === i ? "scale(1.06)" : "scale(1)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,61,26,0.85) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute top-3 left-3 text-3xl">{p.icon}</div>
              </div>
              <div className="p-5">
                <div
                  className="text-xl font-bold text-green-300 mb-0.5"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  {p.name}
                </div>
                <div className="text-green-500 text-xs uppercase tracking-wider mb-2">
                  {p.eng}
                </div>
                <p className="text-green-200 text-sm leading-relaxed">{p.desc}</p>
                <button
                  className="mt-4 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                >
                  Order Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PROCESS ─────────────────────────── */
function Process() {
  return (
    <section id="process" className="py-24" style={{ background: "#0a3316" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#4cc872">
              <path d="M8 0C8 0 2 4 2 9C2 12.3 4.7 15 8 15C11.3 15 14 12.3 14 9C14 4 8 0 8 0Z" />
            </svg>
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">
              Our Journey
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "Playfair Display" }}
          >
            How It Reaches{" "}
            <span style={{ color: "#4cc872" }}>Your Doorstep</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, #1a5c2a, #4cc872, #1a5c2a)" }}
          />

          {process.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-center relative"
              style={{
                background: "#0d3d1a",
                border: "1px solid #1a5c2a",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 relative z-10"
                style={{
                  background: "linear-gradient(135deg, #1a5c2a, #2d8a47)",
                  border: "2px solid #4cc872",
                }}
              >
                {p.icon}
              </div>
              <div
                className="text-xs text-green-500 font-bold tracking-widest mb-1"
              >
                STEP {p.step}
              </div>
              <div
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Playfair Display" }}
              >
                {p.title}
              </div>
              <p className="text-green-300 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Farm to table image strip */}
        <div className="mt-14 rounded-2xl overflow-hidden relative" style={{ height: 200 }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=400&fit=crop&auto=format"
            alt="Farmer in vegetable field at sunset"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(5,46,16,0.6)" }}
          >
            <div className="text-center">
              <p
                className="text-3xl lg:text-4xl font-bold text-white"
                style={{ fontFamily: "Playfair Display" }}
              >
                "Fresh from the Field, Right to Your Home"
              </p>
              <p className="text-green-300 mt-2 text-sm">Authentic. Organic. Traceable. Delivered daily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */
function Testimonials() {
  const testimonials = [
    {
      name: "Rina Begum",
      loc: "Mirpur, Dhaka",
      text: "The quality of rice and vegetables from AGRO NEXUS is extraordinary. It truly feels like it comes straight from the village!",
      avatar: "🧕",
    },
    {
      name: "Kamal Hossain",
      loc: "Uttara, Dhaka",
      text: "The honey from Sundarbans is absolutely pure. I've tried many brands but nothing compares to what AGRO NEXUS delivers.",
      avatar: "👨",
    },
    {
      name: "Farida Khanam",
      loc: "Narayanganj",
      text: "Getting fresh vegetables every day is truly incredible. The prices are affordable and the quality is exceptional — highly recommended!",
      avatar: "👩",
    },
  ];

  return (
    <section className="py-24" style={{ background: "#052e10" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "Playfair Display" }}
          >
            What Our Customers Say
          </h2>
          <p className="text-green-400 mt-2 text-sm">Real stories from real families across Bangladesh</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                background: "#0d3d1a",
                border: "1px solid #1a5c2a",
              }}
            >
              <div className="text-3xl mb-4">{t.avatar}</div>
              <p className="text-green-200 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-green-500 text-xs">{t.loc}</div>
              </div>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CONTACT CTA ─────────────────────────── */
function ContactCTA() {
  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{ background: "#0a3316" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #4cc872 0%, transparent 50%), radial-gradient(circle at 80% 50%, #2d8a47 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-5xl mb-4">🌿</div>
        <h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "Playfair Display" }}
        >
          Get in Touch Today
        </h2>
        <p className="text-green-200 text-base mb-8 max-w-xl mx-auto">
          Contact us now to get fresh AGRO NEXUS products in your area.
          Connect directly with farmers and bring authentic food to your community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="Your name and phone number..."
            className="px-5 py-3 rounded-full text-sm text-white outline-none flex-1 max-w-sm"
            style={{ background: "#0d3d1a", border: "1.5px solid #2d8a47", color: "white" }}
          />
          <button
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #2d8a47, #4cc872)",
              color: "white",
              boxShadow: "0 4px 24px rgba(45,138,71,0.4)",
            }}
          >
            Contact Us →
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { icon: "📞", label: "Call Us", value: "+880 1700-000000" },
            { icon: "✉️", label: "Email Us", value: "info@agronexus.com.bd" },
            { icon: "📍", label: "Location", value: "Dhaka, Bangladesh" },
          ].map((c, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-green-400 text-xs uppercase tracking-wider">{c.label}</div>
              <div className="text-green-200 text-sm">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#052e10" }}>
      {/* Animated scene */}
      <FooterScene />

      {/* Footer content */}
      <div
        className="border-t"
        style={{ borderColor: "#1a5c2a" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div
              className="text-xl font-bold text-green-400 mb-1"
              style={{ fontFamily: "Playfair Display" }}
            >
              AGRO NEXUS
            </div>
            <div className="text-green-500 text-xs uppercase tracking-widest mb-3">
              Farm to Market
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              We supply authentic agricultural products by maintaining direct contact with farmers across Bangladesh.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2">
              {["চাল (Rice)", "ডাল (Lentils)", "মধু (Honey)", "ঘি (Ghee)", "মাছ (Fish)", "সবজি (Vegetables)"].map(
                (item) => (
                  <li key={item}>
                    <a href="#products" className="text-green-300 text-sm hover:text-green-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {["About Us", "Our Farmers", "Sourcing Process", "Careers", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-green-300 text-sm hover:text-green-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-green-300 text-sm">
              <li>📞 +880 1700-000000</li>
              <li>✉️ info@agronexus.com.bd</li>
              <li>📍 Dhaka, Bangladesh</li>
              <li>🕒 Sat–Thu: 8am – 8pm</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {["f", "in", "w", "▶"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110"
                  style={{ background: "#2d8a47" }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="border-t py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderColor: "#1a5c2a" }}
        >
          <p className="text-green-500 text-xs">
            © 2026 AGRO NEXUS. All rights reserved. Made with 🌿 in Bangladesh.
          </p>
          <p className="text-green-600 text-xs">Authentic · Organic · Direct</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── APP ─────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Stats />
      <Products />
      <Process />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
}
