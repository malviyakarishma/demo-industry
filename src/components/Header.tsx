import styles from "../styles/header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <a href="/" className={styles.titleLink}>Industry Solutions</a>
            </h1>
            <nav className={styles.nav}>
                <a href="/">Home</a>
                <a href="/about">Company</a>
                <a href="/gallery">Gallery</a>
                <a href="/products">Products</a>
                <a href="/contact">Contact Us</a>
            </nav>
        </header>
    );
}
