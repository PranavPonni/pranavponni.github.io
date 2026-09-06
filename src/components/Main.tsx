import React from 'react';
import SocialLinks from './SocialLinks';
const External = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;
function Main() {
  return (
    <div className="home-page">
      <div className="hero-meta"><span><i className="status-dot" /> ROBOTICS RESEARCHER</span><span>TOKYO, JAPAN · 35.71° N, 139.72° E</span></div>
      <section className="hero" aria-labelledby="name">
        <div className="hero-identity">
          <h1 id="name">Pranav<br /><span>Ponnivalavan</span><span className="name-period">.</span></h1>
          <p className="hero-description">Exploring how robots<br />sense, learn &amp; interact.</p>
          <a className="primary-link" href="/research.html">Explore my research <span>↗</span></a>
          <SocialLinks />
          <div className="hero-orbit" aria-hidden="true"><div className="glass-sphere" /><span className="orbit-line" /><span className="orbit-satellite" /></div>
        </div>
        <aside className="bio-panel">
          <div className="bio-top"><div className="portrait-wrap"><img src={`${process.env.PUBLIC_URL}/prof.png`} alt="Pranav Ponnivalavan" /></div><div><span className="eyebrow">A BIT ABOUT ME</span><p>M.Eng · Waseda University</p><span className="location"><i className="status-dot" /> Currently in Tokyo</span></div><span className="panel-plus" aria-hidden="true">+</span></div>
          <div className="bio-copy">
            <p>I am a 2nd year M.Eng student at Waseda University, advised by <External href="https://sites.google.com/site/bashifunabashi/home?authuser=0&pli=1">Satoshi Funabashi</External>. I also work at <External href="https://www.fingervision.jp">FingerVision</External>.</p>
            <p>I received my B.Eng in Mechanical Engineering from Waseda University, where I continue to research with <External href="https://ogata-lab.jp/member/ogata.html">Prof. Tetsuya Ogata</External> and <External href="https://scholar.google.co.jp/citations?user=J1lw6cwAAAAJ&hl=en">Prof. Shigeki Sugano</External>. I work with multi-fingered manipulation, tactile sensing and cognitive-science based robotics.</p>
          </div>
          <div className="bio-tags"><span>Manipulation</span><span>Tactile sensing</span><span>Cognition</span></div>
        </aside>
      </section>
      <section className="life-update" aria-labelledby="life-heading">
        <div className="update-label"><span className="eyebrow" id="life-heading"><i className="status-dot" /> LIFE UPDATE</span><span className="update-date">JAN — APR 2027</span></div>
        <div className="update-copy"><h2>Next stop: UT Austin <span aria-hidden="true">↗</span></h2><p>I will visit UT Austin from January to April 2027, joining the Living with Robots Laboratory, advised by <External href="https://yudai-tanaka.com">Yudai Tanaka</External>, <External href="https://karthikmahadevan.ca">Karthik Mahadevan</External> and <External href="https://justinhart.net">Justin W Hart</External>.</p></div>
        <div className="update-route" aria-hidden="true">TYO <span>······ ✈ ······</span> AUS</div>
      </section>
    </div>
  );
}
export default Main;
