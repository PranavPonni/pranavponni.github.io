import React from "react";

const mediaItems = [
  {
    title: "Paper",
    description: "Primary paper entry on arXiv.",
    href: "https://arxiv.org/abs/2602.05468",
    label: "Open arXiv",
  },
  {
    title: "Full PDF",
    description: "Direct preprint PDF for the full method, experiments, and figures.",
    href: "https://arxiv.org/pdf/2602.05468",
    label: "Open PDF",
  },
  {
    title: "Project page",
    description: "Project page with additional context for the self-touch manipulation work.",
    href: "https://sites.google.com/site/bashifunabashi/mhand-project/self-touch?authuser=0",
    label: "Open page",
  },
];

const mediaVideoMp4Src = `${process.env.PUBLIC_URL}/tasa%20short.mp4`;
const mediaVideoMovSrc = `${process.env.PUBLIC_URL}/tasa%20short.mov`;

function Research() {
  return (
    <div className="container" id="research">
      <section className="research-container">
        <div className="research-hero">
          <h1 className="research-section-heading">Research</h1>
          <h2 className="research-title">
            TaSA: Two-Phased Deep Predictive Learning of Tactile Sensory Attenuation for
            Improving In-Grasp Manipulation
          </h2>

          <div className="research-media-grid">
            {mediaItems.map((item) => (
              <a
                key={item.href}
                className="research-media-card"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </a>
            ))}
          </div>

          <div className="research-video-panel">
            <div className="research-video-copy">
              <span>Demo video</span>
              <h3>TaSA short demo</h3>
              <p>Showcase of task-based manipulation where TaSA is applied.</p>
            </div>
            <div className="research-video-frame">
              <video autoPlay muted loop controls playsInline preload="auto">
                <source src={mediaVideoMp4Src} type="video/mp4" />
                <source src={mediaVideoMovSrc} type="video/quicktime" />
                Your browser does not support the embedded video player.
              </video>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;
