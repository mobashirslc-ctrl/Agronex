import { useState } from "react";

type IconName =
  | "arrow"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "globe"
  | "leaf"
  | "menu"
  | "package"
  | "play"
  | "shield"
  | "star"
  | "truck"
  | "user";

const heroImage =
  "https://images.unsplash.com/photo-1671357573289-de5400716e27?auto=format&fit=crop&w=2000&q=88";
const farmerImage =
  "https://images.unsplash.com/photo-1646801696611-6fc407471380?auto=format&fit=crop&w=1400&q=85";
const storyImage =
  "https://images.unsplash.com/photo-1706770290344-b4a1ba7fc6b3?auto=format&fit=crop&w=1600&q=85";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    chevron: <><path d="m8 10 4 4 4-4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    leaf: <><path d="M20 4C12 4 6 8 5 16c5 1 11-1 15-12Z" /><path d="M4 20c3-5 7-8 12-10" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    package: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    play: <><path d="m10 8 6 4-6 4V8Z" /></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    star: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></>,
    truck: <><path d="M3 6h11v10H3V6ZM14 10h4l3 3v3h-7v-6Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };
  return (
    <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

function Action({
  children,
  kind = "primary",
  onClick,
  icon,
}: {
  children: React.ReactNode;
  kind?: "primary" | "secondary" | "ghost" | "light";
  onClick?: () => void;
  icon?: IconName;
}) {
  return (
    <div
      className={`action action-${kind}`}
      onClick={onClick}
      onKeyDown={(event) => event.key === "Enter" && onClick?.()}
      role="button"
      tabIndex={0}
    >
      {children}
      {icon && <Icon name={icon} size={18} />}
    </div>
  );
}

const products = [
  { name: "Fresh Farm Tomato", short: "Tomato", category: "Vegetables", image: "tomato" },
  { name: "Premium Chui Jhal", short: "Chui Jhal", category: "Vegetables", image: "chui" },
  { name: "Fresh Bitter Gourd", short: "Bitter Gourd", category: "Vegetables", image: "bitter" },
  { name: "Green Papaya", short: "Papaya", category: "Vegetables", image: "papaya" },
  { name: "River Rui Fish", short: "Rui Fish", category: "Fish", image: "rui" },
  { name: "Farm Fresh Banana", short: "Banana", category: "Fruits", image: "banana" },
  { name: "Pure Mustard Oil", short: "Mustard Oil", category: "Oil Products", image: "oil" },
  { name: "Golden Turmeric", short: "Turmeric", category: "Crops", image: "turmeric" },
  { name: "Mustard Flower Honey", short: "Mustard Honey", category: "Honey", image: "honey" },
  { name: "Traditional Patali Gur", short: "Patali Gur", category: "Date Jaggery", image: "gur" },
];

const categories = ["All Products", "Vegetables", "Fish", "Fruits", "Oil Products", "Crops", "Honey"];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <div aria-label="AgroNexus" className={`brand-logo ${inverse ? "brand-logo-inverse" : ""}`} role="img" />;
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <div className="eyebrow"><span />{eyebrow}</div>
      <div className="section-title">{title}</div>
      {copy && <div className="section-copy">{copy}</div>}
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);

  const visibleProducts =
    activeCategory === "All Products"
      ? products.slice(0, 8)
      : products.filter((product) => product.category === activeCategory);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <header className="header">
        <div className="header-inner">
          <Logo />
          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            {["Overview", "Products", "Solutions", "Farmers", "About", "Contact"].map((item) => (
              <div
                className="nav-item"
                key={item}
                onClick={() => {
                  scrollTo(item === "Overview" ? "home" : item.toLowerCase());
                  setMenuOpen(false);
                }}
                role="link"
                tabIndex={0}
              >
                {item}
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language"><Icon name="globe" size={17} /> EN <Icon name="chevron" size={15} /></div>
            <Action kind="ghost">Login</Action>
            <Action onClick={() => scrollTo("farmers")}>Partner with us</Action>
          </div>
          <div className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} role="button" tabIndex={0}>
            <Icon name={menuOpen ? "close" : "menu"} />
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img alt="Farmers walking through a lush green field in Bangladesh" className="hero-image" src={heroImage} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="pulse" /> FARM TO FAMILY, RESPONSIBLY</div>
            <div className="hero-title">Building a safe, sustainable <em>food supply chain</em></div>
            <div className="hero-copy">
              Connecting farmers with customers through fresh, traceable and trusted agricultural products.
            </div>
            <div className="hero-actions">
              <Action kind="light" icon="arrow" onClick={() => scrollTo("products")}>Explore products</Action>
              <Action kind="secondary" onClick={() => scrollTo("farmers")}>Become a partner</Action>
            </div>
            <div className="trust-row">
              {[
                ["leaf", "Fresh from farm"],
                ["shield", "Quality checked"],
                ["user", "Trusted farmers"],
              ].map(([icon, text]) => (
                <div className="trust-item" key={text}>
                  <Icon name={icon as IconName} size={20} /><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-stat">
            <div className="stat-value">100%</div>
            <div className="stat-label">Traceable sourcing</div>
            <div className="stat-line"><span /></div>
          </div>
        </section>

        <section className="impact-strip" aria-label="Company impact">
          {[
            ["1,200+", "Farmers in our network"],
            ["14", "Collection regions"],
            ["32", "Quality checkpoints"],
            ["<24h", "Farm to collection"],
          ].map(([value, label]) => (
            <div className="impact-item" key={label}>
              <div className="impact-value">{value}</div>
              <div className="impact-label">{label}</div>
            </div>
          ))}
        </section>

        <section className="products section" id="products">
          <div className="section-top">
            <SectionTitle
              eyebrow="THE MARKETPLACE"
              title="Fresh from trusted farms"
              copy="Browse food sourced with care. Every product is mapped to its farmer, origin and quality journey."
            />
            <Action kind="ghost" icon="arrow">View all products</Action>
          </div>
          <div className="category-tabs">
            {categories.map((category) => (
              <div
                className={`category-tab ${category === activeCategory ? "category-tab-active" : ""}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                role="button"
                tabIndex={0}
              >
                {category}
              </div>
            ))}
          </div>
<div className="product-grid">
  {visibleProducts.map((product) => {
    // এখানে ফাইলের নামের অমিল দূর করার জন্য ম্যাপিং করা হলো
    let imgFileName = product.image;
    if (imgFileName === 'oil') {
      imgFileName = 'mustardoil';
    }

    return (
      <div className="product-card" key={product.name} onClick={() => setSelectedProduct(product)}>
        <div className="product-image" style={{ position: 'relative', overflow: 'hidden', height: '200px', backgroundColor: '#f4f4f4' }}>
          <img 
            src={`${import.meta.env.BASE_URL}images/${imgFileName}.png`} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // তিলের তেলের ক্ষেত্রে .jfif ফাইল ব্যবহারের জন্য
              if (imgFileName.includes('sesame') || imgFileName === 'sesame') {
                e.currentTarget.src = `${import.meta.env.BASE_URL}images/sesame oil bottle with sesame seeds.jfif`;
              } else {
                console.log("Failed to load image for: ", product.name);
              }
            }}
          />
          <div className="fresh-badge"><Icon name="leaf" size={13} /> Fresh</div>
        </div>
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="farmer-source"><Icon name="user" size={16} /> Sourced from verified farmers</div>
          <div className="product-footer">
            <div className="coming"><span /> Coming soon</div>
            <div className="round-arrow"><Icon name="arrow" size={17} /></div>
          </div>
        </div>
      </div>
    );
  })}
</div>
{!visibleProducts.length && (
  <div className="empty-state">More products in this category are being prepared for launch.</div>
)}
        </section>

        <section className="prelaunch">
          <div className="prelaunch-orbit prelaunch-orbit-one" />
          <div className="prelaunch-orbit prelaunch-orbit-two" />
          <div className="prelaunch-icon"><Icon name="clock" size={27} /></div>
          <div className="prelaunch-content">
            <div className="prelaunch-tag">MARKETPLACE PRE-LAUNCH</div>
            <div className="prelaunch-title">Fresh food is almost at your doorstep.</div>
            <div className="prelaunch-copy">
              Online ordering will start very soon. Stay connected to get fresh products directly from trusted farmers.
            </div>
          </div>
          <div className="prelaunch-actions">
            <Action kind="light">Notify me</Action>
            <Action kind="secondary" onClick={() => scrollTo("products")}>Explore products</Action>
          </div>
        </section>

        <section className="journey section" id="solutions">
          <SectionTitle
            eyebrow="FROM SOIL TO SHELF"
            title="One connected, transparent journey"
            copy="We bring visibility and care to every movement in the supply chain."
          />
          <div className="journey-grid">
            {[
              ["01", "user", "Farmer", "Responsible growers and fair prices."],
              ["02", "package", "Collection center", "Fast aggregation close to farms."],
              ["03", "shield", "Quality checking", "Multi-point safety and freshness checks."],
              ["04", "leaf", "Smart packaging", "Clean, careful and low-waste handling."],
              ["05", "truck", "Customer delivery", "Fresh food, delivered with confidence."],
            ].map(([number, icon, title, copy], index) => (
              <div className="journey-step" key={title}>
                <div className="step-number">{number}</div>
                <div className="step-icon"><Icon name={icon as IconName} size={26} /></div>
                <div className="step-title">{title}</div>
                <div className="step-copy">{copy}</div>
                {index < 4 && <div className="step-connector"><Icon name="arrow" size={17} /></div>}
              </div>
            ))}
          </div>
        </section>

        <section className="farmers" id="farmers">
          <div className="farmer-visual">
            <img alt="Farmer caring for crops in a green field" src={farmerImage} />
            <div className="farmer-quote">
              <div className="quote-mark">“</div>
              <div>Better access. Fairer value. Stronger farms.</div>
            </div>
          </div>
          <div className="farmer-content">
            <SectionTitle
              eyebrow="GROWING TOGETHER"
              title="Empowering farmers through technology"
              copy="AgroNexus helps growers build resilient livelihoods while bringing safer food to more families."
            />
            <div className="benefit-grid">
              {["Fair market price", "Direct customer connection", "Faster payments", "Digital supply chain", "Better farming support", "Transparent demand"].map((item) => (
                <div className="benefit" key={item}><span><Icon name="check" size={15} /></span>{item}</div>
              ))}
            </div>
            <Action icon="arrow">Join our farmer network</Action>
          </div>
        </section>

        <section className="video-section section">
          <div className="section-top">
            <SectionTitle
              eyebrow="STORIES FROM THE FIELD"
              title="Watch our fresh food journey"
              copy="See the people, places and care behind every AgroNexus product."
            />
            <div className="video-tabs"><span className="active">Our story</span><span>Farmer stories</span><span>Harvest</span></div>
          </div>
          <div className="video-player">
            <img alt="Bangladeshi farmer working in a rice field" src={storyImage} />
            <div className="video-shade" />
            <div className="play-button"><Icon name="play" size={28} /></div>
            <div className="video-caption">
              <span>03:24</span>
              <div>From a local field to your family table</div>
            </div>
          </div>
        </section>

        <section className="testimonials section">
          <SectionTitle eyebrow="TRUSTED BY FAMILIES" title="Food that feels good to bring home" />
          <div className="testimonial-grid">
            {[
              ["NR", "Nusrat Rahman", "Dhaka", "The quality feels fresh and dependable. I also love knowing where the food is coming from."],
              ["MA", "Mehedi Alam", "Chattogram", "A modern idea our families genuinely need—safe products and a supply chain we can trust."],
              ["ST", "Sadia Tasnim", "Khulna", "The focus on farmers and traceability makes AgroNexus different from a typical grocery shop."],
            ].map(([initials, name, location, review], index) => (
              <div className={`testimonial-card ${index === 1 ? "testimonial-featured" : ""}`} key={name}>
                <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={16} />)}</div>
                <div className="review">“{review}”</div>
                <div className="customer">
                  <div className="avatar">{initials}</div>
                  <div><div className="customer-name">{name}</div><div className="customer-location">{location}, Bangladesh</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-intro">
            <SectionTitle eyebrow="WHY AGRONEXUS" title="Trust is grown at every step" />
            <div className="about-copy">We are building the infrastructure that makes fresh, safe agricultural products accessible to everyone—without leaving farmers behind.</div>
          </div>
          <div className="about-cards">
            <div className="about-card about-card-dark">
              <div className="about-label">OUR MISSION</div>
              <div className="about-card-title">Building a trusted and sustainable food ecosystem.</div>
              <Icon name="leaf" size={34} />
            </div>
            <div className="about-card">
              <div className="about-label">OUR VISION</div>
              <div className="about-card-title">Making fresh and safe agricultural products accessible for everyone.</div>
              <Icon name="globe" size={34} />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo inverse />
            <div>Pure. Fresh. Natural.</div>
            <div className="footer-note">A safer food system, built around people and the planet.</div>
          </div>
          <div className="footer-links">
            <div><strong>Explore</strong><span>Products</span><span>Our supply chain</span><span>Quality promise</span><span>About us</span></div>
            <div><strong>Partner</strong><span>For farmers</span><span>Collection centers</span><span>Institutional buyers</span><span>Careers</span></div>
            <div><strong>Contact</strong><span>hello@agronexus.com</span><span>+880 1700 000 000</span><span>Dhaka, Bangladesh</span><span>Facebook &nbsp; LinkedIn</span></div>
          </div>
          <div className="newsletter">
            <strong>Fresh updates, thoughtfully shared.</strong>
            <span>Be first to know when online ordering opens.</span>
            <div className="newsletter-field"><span>Your email address</span><div><Icon name="arrow" size={18} /></div></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AgroNexus. All rights reserved.</span>
          <span>Privacy policy &nbsp;&nbsp; Terms of service</span>
          <span>Grown with care in Bangladesh</span>
        </div>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-close" onClick={() => setSelectedProduct(null)} role="button" tabIndex={0}><Icon name="close" /></div>
            <div className={`modal-product-image product-image product-${selectedProduct.image}`} />
            <div className="modal-content">
              <div className="product-category">{selectedProduct.category}</div>
              <div className="modal-title">{selectedProduct.name}</div>
              <div className="coming modal-badge"><span /> Ordering coming soon</div>
              <div className="modal-description">Carefully sourced from verified growers and handled through the AgroNexus quality chain for freshness you can trust.</div>
              <div className="detail-list">
                <div><span>Farmer source</span><strong>Verified AgroNexus partner</strong></div>
                <div><span>Origin</span><strong>Bangladesh</strong></div>
                <div><span>Quality assurance</span><strong>Multi-point checked</strong></div>
                <div><span>Freshness</span><strong>Farm-to-center in under 24h</strong></div>
              </div>
              <Action>Notify me at launch</Action>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
