export default function ContactSection() {
    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-header">
                    <h2>Visit Us</h2>
                    <div className="about-divider"></div>
                </div>

                <div className="contact-content">
                    <div className="contact-left">
                        <div className="about-location">
                            <h3>Our Location</h3>
                            <p className="location-address">
                                <strong>📍 Jove Ilića 154</strong><br />
                                Faculty of Organizational Sciences<br />
                                Belgrade, Serbia
                            </p>

                            <div className="location-info">
                                <div className="info-item">
                                    <strong>📞 Phone:</strong>
                                    <span>+381 11 123 4567</span>
                                </div>
                                <div className="info-item">
                                    <strong>🕐 Hours:</strong>
                                    <span>Mon-Fri: 8am - 10pm<br />Sat-Sun: 10am - 11pm</span>
                                </div>
                                <div className="info-item">
                                    <strong>✉️ Email:</strong>
                                    <span>fon@bg.ac.rs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-right">
                        <div className="map-container-large">
                            <iframe
                                title="Our Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.4392537892393!2d20.47523431534785!3d44.81336197909796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab3d7e3f3e7%3A0x9f4f2f8e1e7f8f8f!2sJove%20Ili%C4%87a%20154%2C%20Beograd!5e0!3m2!1sen!2srs!4v1234567890123!5m2!1sen!2srs"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: "8px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}