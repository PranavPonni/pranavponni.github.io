import React from 'react';
function Footer() {
  return <footer className="site-footer"><span>© {new Date().getFullYear()} Pranav Ponnivalavan</span><span className="footer-note">Made of curiosity & a little code.</span><div><a href="https://github.com/pranavponni" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/pranav-ponnivalavan-619733186/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="mailto:pranavponni@fuji.waseda.jp">Email ↗</a></div></footer>;
}
export default Footer;
