"use client";
import { useState, useRef, useEffect } from "react";
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
        image: "/images/banner4.png",
    },
    {
        image: "/images/banner3.png",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        const index = current === banners.length - 1 ? 0 : current + 1;
        setCurrent(index);
    };

    const prevSlide = () => {
        const index = current === 0 ? banners.length - 1 : current - 1;
        setCurrent(index);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setCurrentX(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const diff = startX - currentX;
        const threshold = 30; // reduced threshold for smoother experience
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        const diff = startX - currentX;
        const threshold = 30; // reduced threshold for smoother experience
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        setIsDragging(false);
    };

    // Prevent text selection during drag
    useEffect(() => {
        if (isDragging) {
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'grabbing';
        } else {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }

        return () => {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [isDragging]);

    return (
        <section 
            className={`${styles.hero} ${isDragging ? styles.dragging : ''}`}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Image
                src={banners[current].image}
                alt="Banner"
                fill
                className={styles.bgImage}
                style={{ objectFit: "cover" }}
                priority
            />
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
