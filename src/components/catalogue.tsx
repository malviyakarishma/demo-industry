import styles from "../styles/catalogue.module.css";

export default function CatalogueSection() {
  return (
    <div className={styles.catalogueContainer}>
    <section className={styles.catalogueSection}>
      {/* Left: Catalogue Image */}
      <div className={styles.imageWrapper}>
        <img
          src="/images/catalogue.jpg"
          alt="Our Product Catalogue"
          className={styles.catalogueImage}
        />
      </div>
      {/* Right: Content */}
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>Discover Our Catalogue</h2>
        <p className={styles.description}>
          At Tech Industry Solutions, we believe in delivering only the best quality and innovation to our clients.
          Our catalogue showcases our commitment to technological advancement, robust engineering, and customer-focused solutions.
          Explore the range and see why we’re trusted by leading manufacturers worldwide.
        </p>
        <p className={styles.highlight}>
          Check out this catalogue to find the perfect solution for your business.
        </p>
        <a
          className={styles.downloadBtn}
          href="/assets/TechIndustryCatalogue.pdf"
          download
        >
          Download Catalogue
        </a>
      </div>
    </section>
    </div>
  );
}
