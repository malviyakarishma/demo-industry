"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/herosection.module.css";

const banners = [
    {
        image: "/images/banner1.png",
    },
    {
        image: "/images/banner2.png",
    },
    {
        image: "/images/banner3.png",
    },
    {
        image: "/images/banner2.png",
    },
    {
        image: "/images/banner3.png",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        const index = current === 0 ? banners.length - 1 : current - 1;
        setCurrent(index);
    };

    const nextSlide = () => {
        const index = current === banners.length - 1 ? 0 : current + 1;
        setCurrent(index);
    };

    return (
        <section className={styles.hero}>
            <Image
                src={banners[current].image}
                alt="Banner"
                fill
                className={styles.bgImage}
                style={{ objectFit: "cover" }}
                priority
            />
            <button className={`${styles.navBtn} ${styles.left}`} onClick={prevSlide}>
                ←
            </button>
            <button className={`${styles.navBtn} ${styles.right}`} onClick={nextSlide}>
                →
            </button>
            <div className={styles.dots}>
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        className={`${styles.dot} ${current === idx ? styles.activeDot : ""}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>

    );
}
