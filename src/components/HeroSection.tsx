"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/herosection.module.css";

const banners = [
    {
        image: "/images/banner1.png",
    },
    {
        image: "/images/banner5.png",
    },
    {
        image: "/images/banner4.png",
    },
    {
        image: "/images/banner2.png",
    },
    {
        image: "/images/banner3.png",
    },
];

function HeroSectionInner() {
    const [current, setCurrent] = useState(0);
    const [swipeX, setSwipeX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [isAnimatingBack, setIsAnimatingBack] = useState(false);
    const [direction, setDirection] = useState<null | 'left' | 'right'>(null);
    const [startX, setStartX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef(current);
    // Track if a drag is in progress (mouse/touch is down and moved)
    const [dragStarted, setDragStarted] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => { currentRef.current = current; }, [current]);

    useEffect(() => {
        function updateWidth() {
            setContainerWidth(window.innerWidth);
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Helper to check if event is from dots
    function isFromDots(e: React.MouseEvent | React.TouchEvent) {
        const target = e.target as HTMLElement;
        return target && target.closest && target.closest('.dots');
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isFromDots(e)) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStarted(false);
        setStartX(e.clientX);
        setSwipeX(0);
        setIsAnimatingBack(false);
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const delta = e.clientX - startX;
        setSwipeX(delta);
        if (Math.abs(delta) > 5) setDragStarted(true);
    };
    const handleMouseUp = () => {
        if (!isDragging) return;
        const threshold = 80;
        if (swipeX < -threshold) {
            animateToBanner('left');
        } else if (swipeX > threshold) {
            animateToBanner('right');
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
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isFromDots(e)) return;
        setIsDragging(true);
        setDragStarted(false);
        setStartX(e.touches[0].clientX);
        setSwipeX(0);
        setIsAnimatingBack(false);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const delta = e.touches[0].clientX - startX;
        setSwipeX(delta);
        if (Math.abs(delta) > 5) setDragStarted(true);
    };
    const handleTouchEnd = () => {
        if (!isDragging) return;
        const threshold = 80;
        if (swipeX < -threshold) {
            animateToBanner('left');
        } else if (swipeX > threshold) {
            animateToBanner('right');
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
    function animateToBanner(dir: 'left' | 'right') {
        let next = dir === 'left'
            ? (current + 1) % banners.length
            : (current - 1 + banners.length) % banners.length;
        setAnimating(true);
        setDirection(dir);
        setSwipeX(dir === 'left' ? -containerWidth : containerWidth);
        setTimeout(() => {
            setCurrent(idx => {
                let n = dir === 'left'
                    ? (idx + 1) % banners.length
                    : (idx - 1 + banners.length) % banners.length;
                return n;
            });
            setAnimating(false); // Set animating to false BEFORE resetting swipeX
            setDirection(null);
            setSwipeX(0); // This will snap banners to correct position without animation
        }, 400);
    }
    // Keyboard navigation (optional)
    // useEffect(() => {
    //     const handleKey = (e: KeyboardEvent) => {
    //         if (e.key === 'ArrowLeft') prevSlide();
    //         if (e.key === 'ArrowRight') nextSlide();
    //     };
    //     window.addEventListener('keydown', handleKey);
    //     return () => window.removeEventListener('keydown', handleKey);
    // }, []);

    // Dot click handler with chained animation steps using ref


   

    // Render logic
    // Always render prev, current, and next banners for seamless swipe
    const prevIdx = (current - 1 + banners.length) % banners.length;
    const nextIdx = (current + 1) % banners.length;

    // Helper: should animate only when animating, dragging, or animating back
    const shouldAnimate = animating || isDragging || isAnimatingBack;

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
            {/* Prev banner */}
            <div
                className={styles.swipeWrapper}
                style={{
                    transform: isDragging || isAnimatingBack
                        ? (swipeX > 0 ? `translateX(${swipeX - containerWidth}px)` : `translateX(${-containerWidth}px)`)
                        : (animating && direction === 'right' ? `translateX(0px)` : `translateX(${-containerWidth}px)`),
                    zIndex: 2,
                    transition: shouldAnimate ? 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
                    opacity: 1,
                }}
            >
                <Image
                    src={banners[prevIdx].image}
                    alt="Banner"
                    fill
                    className={styles.bgImage}
                    style={{ objectFit: "cover" }}
                    priority={false}
                    loading="eager"
                />
            </div>
            {/* Current banner */}
            <div
                className={styles.swipeWrapper}
                style={{
                    transform: isDragging || isAnimatingBack
                        ? `translateX(${swipeX}px)`
                        : (animating
                            ? (direction === 'left' ? `translateX(${-containerWidth}px)` : direction === 'right' ? `translateX(${containerWidth}px)` : `translateX(0px)`)
                            : `translateX(0px)`),
                    zIndex: 3,
                    transition: shouldAnimate ? 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
                    opacity: 1,
                }}
            >
                <Image
                    src={banners[current].image}
                    alt="Banner"
                    fill
                    className={styles.bgImage}
                    style={{ objectFit: "cover" }}
                    priority={true}
                    loading="eager"
                />
            </div>
            {/* Next banner */}
            <div
                className={styles.swipeWrapper}
                style={{
                    transform: isDragging || isAnimatingBack
                        ? (swipeX < 0 ? `translateX(${swipeX + containerWidth}px)` : `translateX(${containerWidth}px)`)
                        : (animating && direction === 'left' ? `translateX(0px)` : `translateX(${containerWidth}px)`),
                    zIndex: 2,
                    transition: shouldAnimate ? 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
                    opacity: 1,
                }}
            >
                <Image
                    src={banners[nextIdx].image}
                    alt="Banner"
                    fill
                    className={styles.bgImage}
                    style={{ objectFit: "cover" }}
                    priority={false}
                    loading="eager"
                />
            </div>
          
        </section>
    );
}

export default function HeroSection(props: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;
    return <HeroSectionInner {...props} />;
}
