import React, { useState } from "react";
import "../assets/styles/Publications.scss";

const MY_NAME = "Pranav Ponnivalavan";

function AuthorList({ authors }: { authors: string }) {
  return (
    <span>
      {authors.split(", ").map((name, i, arr) => (
        <React.Fragment key={i}>
          {name === MY_NAME ? (
            <strong className="pub-author-highlight">{name}</strong>
          ) : (
            name
          )}
          {i < arr.length - 1 && ", "}
        </React.Fragment>
      ))}
    </span>
  );
}

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
      { label: "PDF", href: "https://arxiv.org/pdf/2602.05468" },
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
  {
    type: "Workshop Paper",
    title:
      "A uSkin Fingertip with a Tactile Fingernail for Contact-Rich Dexterous Manipulation",
    authors:
      "Steven Oh, Satoshi Funabashi, Hiroki Niimi, Tai Yamada, Kazutaka Omori, Pranav Ponnivalavan, Tetsuya Ogata, Shigeki SUGANO",
    venue: "IEEE ICRA 2026 Workshop Dex Submission",
    links: [
      { label: "OpenReview", href: "https://openreview.net/forum?id=POuDNj8jbA" },
      { label: "PDF", href: "https://openreview.net/pdf?id=POuDNj8jbA" },
    ],
  },
];

const mediaItems = [
  {
    src: `${process.env.PUBLIC_URL}/nikkan-kogyo-shimbun-article-screenshot.png`,
    alt: "Screenshot of the Nikkan Kogyou Shimbun article about TaSA",
  },
  {
    src: `${process.env.PUBLIC_URL}/nikkan-kogyo-shimbun-yellow.png`,
    alt: "Highlighted Nikkan Kogyo Shimbun newspaper article featuring TaSA",
  },
];

function Publications() {
  const [selectedMedia, setSelectedMedia] = useState<(typeof mediaItems)[number] | null>(null);

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
                <p className="pub-authors"><AuthorList authors={item.authors} /></p>
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

        <hr className="pub-divider" />

        <section className="publications-media" aria-labelledby="publications-media-heading">
          <div className="publications-media-header">
            <h2 id="publications-media-heading" className="publications-subheading">
              Media
            </h2>
            <p className="publications-media-caption">
              TaSA was published as a news article in Nikkan Kogyou Shimbun 日刊工業新聞,
              June 2, 2026.
            </p>
            <a
              className="pub-link"
              href="https://www.nikkan.co.jp/articles/view/00782813"
              target="_blank"
              rel="noreferrer"
            >
              News article ↗
            </a>
          </div>

          <div className="publications-media-grid">
            {mediaItems.map((item) => (
              <figure className="publications-media-card" key={item.src}>
                <button
                  className="publications-media-button"
                  type="button"
                  onClick={() => setSelectedMedia(item)}
                  aria-label={`Open larger image: ${item.alt}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </button>
              </figure>
            ))}
          </div>
        </section>

        {selectedMedia && (
          <div
            className="publications-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded media image"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="publications-lightbox-close"
              type="button"
              onClick={() => setSelectedMedia(null)}
              aria-label="Close expanded media image"
            >
              ×
            </button>
            <img
              src={selectedMedia.src}
              alt={selectedMedia.alt}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default Publications;
