"use client";
import styles from "../styles/header.module.css";
import { useState, useEffect } from "react";

export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    if (currentScrollY < 10) {
                        setShowHeader(true);
                    } else if (currentScrollY > lastScrollY) {
                        setShowHeader(false);
                    } else if (currentScrollY < lastScrollY) {
                        setShowHeader(true);
                    }
                    setLastScrollY(currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`${styles.header} ${showHeader ? styles.headerVisible : styles.headerHidden}`}>
            <h1 className={styles.title}>
                <a href="/" className={styles.titleLink}>Industry Solutions</a>
            </h1>
            <nav className={styles.nav}>
                <a href="/">Home</a>
                <a href="/about">Company</a>
                <a href="/gallery">Gallery</a>
                <a href="/product">Products</a>
                <a href="/contact" className={styles.contactNavLink}>Contact Us</a>
            </nav>
        </header>
    );
}
