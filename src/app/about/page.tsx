import styles from "./page.module.css";

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            {/* Section 1: About Company (image right) */}
            <section className={styles.section}>
                <div className={styles.content}>
                    <h2 className={styles.heading}>About Our Company</h2>
                    <p className={styles.description}>
                        We are a leading manufacturer of high-quality molding machines and industrial equipment. With over two decades of experience in the manufacturing industry, we have established ourselves as a trusted partner for businesses worldwide. Our commitment to innovation, quality, and customer satisfaction drives everything we do.
                    </p>
                    <p className={styles.description}>
                        Our state-of-the-art facilities and skilled engineering team enable us to deliver cutting-edge solutions that meet the evolving needs of modern manufacturing. We pride ourselves on our attention to detail, precision engineering, and unwavering dedication to excellence in every product we create.
                    </p>
                </div>
                <div className={styles.image}>
                    <img
                        src="/images/about-company.jpg"
                        alt="Our Manufacturing Facility"
                        className={styles.sectionImage}
                    />
                </div>
            </section>

            {/* Section 2: Vision (image left, content right) */}
            <section className={styles.section}>
                <div className={styles.image}>
                    <img
                        src="/images/vision.jpg"
                        alt="Our Vision"
                        className={styles.sectionImage}
                    />
                </div>
                <div className={styles.content}>
                    <h2 className={styles.heading}>Our Vision</h2>
                    <p className={styles.description}>
                        To be the global leader in advanced molding technology, setting industry standards for innovation, efficiency, and sustainability. We envision a future where our machines empower manufacturers to create products that make a positive impact on society while minimizing environmental footprint.
                    </p>
                    <p className={styles.description}>
                        Through continuous research and development, we strive to push the boundaries of what's possible in manufacturing technology. Our vision extends beyond just building machines – we're building the future of sustainable, efficient, and intelligent manufacturing.
                    </p>
                </div>
            </section>

            {/* Section 3: Mission (content left, image right) */}
            <section className={styles.section}>
                <div className={styles.content}>
                    <h2 className={styles.heading}>Our Mission</h2>
                    <p className={styles.description}>
                        To deliver exceptional molding solutions that drive our customers' success through innovative technology, superior quality, and unmatched service. We are committed to providing reliable, efficient, and cost-effective manufacturing solutions that help businesses thrive in competitive markets.
                    </p>
                    <p className={styles.description}>
                        Our mission is to understand our customers' unique challenges and deliver tailored solutions that exceed expectations. We believe in building long-term partnerships based on trust, transparency, and mutual success. Every machine we build represents our dedication to excellence and our promise to deliver value that lasts.
                    </p>
                </div>
                <div className={styles.image}>
                    <img
                        src="/images/mission.jpg"
                        alt="Our Mission"
                        className={styles.sectionImage}
                    />
                </div>
            </section>
        </div>
    );
}
