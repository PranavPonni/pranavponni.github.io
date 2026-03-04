import React from "react";
import "../assets/styles/Research.scss";

const mediaItems = [
  {
    title: "Paper abstract",
    description: "Primary paper entry on arXiv with metadata and citation details.",
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

          <p className="research-summary">
            TaSA tackles a practical bottleneck in dexterous robotic hands: during manipulation,
            robots must distinguish tactile signals caused by self-contact from those caused by
            external object contact. Inspired by human sensory attenuation, TaSA learns a
            self-touch prediction model first, then uses it to emphasize object-contact signals
            during policy learning.
          </p>

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

          <p className="research-meta">
            arXiv:2602.05468 · Submitted Feb 5, 2026 · Comments: "ICRA 2026 accepted"
          </p>

          <div className="research-content-block">
            <h2>Abstract</h2>
            <p>
              Humans perform complex in-hand manipulation while multiple fingers simultaneously
              contact both the object and each other. A key enabling mechanism is sensory
              attenuation: predictable self-generated tactile sensations are down-weighted so
              unexpected, task-relevant stimuli stand out. TaSA transfers this principle to
              robotics with a two-stage learning pipeline: first learning self-touch dynamics from
              the robot&apos;s own actions, then integrating that predictor into downstream policy
              learning to emphasize object-contact signals for safer, more reliable manipulation.
            </p>
          </div>

          <div className="research-video-panel">
            <div className="research-video-copy">
              <span>Demo video</span>
              <h3>TaSA short demo</h3>
              <p>Showcase of task-based manipulation where TaSA is applied.</p>
            </div>
            <div className="research-video-frame">
              <video autoPlay muted loop controls playsInline preload="metadata">
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
