import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import "../assets/styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="social-icons">
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
          href="mailto:pranavponni@fuji.waseda.jp"
          aria-label="Email"
        >
          <EmailIcon />
        </a>
      </div>

      <p>
        © {new Date().getFullYear()} Pranav Ponnivalavan.  
        Built with React & MUI.
      </p>
    </footer>
  );
}

export default Footer;