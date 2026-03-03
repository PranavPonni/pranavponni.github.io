import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          {/* Replace this image with your own later (instructions below) */}
          <img 
            src="https://via.placeholder.com/300" 
            alt="Pranav Ponni" 
          />
        </div>

        <div className="content">
          <div className="social_icons">
            <a 
              href="https://github.com/pranavponni" 
              target="_blank" 
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>

            <a 
              href="https://www.linkedin.com/in/pranav-ponni/" 
              target="_blank" 
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </div>

          <h1>Pranav Ponni</h1>
          <p>Software Engineer | Full Stack Developer</p>

          <div className="mobile_social_icons">
            <a 
              href="https://github.com/pranavponni" 
              target="_blank" 
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>

            <a 
              href="https://www.linkedin.com/in/pranav-ponni/" 
              target="_blank" 
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;