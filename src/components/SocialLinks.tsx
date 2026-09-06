import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export const emailUrl = 'mailto:pranavponni@fuji.waseda.jp';
export const linkedInUrl = 'https://www.linkedin.com/in/pranav-ponnivalavan-619733186/';

export default function SocialLinks({ contactOnly = false }: { contactOnly?: boolean }) {
  return <div className="social-links" aria-label="Social and contact links">
    {!contactOnly && <a href="https://github.com/pranavponni" target="_blank" rel="noreferrer"><GitHubIcon aria-hidden="true" /><span>GitHub</span></a>}
    <a href={linkedInUrl} target="_blank" rel="noreferrer"><LinkedInIcon aria-hidden="true" /><span>LinkedIn</span></a>
    <a href={emailUrl}><EmailIcon aria-hidden="true" /><span>Email</span></a>
  </div>;
}
