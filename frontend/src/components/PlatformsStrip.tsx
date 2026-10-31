import { platforms } from "../constants/siteData";
import "../styles/platformsStrip.css";

function PlatformsStrip() {
  return (
    <section className="platforms-strip" aria-labelledby="platforms-heading">
      <div className="container platforms-container">
        <h2 id="platforms-heading">Popular platforms</h2>
        <div className="platforms-marquee">
          <div className="platforms-track">
            <ul className="platforms-set">
              {platforms.map(({ name, href, logo }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (opens in new tab)`}
                  >
                    <img
                      src={logo}
                      alt={`${name} logo`}
                      width="130"
                      height="38"
                      loading="lazy"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="platforms-set platforms-set-copy" aria-hidden="true" inert>
              {platforms.map(({ name, logo }) => (
                <li key={name}>
                  <span>
                    <img
                      src={logo}
                      alt=""
                      width="130"
                      height="38"
                      loading="lazy"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="platforms-disclaimer">
          All brand names and logos are the property of their respective owners
          and do not imply endorsement.
        </p>
      </div>
    </section>
  );
}

export default PlatformsStrip;
