"use client";
import { useEffect, useState } from "react";
import styles from "./contact.module.css";

// Demo country list – populate as needed
const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Germany",
  "Australia",
  "Other",
];

function generateCaptcha() {
  // Simple random 6-character alphanumeric string
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}


export default function ContactPage() {
  const [captcha, setCaptcha] = useState("");
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    requirement: "",
    mobile: "",
    captchaInput: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    
    if (!captcha) {
      setError("Please wait for captcha to load.");
      return;
    }
    
    if (form.captchaInput !== captcha) {
      setError("Captcha does not match. Please try again.");
      setCaptcha(generateCaptcha());
      setForm((f) => ({ ...f, captchaInput: "" }));
      return;
    }
    // Implement actual form sending logic here (API etc.)
    setSubmitted(true);
  }

  function handleRefreshCaptcha(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCaptcha(generateCaptcha());
    setForm((f) => ({ ...f, captchaInput: "" }));
    setError("");
  }

  return (
    <div className={styles.contactPage}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <img
          src="/images/contact.jpg"
          className={styles.bannerImg}
          alt="Contact us banner"
        />
        <div className={styles.bannerOverlay}>
          <h1>Contact Us</h1>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Address & Contact Info */}
        <div className={styles.contactInfo}>
          <h2 className={styles.headingWithIcon}>
            <span className={styles.iconLocation}>
              {/* location icon */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 21C12 21 5 13.7966 5 9.5C5 6.18629 8.13401 3.5 12 3.5C15.866 3.5 19 6.18629 19 9.5C19 13.7966 12 21 12 21Z" stroke="#0070f3" strokeWidth="1.7" strokeLinejoin="round" />
                <circle cx="12" cy="9.5" r="2" stroke="#0070f3" strokeWidth="1.7" />
              </svg>
            </span>
            Office Address
          </h2>
          <div className={styles.infoBlock}>
          Dev Vansh Engineers<br />
            123 Business Park, Industry City<br />
            State, Country ZIP
          </div>
          <div className={styles.contactsDivider}></div>

          <div className={styles.infoBlock}>
            <strong >Domestic Inquiry:</strong>
            <div>
              <span className={styles.icon}>
                {/* phone icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>              </span>
              <a href="tel:+911234567890">+91-12345 67890</a>
            </div>
            <div>
              <span className={styles.icon}>
                {/* email icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>              </span>
              <a href="mailto:domestic@techindustry.com">domestic@techindustry.com</a>
            </div>
          </div>
          <div className={styles.infoBlock} style={{ marginTop: '1.7rem' }}>
            <strong>International Inquiry:</strong>
            <div>
              <span className={styles.icon}>
                {/* phone icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </span>
              <a href="tel:+911234567891">+91-12345 67891</a>
            </div>
            <div>
              <span className={styles.icon}>
                {/* email icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>              </span>
              <a href="mailto:international@techindustry.com">international@techindustry.com</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contactFormWrapper}>
          <form className={styles.contactForm} onSubmit={handleSubmit} autoComplete="off">
            <h2>Get in touch</h2>
            {submitted ? (
              <div className={styles.thankyou}>
                Thank you for contacting us! We will respond shortly.
              </div>
            ) : (
              <>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formRow}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formRow}>
                  <select
                    name="country"
                    required
                    value={form.country}
                    onChange={handleChange}
                    className={styles.input}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    required
                    value={form.mobile}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formRow}>
                  <textarea
                    name="requirement"
                    placeholder="Your Requirement"
                    required
                    value={form.requirement}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={3}
                  />
                </div>
                <div className={styles.formRow} style={{ alignItems: 'center' }}>
                  <div className={styles.captchaBox}>
                    <span className={styles.captchaText}>{captcha || "Loading..."}</span>
                    <button className={styles.captchaRefresh} onClick={handleRefreshCaptcha} title="Refresh captcha" type="button" disabled={!captcha}>
                      &#x21bb;
                    </button>
                  </div>
                  <input
                    type="text"
                    name="captchaInput"
                    placeholder="Enter Captcha"
                    required
                    value={form.captchaInput}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                {error && (
                  <div className={styles.error}>{error}</div>
                )}
                <button className={styles.submitBtn} type="submit">
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      <div className={styles.mapContainer}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.94234848018!2d72.67290691044472!3d23.025888916118337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8782b89091a9%3A0x9b2bad19226fef6e!2sDev%20Vansh%20Engineers!5e0!3m2!1sen!2sin!4v1754823114054!5m2!1sen!2sin"
    width="100%"
    height="350"
    style={{ border: 0, borderRadius: '12px' }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Company Location"
  />
</div>

    </div>
  );
}
