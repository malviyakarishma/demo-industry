import styles from "../styles/contact.module.css";

export default function Contact() {
    return (
        <section id="contact" className={styles.contact}>
            <h3>Contact Us</h3>
            <p>
                Ready to transform your business?{" "}
                <a href="mailto:info@techindustry.com">Email us</a> to get started!
            </p>
        </section>
    );
}
