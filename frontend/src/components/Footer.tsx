import { Link } from "react-router-dom";
import { contactDetails, navLinks, socials } from "../constants/siteData";
import "../styles/footer.css";

function Footer() {
  const quickLinks = navLinks.filter(({ label }) =>
    ["Home", "Menu", "Offers", "Cart"].includes(label),
  );
  const supportLinks = [
    { label: "Contact us", to: "/support" },
    { label: "Help & FAQ", to: "/support" },
    { label: "Terms", to: "/support#terms" },
    { label: "Privacy", to: "/support#privacy" },
  ];
  const contactLinks = socials.filter(({ name }) =>
    ["WhatsApp", "Facebook"].includes(name),
  );

  return (
    <footer className="site-footer">
      <div className="site-footer-grid container">
        <section className="footer-brand" aria-label="Burger Taste">
          <Link to="/" className="footer-logo">
            Burger Taste
          </Link>
          <p>Fresh, hot &amp; made to love.</p>
          <nav className="footer-socials" aria-label="Social media">
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Burger Taste on ${name} (opens in new tab)`}
                className="footer-social-link"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </nav>
        </section>

        <nav className="footer-column" aria-label="Quick links">
          <h2>Quick links</h2>
          <ul>
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-column" aria-label="Support">
          <h2>Support</h2>
          <ul>
            {supportLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="footer-column footer-contact" id="contact">
          <h2>Contact</h2>
          <ul>
            {contactLinks.map(({ name, href }) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </li>
            ))}
            <li>
              <span>Hours: {contactDetails.openingHours}</span>
            </li>
            <li>
              <span>Address: {contactDetails.address}</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Burger Taste. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
