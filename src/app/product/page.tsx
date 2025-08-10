"use client";
import { useRouter } from 'next/navigation';
import styles from "../../styles/product.module.css";


const products = [
    {
        id: 1,
        name: "Injection Molding Machine",
        description: "High-precision injection molding machines for plastic parts production.",
        image: "/images/product1.jpg"
    },
    {
        id: 2,
        name: "Blow Molding Machine",
        description: "Automated blow molding equipment for hollow plastic containers and bottles manufacturing.",
        image: "/images/product2.jpg"
    },
    {
        id: 3,
        name: "Compression Molding Press",
        description: "Heavy-duty compression molding presses for rubber and composite materials processing.",
        image: "/images/product3.jpg"
    },
    {
        id: 4,
        name: "Rotational Molding Machine",
        description: "Large-scale rotational molding equipment for hollow plastic products and tanks.",
        image: "/images/product4.jpg"
    },
    {
        id: 5,
        name: "Extrusion Molding Line",
        description: "Continuous extrusion molding systems for profiles, pipes, and sheet production.",
        image: "/images/product5.jpg"
    },
    {
        id: 6,
        name: "Thermoforming Machine",
        description: "Advanced thermoforming equipment for plastic sheet forming and packaging solutions.",
        image: "/images/product6.jpg"
    }
];

export default function ProductPage() {
    const router = useRouter();

    const handleLearnMore = (productId: number) => {
        router.push(`/product/${productId}`);
    };

    return (
        <section className={styles.productSection}>

            <div className={styles.productGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.imageContainer}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <p className={styles.productDescription}>{product.description}</p>
                            <button 
                                className={styles.learnMoreBtn}
                                onClick={() => handleLearnMore(product.id)}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            
        </section>
    );
}