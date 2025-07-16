import styles from "../styles/header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Tech Industry Solutions</h1>
            <nav className={styles.nav}>
                <a href="/">Home</a>
                <a href="#services">Services</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}
