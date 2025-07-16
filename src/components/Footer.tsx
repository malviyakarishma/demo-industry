import styles from "../styles/footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            &copy; {new Date().getFullYear()} Tech Industry Solutions. All rights reserved.
        </footer>
    );
}
