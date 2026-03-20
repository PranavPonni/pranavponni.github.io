import React from "react";
import "../assets/styles/Publications.scss";

const publicationItems = [
  {
    title:
      "TaSA: Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation for Improving In-Grasp Manipulation",
    comments: "8 pages, 8 figures, 8 tables, ICRA2026 accepted",
    subjects: "Robotics (cs.RO)",
    authors:
      "Pranav Ponnivalavan, Satoshi Funabashi, Alexander Schmitz, Tetsuya Ogata, Shigeki Sugano",
    href: "https://arxiv.org/abs/2602.05468",
    label: "View on arXiv",
  },
  {
    title:
      "Learning Heterogeneous Tactile Representations with Graph Neural Networks for Dexterous Manipulation",
    authors:
      "Tai Yamada, Satoshi Funabashi, Steven Oh, Pranav Ponnivalavan, Kazutaka Omori, Tetsuya Ogata, Shigeki SUGANO",
    date: "19 Mar 2026 (modified: 20 Mar 2026)",
    venue: "IEEE ICRA 2026 Workshop ViTac Submission",
    workshop:
      "ViTac, Tai Yamada, Satoshi Funabashi, Steven Oh, Pranav Ponnivalavan, Kazutaka Omori, Tetsuya Ogata, Shigeki SUGANO",
    revision: "Revisions",
    license: "CC BY 4.0",
    href: "https://openreview.net/forum?id=GCq58uWqZ7",
    pdfHref: "https://openreview.net/pdf?id=GCq58uWqZ7",
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
            <div key={item.href} className="publication-card">
              <h2>{item.title}</h2>

              {item.comments && <p>Comments: {item.comments}</p>}
              {item.subjects && <p>Subjects: {item.subjects}</p>}

              <p>{item.authors}</p>

              {item.date && <p>{item.date}</p>}
              {item.venue && <p>{item.venue}</p>}
              {item.workshop && <p>{item.workshop}</p>}
              {item.revision && <p>{item.revision}</p>}
              {item.license && <p>{item.license}</p>}

              <p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
                {item.pdfHref && (
                  <>
                    {" "}
                    |{" "}
                    <a href={item.pdfHref} target="_blank" rel="noreferrer">
                      Download PDF
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Publications;
