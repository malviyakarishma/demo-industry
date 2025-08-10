"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/productDetail.module.css';

const products = [
    {
        id: 1,
        name: "Injection Molding Machine",
        description: "High-precision injection molding machines for plastic parts production.",
        longDescription: "Our advanced injection molding machines deliver exceptional precision and efficiency for plastic parts production. These state-of-the-art machines feature advanced control systems, energy-efficient operation, and robust construction for continuous production environments.",
        image: "/images/product1.jpg",
        specifications: [
            "Clamping Force: 50-5000 tons",
            "Injection Unit: 25-5000g",
            "Control System: Advanced PLC",
            "Energy Efficiency: Class A",
            "Cycle Time: 3-60 seconds",
            "Automation Ready: Yes"
        ],
        features: [
            "High precision temperature control",
            "Advanced mold protection system",
            "Energy-efficient servo motors",
            "Real-time monitoring and data logging",
            "Quick mold change system",
            "Integrated safety features"
        ],
        applications: [
            {
                name: "Automotive parts",
                description: "Manufacturing of automotive components including dashboards, bumpers, and interior trim",
                image: "/images/product1.jpg"
            },
            {
                name: "Electronics housings",
                description: "Production of electronic device enclosures and protective casings",
                image: "/images/product2.jpg"
            },
            {
                name: "Medical devices",
                description: "Precision manufacturing of medical equipment and disposable medical items",
                image: "/images/product3.jpg"
            },
            {
                name: "Consumer products",
                description: "Mass production of household items and consumer goods",
                image: "/images/product4.jpg"
            },
            {
                name: "Industrial components",
                description: "Manufacturing of industrial machinery parts and components",
                image: "/images/product5.jpg"
            }
        ]
    },
    {
        id: 2,
        name: "Blow Molding Machine",
        description: "Automated blow molding equipment for hollow plastic containers and bottles manufacturing.",
        longDescription: "Our blow molding machines are designed for high-volume production of hollow plastic containers, bottles, and other products. These machines offer superior performance, reliability, and cost-effectiveness for various applications.",
        image: "/images/product2.jpg",
        specifications: [
            "Production Capacity: 100-5000 bottles/hour",
            "Container Size: 50ml-20L",
            "Material: HDPE, PET, PP",
            "Control System: Touchscreen PLC",
            "Energy Consumption: Optimized",
            "Automation Level: Full"
        ],
        features: [
            "Multi-cavity mold system",
            "Advanced parison control",
            "Integrated quality inspection",
            "Quick changeover capability",
            "Energy recovery system",
            "Remote monitoring capability"
        ],
        applications: [
            {
                name: "Beverage bottles",
                description: "Production of plastic bottles for soft drinks, water, and other beverages",
                image: "/images/product2.jpg"
            },
            {
                name: "Chemical containers",
                description: "Manufacturing of containers for chemical storage and transportation",
                image: "/images/product3.jpg"
            },
            {
                name: "Pharmaceutical packaging",
                description: "Production of medicine bottles and pharmaceutical containers",
                image: "/images/product4.jpg"
            },
            {
                name: "Cosmetic containers",
                description: "Manufacturing of beauty product bottles and cosmetic packaging",
                image: "/images/product5.jpg"
            },
            {
                name: "Industrial packaging",
                description: "Production of industrial storage containers and packaging solutions",
                image: "/images/product6.jpg"
            }
        ]
    },
    {
        id: 3,
        name: "Compression Molding Press",
        description: "Heavy-duty compression molding presses for rubber and composite materials processing.",
        longDescription: "Our compression molding presses are built for heavy-duty applications in rubber and composite materials processing. These robust machines provide consistent quality and high productivity for demanding industrial applications.",
        image: "/images/product3.jpg",
        specifications: [
            "Pressing Force: 100-5000 tons",
            "Platen Size: 400x400mm to 2000x2000mm",
            "Temperature Range: 0-400°C",
            "Control System: Digital PLC",
            "Safety Features: Multiple levels",
            "Automation: Semi to full"
        ],
        features: [
            "Precise temperature control",
            "Advanced pressure monitoring",
            "Quick mold change system",
            "Integrated safety interlocks",
            "Energy-efficient heating",
            "Data logging and reporting"
        ],
        applications: [
            {
                name: "Rubber products",
                description: "Manufacturing of rubber seals, gaskets, and automotive rubber parts",
                image: "/images/product3.jpg"
            },
            {
                name: "Composite materials",
                description: "Production of fiberglass and carbon fiber composite components",
                image: "/images/product4.jpg"
            },
            {
                name: "Thermoset plastics",
                description: "Manufacturing of heat-resistant plastic components",
                image: "/images/product5.jpg"
            },
            {
                name: "Automotive parts",
                description: "Production of automotive components requiring high strength",
                image: "/images/product6.jpg"
            },
            {
                name: "Aerospace components",
                description: "Manufacturing of aerospace parts and structural components",
                image: "/images/product1.jpg"
            }
        ]
    },
    {
        id: 4,
        name: "Rotational Molding Machine",
        description: "Large-scale rotational molding equipment for hollow plastic products and tanks.",
        longDescription: "Our rotational molding machines are designed for producing large, hollow plastic products and tanks. These machines offer excellent material distribution and cost-effective production for large-scale items.",
        image: "/images/product4.jpg",
        specifications: [
            "Chamber Size: 1-10 cubic meters",
            "Temperature Range: 150-400°C",
            "Rotation Speed: 1-20 RPM",
            "Control System: Programmable",
            "Energy Source: Electric/Gas",
            "Automation: Available"
        ],
        features: [
            "Multi-axis rotation system",
            "Precise temperature control",
            "Programmable cycle times",
            "Energy-efficient operation",
            "Easy mold loading/unloading",
            "Integrated cooling system"
        ],
        applications: [
            {
                name: "Storage tanks",
                description: "Manufacturing of large storage tanks for water, chemicals, and fuels",
                image: "/images/product4.jpg"
            },
            {
                name: "Chemical containers",
                description: "Production of chemical storage and transportation containers",
                image: "/images/product5.jpg"
            },
            {
                name: "Playground equipment",
                description: "Manufacturing of plastic playground structures and equipment",
                image: "/images/product6.jpg"
            },
            {
                name: "Automotive parts",
                description: "Production of large automotive components and fuel tanks",
                image: "/images/product1.jpg"
            },
            {
                name: "Industrial equipment",
                description: "Manufacturing of industrial equipment housings and enclosures",
                image: "/images/product2.jpg"
            }
        ]
    },
    {
        id: 5,
        name: "Extrusion Molding Line",
        description: "Continuous extrusion molding systems for profiles, pipes, and sheet production.",
        longDescription: "Our extrusion molding lines provide continuous production of profiles, pipes, sheets, and other extruded products. These systems offer high efficiency and consistent quality for various plastic extrusion applications.",
        image: "/images/product5.jpg",
        specifications: [
            "Screw Diameter: 25-200mm",
            "Output Capacity: 10-2000 kg/hour",
            "Temperature Control: ±1°C",
            "Control System: Advanced PLC",
            "Energy Efficiency: High",
            "Automation: Full line"
        ],
        features: [
            "Precise temperature control",
            "Advanced screw design",
            "Integrated cooling system",
            "Automatic thickness control",
            "Quality monitoring system",
            "Quick changeover capability"
        ],
        applications: [
            {
                name: "PVC pipes and profiles",
                description: "Production of PVC pipes, window frames, and building profiles",
                image: "/images/product5.jpg"
            },
            {
                name: "Plastic sheets and films",
                description: "Manufacturing of plastic sheets, films, and packaging materials",
                image: "/images/product6.jpg"
            },
            {
                name: "Window frames",
                description: "Production of plastic window frames and door profiles",
                image: "/images/product1.jpg"
            },
            {
                name: "Automotive trim",
                description: "Manufacturing of automotive interior and exterior trim components",
                image: "/images/product2.jpg"
            },
            {
                name: "Construction materials",
                description: "Production of construction materials and building components",
                image: "/images/product3.jpg"
            }
        ]
    },
    {
        id: 6,
        name: "Thermoforming Machine",
        description: "Advanced thermoforming equipment for plastic sheet forming and packaging solutions.",
        longDescription: "Our thermoforming machines provide advanced plastic sheet forming capabilities for packaging and industrial applications. These machines offer high precision, efficiency, and versatility for various thermoforming needs.",
        image: "/images/product6.jpg",
        specifications: [
            "Sheet Width: 300-2000mm",
            "Forming Depth: 50-300mm",
            "Temperature Range: 100-300°C",
            "Cycle Time: 2-30 seconds",
            "Control System: Touchscreen",
            "Automation: Available"
        ],
        features: [
            "Precise temperature control",
            "Advanced vacuum system",
            "Quick mold change",
            "Integrated trimming",
            "Quality inspection system",
            "Energy-efficient operation"
        ],
        applications: [
            {
                name: "Food packaging",
                description: "Production of food containers, trays, and packaging materials",
                image: "/images/product6.jpg"
            },
            {
                name: "Medical packaging",
                description: "Manufacturing of medical device packaging and sterile containers",
                image: "/images/product1.jpg"
            },
            {
                name: "Automotive parts",
                description: "Production of automotive interior panels and trim components",
                image: "/images/product2.jpg"
            },
            {
                name: "Consumer products",
                description: "Manufacturing of household items and consumer product packaging",
                image: "/images/product3.jpg"
            },
            {
                name: "Industrial packaging",
                description: "Production of industrial packaging and protective materials",
                image: "/images/product4.jpg"
            }
        ]
    }
];

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = parseInt(params.id as string);
    const product = products.find(p => p.id === productId);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('next');
    const [slidesPerView, setSlidesPerView] = useState(3);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Function to get responsive values based on screen size - only called on client side
    const getResponsiveValues = () => {
        const width = window.innerWidth;
        if (width <= 480) {
            return { slidesPerView: 1, offset: 1 };
        } else if (width <= 768) {
            return { slidesPerView: 2, offset: 2 };
        } else if (width <= 1024) {
            return { slidesPerView: 2, offset: 2 };
        } else {
            return { slidesPerView: 3, offset: 3 };
        }
    };

    // Update responsive values on window resize
    useEffect(() => {
        const handleResize = () => {
            const { slidesPerView: newSlidesPerView } = getResponsiveValues();
            setSlidesPerView(newSlidesPerView);
        };

        // Set initial responsive values after component mounts
        const { slidesPerView: initialSlidesPerView } = getResponsiveValues();
        setSlidesPerView(initialSlidesPerView);
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleRequestQuote = () => {
        // Navigate to contact page with product information
        router.push(`/contact?product=${productId}&productName=${encodeURIComponent(product?.name || '')}`);
    };

    const handleHeroRequestQuote = () => {
        handleRequestQuote();
    };

    const handleBottomRequestQuote = () => {
        handleRequestQuote();
    };

    // Get all products except current product and create infinite loop
    const baseRelatedProducts = products.filter(p => p.id !== productId);
    // Create infinite loop by adding clones at the beginning and end
    const relatedProducts = [
        ...baseRelatedProducts.slice(-slidesPerView), // Last items at the beginning
        ...baseRelatedProducts,
        ...baseRelatedProducts.slice(0, slidesPerView) // First items at the end
    ];
    const totalSlides = baseRelatedProducts.length;
    const offset = slidesPerView; // Dynamic offset based on slides per view

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('next');
        
        setCurrentSlide(prev => {
            const next = prev + 1;
            if (next >= totalSlides) {
                // When reaching the end, jump to the cloned beginning
                setTimeout(() => {
                    setCurrentSlide(0);
                    setIsTransitioning(false);
                }, 500);
                return totalSlides;
            }
            setTimeout(() => setIsTransitioning(false), 500);
            return next;
        });
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('prev');
        
        setCurrentSlide(prev => {
            const next = prev - 1;
            if (next < 0) {
                // When reaching the beginning, jump to the cloned end
                setTimeout(() => {
                    setCurrentSlide(totalSlides - 1);
                    setIsTransitioning(false);
                }, 500);
                return -1;
            }
            setTimeout(() => setIsTransitioning(false), 500);
            return next;
        });
    };

    if (!product) {
        return (
            <div className={styles.errorContainer}>
                <h1>Product Not Found</h1>
                <p>The product you're looking for doesn't exist.</p>
                <Link href="/product" className={styles.backButton}>
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href="/product" className={styles.breadcrumbLink}>Products</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{product.name}</span>
            </div>

            {/* Hero Section with Large Product Image */}
            <div className={styles.heroSection}>
                <div className={styles.heroImageContainer}>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className={styles.heroImage}
                    />
                    <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{product.name}</h1>
                    <p className={styles.heroDescription}>{product.longDescription}</p>
                    <div className={styles.heroCTA}>
                        <button 
                            className={styles.primaryCTA}
                            onClick={handleHeroRequestQuote}
                        >
                            Request Quote
                        </button>
                        <Link href="/contact" className={styles.secondaryCTA}>
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Details in Layered Cards */}
            <div className={styles.detailsSection}>
                <div className={styles.detailsGrid}>
                    {/* Specifications Card */}
                    <div className={styles.detailCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Specifications</h2>
                        </div>
                        <ul className={styles.specificationsList}>
                            {product.specifications.map((spec, index) => (
                                <li key={index} className={styles.specificationItem}>
                                    {spec}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features Card */}
                    <div className={styles.detailCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Key Features</h2>
                        </div>
                        <ul className={styles.featuresList}>
                            {product.features.map((feature, index) => (
                                <li key={index} className={styles.featureItem}>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Applications Section - Full Width */}
            <div className={styles.applicationsSection}>
                <div className={styles.applicationsHeader}>
                    <h2 className={styles.applicationsTitle}>Applications</h2>
                </div>
                <div className={styles.applicationsGrid}>
                    {product.applications.map((application, index) => (
                        <div key={index} className={styles.applicationCard}>
                            <div className={styles.applicationImageContainer}>
                                <img 
                                    src={application.image} 
                                    alt={application.name} 
                                    className={styles.applicationImage}
                                />
                            </div>
                            <div className={styles.applicationContent}>
                                <h3 className={styles.applicationName}>{application.name}</h3>
                                <p className={styles.applicationDescription}>{application.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related Products Section with Swipe */}
            <div className={styles.relatedProductsSection}>
                <div className={styles.relatedProductsHeader}>
                    <h2 className={styles.relatedProductsTitle}>Related Products</h2>
                </div>
                
                {/* Navigation Buttons - Outside Container */}
                {totalSlides > slidesPerView && (
                    <>
                        <button 
                            className={`${styles.slideButton} ${styles.prevButton}`}
                            onClick={prevSlide}
                        >
                            ‹
                        </button>
                        <button 
                            className={`${styles.slideButton} ${styles.nextButton}`}
                            onClick={nextSlide}
                        >
                            ›
                        </button>
                    </>
                )}
                
                <div className={styles.relatedProductsContainer}>
                    {/* Products Slider */}
                    <div className={styles.relatedProductsSlider} ref={sliderRef}>
                        <div 
                            className={styles.relatedProductsTrack}
                            style={{
                                transform: `translateX(-${(currentSlide + offset) * (100 / slidesPerView)}%)`,
                                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                                willChange: 'transform'
                            }}
                        >
                            {relatedProducts.map((relatedProduct, index) => (
                                <div key={`${relatedProduct.id}-${index}`} className={styles.relatedProductCard}>
                                    <div className={styles.relatedProductImageContainer}>
                                        <img 
                                            src={relatedProduct.image} 
                                            alt={relatedProduct.name} 
                                            className={styles.relatedProductImage}
                                        />
                                    </div>
                                    <div className={styles.relatedProductContent}>
                                        <h3 className={styles.relatedProductName}>{relatedProduct.name}</h3>
                                        <p className={styles.relatedProductDescription}>{relatedProduct.description}</p>
                                        <Link 
                                            href={`/product/${relatedProduct.id}`}
                                            className={styles.learnMoreLink}
                                        >
                                            Learn More →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA Section */}
            <div className={styles.bottomCTASection}>
                <div className={styles.ctaContent}>
                    <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
                    <p className={styles.ctaDescription}>
                        Contact our team to discuss your requirements and get a customized quote.
                    </p>
                    <div className={styles.ctaButtons}>
                        <button 
                            className={styles.contactButton}
                            onClick={handleBottomRequestQuote}
                        >
                            Request Quote
                        </button>
                        <Link href="/contact" className={styles.contactLink}>
                            Contact Sales Team
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 