"use client"
import styles from "../styles/About.module.css";

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <h3 className={styles.heading}>Welcome to Dev Vansh Engineers</h3>

            <div className={styles.content}>
                <p className={styles.description}>
                Dev Vansh Engineers is a team of passionate engineers, designers,
                    and strategists dedicated to helping businesses harness the power of technology.
                    With years of experience in the tech sector, we pride ourselves on delivering
                    innovative, reliable, and scalable solutions that drive real business growth.
                    <br />
                    <br />
                    We work closely with our clients to understand their unique needs
                    and deliver customized solutions that exceed expectations.
                    From web development and mobile applications to cloud infrastructure and artificial intelligence,
                    our team brings together diverse expertise across the technology spectrum.
                    <br />
                    <br />
                    We specialize in creating seamless user experiences, robust backend systems,
                    and cutting-edge digital solutions that keep our clients ahead of the competition.
                    Innovation, integrity, and excellence form the foundation of everything we do.
                    We maintain the highest standards of quality while staying at the forefront
                    of technological advancements. Our commitment to continuous learning and
                    improvement ensures that we deliver solutions that are not just current,
                    but future-ready.
                </p>
            </div>

            <button onClick={() => window.location.href = "/about"} className={styles.readMore}>Read More </button>
        </section>
    );
}
