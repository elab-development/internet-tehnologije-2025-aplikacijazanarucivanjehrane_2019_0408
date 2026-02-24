export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-header">
                    <h2>Our Story</h2>
                    <div className="about-divider"></div>
                </div>

                <div className="about-content">
                    <div className="about-story">
                        <p className="about-intro">
                            Welcome to our family kitchen, where tradition meets passion, and every meal tells a story.
                        </p>

                        <p>
                            Founded in 2015 by our family, our restaurant began as a small neighborhood gathering spot
                            near the Faculty of Organizational Sciences in Belgrade. What started as a humble dream to share
                            our grandmother's recipes has blossomed into a beloved local destination.
                        </p>

                        <p>
                            Our journey began when mother of the house, inspired by years of family recipes passed down through
                            generations, decided to turn our home kitchen into something more. Every dish we serve carries
                            the warmth of our family table—made with fresh ingredients, prepared with care, and served with love.
                        </p>

                        <div className="about-values">
                            <div className="value-item">
                                <span className="value-icon">🌿</span>
                                <h3>Fresh & Local</h3>
                                <p>We source ingredients from local Serbian farmers and markets daily</p>
                            </div>

                            <div className="value-item">
                                <span className="value-icon">👨‍👩‍👧‍👦</span>
                                <h3>Family Recipes</h3>
                                <p>Traditional recipes perfected over three generations</p>
                            </div>

                            <div className="value-item">
                                <span className="value-icon">❤️</span>
                                <h3>Made with Love</h3>
                                <p>Every meal is prepared as if we're cooking for family</p>
                            </div>
                        </div>

                        <p className="about-closing">
                            Today, we're proud to serve our community from our location near the Faculty, welcoming
                            students, professors, and neighbors who have become like family. Whether you're grabbing
                            a quick lunch between classes or enjoying a leisurely dinner, we're here to make you feel at home.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}