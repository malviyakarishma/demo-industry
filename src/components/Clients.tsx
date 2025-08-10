"use client";

import styles from "../styles/Clients.module.css";
import { useState, useEffect } from "react";

const banners = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
  "/images/product4.jpg",
  "/images/product5.jpg",
  "/images/product6.jpg",
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
  "/images/banner4.png",
  "/images/catalogue.jpg",
  "/images/about-company.jpg"
];

const visibleCount = 4;

export default function Clients() {
  const [slideWidth, setSlideWidth] = useState(240);

  // Create a much longer array for seamless looping
  const infiniteBanners = [
    ...banners, ...banners, ...banners, ...banners, ...banners,
    ...banners, ...banners, ...banners, ...banners, ...banners,
    ...banners, ...banners, ...banners, ...banners, ...banners
  ];

  // Function to get slide width based on screen size - only called on client side
  const getSlideWidth = () => {
    const width = window.innerWidth;
    if (width <= 360) return 100;
    if (width <= 480) return 120;
    if (width <= 768) return 160;
    if (width <= 1200) return 200;
    return 240;
  };

  // Update slide width on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlideWidth(getSlideWidth());
    };

    // Set initial slide width after component mounts
    setSlideWidth(getSlideWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <h2 className={styles.clientsHeading}>Our Clients</h2>
      <p className={styles.clientsSubtext}>We are trusted by industry leaders worldwide.</p>
      <div className={styles.carouselContainer}>
        {/* Slider Outer Container */}
        <div className={styles.sliderContainer}>
          {/* Slider Inner Track */}
          <div
            className={styles.sliderTrack}
            style={{
              width: `${infiniteBanners.length * slideWidth}px`
            }}
          >
            {infiniteBanners.map((logo: string, idx: number) => (
              <div key={idx} className={styles.slideItem}>
                <img
                  src={logo}
                  alt={`Client ${(idx % banners.length) + 1}`}
                  className={styles.slideImage}
                  style={{
                    width: `${slideWidth}px`,
                    height: `${slideWidth * 0.5625}px` // 16:9 aspect ratio
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 