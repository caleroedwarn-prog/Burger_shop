import { motion, useReducedMotion } from "framer-motion";
import {
  FiClock,
  FiCoffee,
  FiDroplet,
  FiFeather,
  FiAnchor,
  FiGrid,
  FiHeart,
  FiMapPin,
  FiMessageCircle,
  FiShoppingBag,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { useProductModal } from "../context/ProductModalContext";
import ProductCard from "../components/ProductCard";
import { ProductSkeleton } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessages";
import { CustomButton } from "../components/primaryButtons";
import Seo from "../components/Seo";
import { contactDetails, socials } from "../constants/siteData";
import { fadeUp, stagger, viewportConfig } from "../animations";
import heroImage from "../assets/burger.jpg";
import "../styles/home.css";

const categoryLinks = [
  { label: "Beef", icon: FiGrid },
  { label: "Chicken", icon: FiFeather },
  { label: "Veggie", icon: FiDroplet },
  { label: "Fish", icon: FiAnchor },
  { label: "Combos", icon: FiShoppingBag },
  { label: "Fries", icon: FiZap },
  { label: "Drinks", icon: FiCoffee },
];

const features = [
  {
    title: "Handpicked Ingredients",
    description: "Fresh vegetables and quality meat, chosen every morning.",
    icon: FiHeart,
  },
  {
    title: "Freshly Baked Buns",
    description: "Soft, toasted buns that hold every bite together.",
    icon: FiCoffee,
  },
  {
    title: "Grilled to Order",
    description: "Cooked only after you order, so it arrives hot.",
    icon: FiZap,
  },
  {
    title: "Fast Delivery",
    description: "Hot food brought straight to your door.",
    icon: FiTruck,
  },
];

function HomePage() {
  const { products, error, loading, refetch } = useProducts();
  const { addItem } = useCart();
  const { openProduct, selectedProduct } = useProductModal();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const revealVariants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeUp;
  const staggerVariants = reduceMotion
    ? { hidden: {}, visible: {} }
    : stagger;
  const sectionMotion = {
    variants: staggerVariants,
    initial: reduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: viewportConfig,
  };
  const featured = products.slice(0, 4);
  const whatsapp = socials.find(({ name }) => name === "WhatsApp");
  const facebook = socials.find(({ name }) => name === "Facebook");
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Burger Taste",
    url: window.location.origin,
    image: new URL("/burger-being-prepared.jpg", window.location.origin).toString(),
    sameAs: socials.map(({ href }) => href),
  };

  return (
    <main className="home-page">
      {!selectedProduct && (
        <Seo
          title="Fresh Hot Burgers Delivered"
          description="Enjoy fresh, made-to-order burgers from Burger Taste. Explore our menu, choose your favorites, and order a delicious meal today, made fresh daily."
          image="/og-share-image.jpg"
          path="/"
          jsonLd={restaurantJsonLd}
        />
      )}

      <motion.section
        className="banner home-hero"
        aria-labelledby="home-heading"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.4 }}
      >
        <img
          className="home-hero-image"
          src={heroImage}
          alt="A freshly grilled beef burger with lettuce, tomato, and melted cheese"
          width="1600"
          height="900"
          fetchPriority="high"
        />
        <div className="home-hero-content">
          <p className="home-eyebrow">Fresh, hot &amp; made to love</p>
          <h1 id="home-heading">Welcome to Burger Taste</h1>
          <p>Fresh, hot, and made just for you.</p>
          <div className="home-hero-actions">
            <CustomButton
              title="Order Now"
              onPress={() => navigate("/menu")}
            />
            <Link className="home-outline-button" to="/menu">
              View Menu
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="offers"
        className="home-section container home-deal-section"
        aria-labelledby="deal-heading"
        {...sectionMotion}
      >
        <motion.div className="home-deal-photo" variants={revealVariants}>
          <img
            src="/burger-being-prepared.jpg"
            alt="A burger being prepared with fresh ingredients"
            width="900"
            height="620"
            loading="lazy"
          />
        </motion.div>
        <motion.div className="home-deal-card" variants={revealVariants}>
          <p className="home-section-eyebrow">Deal of the Day</p>
          <h2 id="deal-heading">Burger + Fries + Drink</h2>
          <p>Our best-selling combo at a special price. Today only.</p>
          <Link className="home-deal-link" to="/menu?category=Combos">
            Grab the Deal
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        className="home-section home-why container"
        aria-labelledby="why-heading"
        {...sectionMotion}
      >
        <motion.div className="home-why-image" variants={revealVariants}>
          <img
            src="/double-beef-burger-cutout.jpg"
            alt="Double beef burger"
            width="720"
            height="640"
            loading="lazy"
            className={reduceMotion ? "" : "home-floating-burger"}
          />
        </motion.div>
        <div className="home-why-content">
          <motion.p className="home-section-eyebrow" variants={revealVariants}>
            The Burger Taste difference
          </motion.p>
          <motion.h2 id="why-heading" variants={revealVariants}>
            Fresh, Hot &amp; Made to Order
          </motion.h2>
          <motion.div
            className="home-feature-grid"
            variants={staggerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            {features.map(({ title, description, icon: Icon }) => (
              <motion.article
                className="home-feature"
                key={title}
                variants={revealVariants}
              >
                <span className="home-feature-icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="home-section home-categories-section"
        aria-labelledby="categories-heading"
        {...sectionMotion}
      >
        <div className="container">
          <motion.div className="home-section-heading" variants={revealVariants}>
            <p className="home-section-eyebrow">Something for every craving</p>
            <h2 id="categories-heading">Explore Our Menu</h2>
          </motion.div>
          <motion.div
            className="home-category-row"
            variants={staggerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            {categoryLinks.map(({ label, icon: Icon }) => (
              <motion.div key={label} variants={revealVariants}>
                <Link
                  className="home-category-card"
                  to={`/menu?category=${encodeURIComponent(label)}`}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="home-section container home-featured-section"
        aria-labelledby="featured-heading"
        {...sectionMotion}
      >
        <motion.div
          className="home-section-heading home-featured-heading"
          variants={revealVariants}
        >
          <div>
            <p className="home-section-eyebrow">Made fresh for you</p>
            <h2 id="featured-heading">Our Most Loved Burgers</h2>
            <p>Pick your favorite and add it to your cart.</p>
          </div>
          <Link className="home-text-link" to="/menu">
            View Full Menu
          </Link>
        </motion.div>

        {loading && (
          <div className="home-product-grid" aria-label="Loading burgers">
            {Array.from({ length: 4 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}
        {!loading && error !== "" && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}
        {!loading && error === "" && featured.length === 0 && (
          <p className="home-empty-products">New favorites are coming soon.</p>
        )}
        {!loading && error === "" && featured.length > 0 && (
          <motion.div
            className="home-product-grid"
            variants={staggerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            {featured.map((burger) => (
              <motion.div key={burger.id} variants={revealVariants}>
                <ProductCard
                  product={burger}
                  onPress={() => openProduct(burger)}
                  onAdd={() => addItem(burger)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      <motion.section
        className="home-section home-steps-section"
        aria-labelledby="steps-heading"
        {...sectionMotion}
      >
        <div className="container">
          <motion.div className="home-section-heading" variants={revealVariants}>
            <p className="home-section-eyebrow">Good food, made simple</p>
            <h2 id="steps-heading">How It Works</h2>
          </motion.div>
          <motion.ol
            className="home-steps"
            variants={staggerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              ["01", "Choose your burger"],
              ["02", "Place your order"],
              ["03", "Enjoy it hot"],
            ].map(([number, label]) => (
              <motion.li key={number} variants={revealVariants}>
                <span className="home-step-number">{number}</span>
                <h3>{label}</h3>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      <motion.section
        className="home-promo-band"
        aria-labelledby="promo-heading"
        {...sectionMotion}
      >
        <div className="container home-promo-content">
          <motion.div variants={revealVariants}>
            <p className="home-section-eyebrow">Your next favorite is waiting</p>
            <h2 id="promo-heading">Hungry? Try Our Signature Burgers</h2>
            <p>Stacked high, grilled to perfection, packed with flavor.</p>
            <CustomButton
              title="Order Now"
              onPress={() => navigate("/menu")}
            />
          </motion.div>
          <motion.img
            src="/double-beef-burger-cutout.jpg"
            alt=""
            width="520"
            height="440"
            loading="lazy"
            variants={revealVariants}
          />
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="home-section container home-contact-section"
        aria-labelledby="contact-heading"
        {...sectionMotion}
      >
        <motion.div className="home-section-heading" variants={revealVariants}>
          <p className="home-section-eyebrow">We’d love to hear from you</p>
          <h2 id="contact-heading">Get in touch</h2>
        </motion.div>
        <motion.div
          className="home-contact-grid"
          variants={staggerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.a
            className="home-contact-card"
            href={whatsapp?.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={revealVariants}
          >
            <FiMessageCircle aria-hidden="true" />
            <span className="home-contact-label">WhatsApp</span>
            <strong>Chat with us</strong>
          </motion.a>
          <motion.a
            className="home-contact-card"
            href={facebook?.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={revealVariants}
          >
            <FiMessageCircle aria-hidden="true" />
            <span className="home-contact-label">Facebook</span>
            <strong>Follow our page</strong>
          </motion.a>
          <motion.div className="home-contact-card" variants={revealVariants}>
            <FiClock aria-hidden="true" />
            <span className="home-contact-label">Opening hours</span>
            <strong>{contactDetails.openingHours}</strong>
          </motion.div>
          <motion.div className="home-contact-card" variants={revealVariants}>
            <FiMapPin aria-hidden="true" />
            <span className="home-contact-label">Address</span>
            <strong>{contactDetails.address}</strong>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}

export default HomePage;
