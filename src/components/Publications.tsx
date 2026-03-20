import React from "react";
import "../assets/styles/Publications.scss";

const publicationItems = [
  {
    type: "Conference Paper",
    title:
      "TaSA: Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In-Grasp Manipulation",
    authors:
      "Pranav Ponnivalavan, Satoshi Funabashi, Alexander Schmitz, Tetsuya Ogata, Shigeki Sugano",
    venue: "IEEE ICRA 2026 · International Conference on Robotics and Automation",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2602.05468" },
    ],
  },
  {
    type: "Workshop Paper",
    title:
      "Learning Heterogeneous Tactile Representations with Graph Neural Networks for Dexterous Manipulation",
    authors:
      "Tai Yamada, Satoshi Funabashi, Steven Oh, Pranav Ponnivalavan, Kazutaka Omori, Tetsuya Ogata, Shigeki SUGANO",
    venue: "ViTac Workshop · IEEE ICRA 2026",
    links: [
      { label: "OpenReview", href: "https://openreview.net/forum?id=GCq58uWqZ7" },
      { label: "PDF", href: "https://openreview.net/pdf?id=GCq58uWqZ7" },
    ],
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

        <div className="publications-list">
          {publicationItems.map((item, index) => (
            <React.Fragment key={item.title}>
              {index > 0 && <hr className="pub-divider" />}
              <div className="publication-entry">
                <span className="pub-type-badge">{item.type}</span>
                <h2 className="pub-title">{item.title}</h2>
                <p className="pub-authors">{item.authors}</p>
                <p className="pub-venue">{item.venue}</p>
                <div className="pub-links">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      className="pub-link"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Publications;
