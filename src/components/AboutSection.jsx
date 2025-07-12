import React from "react";
import "../home.css";

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-text">
          <h1>What is Keeper?</h1>
          <p>
            Keeper is your intelligent companion for capturing ideas, tasks, and
            to-dos — all in one place. Whether you're a student, a developer, or
            someone who just likes to stay organized, Keeper provides a
            distraction-free, beautifully simple interface to help you focus on
            what matters.
          </p>
          <p>
            No clutter. No ads. Just your thoughts, safe and accessible wherever
            you go.
          </p>
        </div>
        <div className="about-visual">
          <a href="/signup">
            <button className="get-started-btn">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
