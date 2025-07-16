import styles from "../styles/service.module.css";

export default function Services() {
    return (
        <section id="services" className={styles.services}>
            <h3>Our Services</h3>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h4>Cloud Solutions</h4>
                    <p>Scalable, secure, and cost-effective cloud infrastructure for your business.</p>
                </div>
                <div className={styles.card}>
                    <h4>AI & Analytics</h4>
                    <p>Unlock insights and automate processes with advanced AI technologies.</p>
                </div>
                <div className={styles.card}>
                    <h4>Cybersecurity</h4>
                    <p>Protect your digital assets with our comprehensive security solutions.</p>
                </div>
            </div>
        </section>
    );
}
