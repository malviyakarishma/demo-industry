"use client"

import React, { useState } from "react";
import styles from "./gallery.module.css";

const imageList = [
  "images/gallery1.jpg", "images/gallery2.jpeg", "images/gallery3.jpeg",
  "images/Machine2.jpg", "images/gallery5.jpeg", "images/product1.jpg",
  "images/Machine3.jpg", "images/product2.jpg", "images/Machine5.jpg",
  "images/product3.jpg", "images/product4.jpg", "images/product5.jpg",
  "images/product6.jpg", "images/Machine2.jpg", "images/Machine5.jpg",
];

const Gallery: React.FC = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);

  const openModal = (src: string) => setModalImg(src);
  const closeModal = () => setModalImg(null);

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        {imageList.map((src, idx) => (
          <div className={styles.item} key={idx} onClick={() => openModal(src)}>
            <img src={src} alt="" className={styles.img} />
          </div>
        ))}
      </div>
      {modalImg && (
        <div className={styles.modal} onClick={closeModal}>
          <img src={modalImg} alt="Large view" className={styles.modalImg} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
