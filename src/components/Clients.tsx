"use client";

import styles from "../styles/Clients.module.css";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const realBanners = [
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
];
const visibleCount = 4;
const Banner = [
  ...realBanners.slice(-visibleCount), // Last 4 at the beginning
  ...realBanners,                      // All real banners
  ...realBanners.slice(0, visibleCount) // First 4 at the end
];

export default function Clients() {
  const [currentIndex, setCurrentIndex] = useState(visibleCount);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [dragStarted, setDragStarted] = useState(false);
  const [isAnimatingBack, setIsAnimatingBack] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const maxIndex = realBanners.length + visibleCount - 1;

  // Function to pause autoplay and set timeout to resume
  const pauseAutoplay = () => {
    setAutoplayPaused(true);
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    autoplayTimeoutRef.current = setTimeout(() => {
      setAutoplayPaused(false);
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  // Autoplay: move to next slide every 1s unless dragging or paused
  useEffect(() => {
    if (isDragging || autoplayPaused) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isDragging, autoplayPaused]);

  // Reset position when reaching the end of cloned banners
  useEffect(() => {
    if (currentIndex >= Banner.length - visibleCount) {
      // Reset to the beginning of real banners after transition
      // Wait for transition to complete, then reset
      const timer = setTimeout(() => {
        setCurrentIndex(visibleCount);
      }, 300);
      return () => clearTimeout(timer);
    } else if (currentIndex < visibleCount) {
      // Reset to the end of real banners after transition
      // Wait for transition to complete, then reset
      const timer = setTimeout(() => {
        setCurrentIndex(realBanners.length + visibleCount - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, Banner.length, realBanners.length]);

  const nextSlide = () => {
    pauseAutoplay();
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    pauseAutoplay();
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    pauseAutoplay();
    setIsDragging(true);
    setDragStarted(false);
    setStartX(e.pageX);
    setSwipeX(0);
    setIsAnimatingBack(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX;
    const diff = currentX - startX;
    // Smooth out small movements to reduce jitter
    if (Math.abs(diff) > 3) {
      setSwipeX(diff * 0.8); // Reduce sensitivity for smoother feel
      setDragStarted(true);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const threshold = 60; // Lower threshold for easier swiping
    if (swipeX < -threshold) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setSwipeX(0);
    } else if (swipeX > threshold) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setSwipeX(0);
    } else {
      setIsAnimatingBack(true);
      setTimeout(() => {
        setSwipeX(0);
        setIsAnimatingBack(false);
      }, 400);
    }
    setIsDragging(false);
    setDragStarted(false);
  };

  const handleMouseLeave = () => {
    handleMouseUp();
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoplay();
    setIsDragging(true);
    setDragStarted(false);
    setStartX(e.touches[0].pageX);
    setSwipeX(0);
    setIsAnimatingBack(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    // Smooth out small movements to reduce jitter
    if (Math.abs(diff) > 3) {
      setSwipeX(diff * 0.8); // Reduce sensitivity for smoother feel
      setDragStarted(true);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // Dots navigation logic (for real banners only)
  const handleDotClick = (i: number) => {
    pauseAutoplay();
    setIsTransitioning(true);
    setCurrentIndex(i + visibleCount);
  };

  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.clientsHeading}>Our Clients</h2>
      <p className={styles.clientsSubtext}>We are trusted by industry leaders worldwide.</p>
      <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            left: "-50px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0, 123, 255, 0.8)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ‹
        </button>
        {/* Next Button */}
        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            right: "-50px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0, 123, 255, 0.8)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ›
        </button>
        {/* Slider Outer Container */}
        <div
          style={{
            width: `${4 * 140}px`,
            overflow: "hidden",
            margin: "0 auto"
          }}
        >
          {/* Slider Inner Track */}
          <div
            ref={sliderRef}
            style={{
              display: "flex",
              gap: "2rem",
              padding: "1rem 0",
              position: "relative",
              userSelect: "none",
              width: `${Banner.length * 140}px`,
              transform: `translateX(-${currentIndex * 140 + (isDragging || isAnimatingBack ? swipeX : 0)}px)`,
              transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTransitionEnd={() => {
              setIsTransitioning(false);
            }}
          >
            {Banner.map((logo, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: "120px",
                  flexShrink: 0
                }}
              >
                <img
                  src={logo}
                  alt={`Client ${idx + 1}`}
                  style={{
                    maxWidth: "120px",
                    height: "auto",
                    display: "block",
                    pointerEvents: "none"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Dots Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "1rem"
      }}>
        {realBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: currentIndex - visibleCount === i ? "#007bff" : "#ccc",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          />
        ))}
      </div>
    </section>
  );
} 