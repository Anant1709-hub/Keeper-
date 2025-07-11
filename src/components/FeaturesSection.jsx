import React from "react";
import { FaLightbulb, FaTasks, FaCloud, FaLock } from "react-icons/fa";

import "../home.css";

const features = [
  {
    icon: <FaLightbulb />,
    title: "Smart Note-Taking",
    description: "Capture thoughts instantly with an intuitive and minimal UI.",
  },
  {
    icon: <FaTasks />,
    title: "Task Management",
    description: "Organize your tasks, to-dos, and lists — all in one place.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Sync",
    description: "Your notes are always backed up and available anywhere.",
  },
  {
    icon: <FaLock />,
    title: "Secure & Private",
    description: "End-to-end encryption ensures your thoughts stay yours.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section" id="features">
      <h2 className="features-title">Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
