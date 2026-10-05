import React, { useState } from "react";

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

type Publication = {
  title: string;
  authors: string;
  venue?: string;
  status?: string;
  links?: { label: string; href: string }[];
};

const conferencePapers: Publication[] = [
  {
    title:
      "M-TaSA: Learning Multi-Finger Self-Touch for Sensory Attenuation in Dexterous Manipulation",
    authors:
      "Pranav Ponnivalavan, Satoshi Funabashi, Alexander Schmitz, Tetsuya Ogata, Shigeki Sugano",
    status: "Under Review — IEEE Transactions on Robotics (T-RO)",
  },
  {
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
    title:
      "PACT: Posture-Aligned Co-Design Technique for Hand Configuration and Retargeting in Multi-Finger Imitation Learning",
    authors:
      "Koyo Sasazaki, Satoshi Funabashi, Pranav Ponnivalavan, Alexander Schmitz, Tetsuya Ogata, Shigeki Sugano",
    status:
      "Under Review — IEEE ICRA 2027 · International Conference on Robotics and Automation",
  },
  {
    title:
      "A Dual-Surface Tactile Fingertip for Contact-Rich Dexterous Manipulation of a Multi-Fingered Hand",
    authors:
      "Steven Oh, Satoshi Funabashi, Hiroki Niimi, Tai Yamada, Kazutaka Omori, Pranav Ponnivalavan, Tetsuya Ogata, Shigeki Sugano",
    status:
      "Under Review — IEEE ICRA 2027 · International Conference on Robotics and Automation",
  },
  {
    title:
      "Depth Conditioning for Bimanual Cable Routing: Gains Are Confined to Phases That Constrain the Depth Axis",
    authors:
      "Takeru Suzuki, Satoshi Funabashi, Haoyu Zhao, Pranav Ponnivalavan, Pei-Chun Chien, Shigeki Sugano",
    status:
      "Under Review — IEEE ICRA 2027 · International Conference on Robotics and Automation",
  },
];

const workshopPapers: Publication[] = [
  {
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

function PublicationList({
  items,
  label,
}: {
  items: Publication[];
  label: string;
}) {
  return (
    <ol className="publications-list" aria-label={label}>
      {items.map((item) => (
        <li className="publication-entry" key={item.title}>
          <h3 className="pub-title">{item.title}</h3>
          {item.status && <p className="pub-status"><em>{item.status}</em></p>}
          <p className="pub-authors"><AuthorList authors={item.authors} /></p>
          {item.venue && <p className="pub-venue">{item.venue}</p>}
          {item.links && (
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
          )}
        </li>
      ))}
    </ol>
  );
}

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
          Conference and workshop papers in tactile sensing and dexterous robotic manipulation.
        </p>

        <section className="publication-section" aria-labelledby="conference-papers-heading">
          <h2 id="conference-papers-heading" className="publications-subheading">
            Conference Papers
          </h2>
          <PublicationList items={conferencePapers} label="Conference papers" />
        </section>

        <section className="publication-section" aria-labelledby="workshop-papers-heading">
          <h2 id="workshop-papers-heading" className="publications-subheading">
            Workshop Papers
          </h2>
          <PublicationList items={workshopPapers} label="Workshop papers" />
        </section>

        <section className="publication-section" aria-labelledby="paper-reviewing-heading">
          <h2 id="paper-reviewing-heading" className="publications-subheading">
            Paper Reviewing
          </h2>
          <p className="paper-reviewing-entry">ICRA &amp; IROS 2026</p>
        </section>

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
