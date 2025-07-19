import styles from "../styles/footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Left Side: Contact, Domestic & International */}
                <div className={styles.left}>
                    <div className={styles.contact}>
                        <h3>Contact Us</h3>
                        <p className={styles.contactInfo}>
                            Tech Industry Solutions<br />
                            <span className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                123 Business Ave, City, Country
                            </span>
                        </p>
                    </div>
                    <div className={styles.domesticInquiry}>
                        <h3 className={styles.inquiryTitle}>Domestic Inquiry</h3>
                        <div className={styles.inquiryInfo}>
                            <span className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <a href="tel:+1987654321">+1 987 654 321</a>
                            </span>
                            <span className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <a href="mailto:domestic@techindustry.com">domestic@techindustry.com</a>
                            </span>
                        </div>
                    </div>
                    <div className={styles.internationalInquiry}>
                        <h3 className={styles.inquiryTitle}>International Query</h3>
                        <div className={styles.inquiryInfo}>
                            <span className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <a href="tel:+44123456789">+44 123 456 789</a>
                            </span>
                            <span className={styles.contactItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <a href="mailto:international@techindustry.com">international@techindustry.com</a>
                            </span>
                        </div>
                    </div>
                </div>
                {/* Middle: Quick Links */}
                <div className={styles.middle}>
                    <div className={styles.links}>
                        <h3>Quick Links</h3>
                        <ul><li><a href="/">Home</a></li>
                            <li><a href="/about">Company</a></li>
                            <li><a href="/product">Products</a></li>
                            <li><a href="/gallery">Gallery</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                {/* Right Side: Social Media */}
                <div className={styles.right}>
                    <div className={styles.socialSection}>
                        <h3>Follow Us</h3>
                        <p>Take a look on the behind the scenes of our company</p>
                        <div className={styles.socialIcons}>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                {/* Instagram SVG */}
                                <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                                    <rect width="24" height="24" rx="6" fill="#fff" />
                                    <path d="M16.98 2H7C4.24 2 2 4.24 2 7v9.98C2 19.76 4.24 22 7 22h9.98c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm3 14.98c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h9.98c1.65 0 3 1.35 3 3v9.98z" fill="#E1306C" />
                                    <circle cx="12" cy="12" r="3.7" stroke="#E1306C" strokeWidth="2" />
                                    <circle cx="17.17" cy="6.83" r="1.2" fill="#E1306C" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                {/* YouTube SVG */}
                                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                                    <rect width="24" height="24" rx="6" fill="#fff" />
                                    <path d="M21.54 7.12A2.78 2.78 0 0 0 19.73 5.3C18.2 5 12 5 12 5s-6.2 0-7.73.3A2.78 2.78 0 0 0 2.46 7.12C2.16 8.65 2.16 12 2.16 12s0 3.35.3 4.88a2.78 2.78 0 0 0 1.81 1.82C5.8 19 12 19 12 19s6.2 0 7.73-.3a2.78 2.78 0 0 0 1.81-1.82c.3-1.53.3-4.88.3-4.88s0-3.35-.3-4.88zM10 15.5v-7l6 3.5-6 3.5z" fill="#FF0000" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                {/* Facebook SVG */}
                                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                                    <rect width="24" height="24" rx="6" fill="#fff" />
                                    <path d="M16.62 8.32h-2.29V7.24c0-.55.49-.67.84-.67h1.41V4.62h-1.98c-2.19 0-2.68 1.62-2.68 2.67v1.03h-1.23V11.1h1.23v6.28h2.51V11.1h1.68l.24-2.78z" fill="#1877F3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Tech Industry Solutions. All rights reserved.
            </div>
        </footer>
    );
}

