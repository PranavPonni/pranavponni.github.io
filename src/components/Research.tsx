import React from "react";

const mediaItems = [
  {
    title: "Main paper",
    description: "TaSA paper on arXiv.",
    href: "https://arxiv.org/abs/2602.05468",
  },
  {
    title: "Project page",
    description: "Project page with additional context for the self-touch manipulation work.",
    href: "https://sites.google.com/site/bashifunabashi/mhand-project/self-touch?authuser=0",
  },
];

const mediaVideoMp4Src = `${process.env.PUBLIC_URL}/tasa%20short.mp4`;
const mediaVideoMovSrc = `${process.env.PUBLIC_URL}/tasa%20short.mov`;
const mtasaObjectsSrc = `${process.env.PUBLIC_URL}/mtasa-objects.png`;

function Research() {
  return (
    <div className="container" id="research">
      <section className="research-container">
        <div className="research-hero">
          <h1 className="research-section-heading">Research</h1>

          <section className="research-current-work" aria-labelledby="mtasa-title">
            <span className="research-kicker">Current work</span>
            <h2 id="mtasa-title">
              M-TaSA: Learning Multi-Finger Self-Touch for Sensory Attenuation in Dexterous
              Manipulation
            </h2>
            <p>
              Exploring multi-finger self-touch and sensory attenuation for dexterous
              manipulation.
            </p>
            <figure className="research-current-figure">
              <a
                href={mtasaObjectsSrc}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the M-TaSA object overview at full size"
              >
                <img
                  src={mtasaObjectsSrc}
                  alt="Thirteen objects used in the current M-TaSA work"
                />
              </a>
            </figure>
          </section>

          <section className="research-project" aria-labelledby="tasa-title">
            <h2 id="tasa-title" className="research-title">
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
          </section>
        </div>
      </section>
    </div>
  );
}

export default Research;
