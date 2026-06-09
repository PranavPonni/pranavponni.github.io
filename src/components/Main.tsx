import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import "../assets/styles/Main.scss";

function Main() {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img
            // IMPORTANT: don't use an absolute local file path in React builds
            // Put the image in /public and reference like "/images/prof.jpg"
            src={`${process.env.PUBLIC_URL}/prof.png`}
            alt="Pranav Ponnivalavan"
          />
        </div>

        <div className="content">
          <div className="social_icons">
            <a
              href="https://github.com/pranavponni"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>

            <a
              href="https://www.linkedin.com/in/pranav-ponnivalavan-619733186/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>

            <a
              href="mailto:pranavponni@fuji.waseda.jp?subject=Hello%20Pranav&body=Hi%20Pranav%2C%0A%0A"
              aria-label="Email"
            >
              <EmailIcon />
            </a>
          </div>

          <h1>Pranav Ponnivalavan</h1>
          <p>
            Robotic Manipulation Graduate Researcher in{" "}
            <a className="lab-link" href="https://ogata-lab.jp" target="_blank" rel="noreferrer">
              Ogata
            </a>{" "}
            and{" "}
            <a
              className="lab-link"
              href="https://www.sugano.mech.waseda.ac.jp"
              target="_blank"
              rel="noreferrer"
            >
              Sugano
            </a>{" "}
            Laboratory
          </p>
          <div className="life-update">
            <span>Life update</span>
            <p>Presented TaSA &amp; 2 workshop papers @ ICRA Vienna, Austria, Jun 1-5, 2026</p>
          </div>

          <div className="mobile_social_icons">
            <a
              href="https://github.com/pranavponni"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>

            <a
              href="https://www.linkedin.com/in/pranav-ponnivalavan-619733186/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>

            <a
              href="mailto:pranavponni@fuji.waseda.jp?subject=Hello%20Pranav&body=Hi%20Pranav%2C%0A%0A"
              aria-label="Email"
            >
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
