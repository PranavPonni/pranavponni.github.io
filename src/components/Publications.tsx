import React from "react";
import "../assets/styles/Publications.scss";

const publicationItems = [
  {
    title: "TaSA: Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In-Grasp Manipulation",
    venue: "arXiv preprint",
    href: "https://arxiv.org/abs/2602.05468",
    label: "View on arXiv",
  },
  {
    title: "TaSA OpenReview Submission",
    venue: "OpenReview",
    href: "https://openreview.net/forum?id=GCq58uWqZ7",
    label: "View on OpenReview",
  },
];

function Publications() {
  return (
    <div className="container" id="publications">
      <section className="publications-container">
        <h1 className="publications-heading">Research Publications</h1>
        <p className="publications-summary">
          Selected publications and review links for recent work in tactile-driven robotic
          manipulation.
        </p>

        <div className="publications-grid">
          {publicationItems.map((item) => (
            <a
              key={item.href}
              className="publication-card"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <span>{item.venue}</span>
              <h2>{item.title}</h2>
              <p>{item.label}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Publications;
