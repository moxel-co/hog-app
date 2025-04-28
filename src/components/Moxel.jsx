import React from 'react';
import { Globe, Facebook, Instagram, Link, Linkedin } from 'lucide-react';
import '../styles/moxel.css';

const Moxel = () => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="moxel-container">
      <div className="logo-container">
        <img src="/moxel_logo.svg" alt="Moxel" width="32" height="32" />
      </div>
      <div className="social-container">
        <a
          href="https://moxel.co"
          target="_blank"
          rel="noopener noreferrer"
          className="powered-by"
        >
          MOXEL
        </a>
        <div className="social-icons">
          <Facebook
            className="social-icon"
            size={10}
            onClick={() => openLink('https://www.facebook.com/moxelco')}
          />
          <Instagram
            className="social-icon"
            size={10}
            onClick={() => openLink('https://instagram.com/moxelco')}
          />
          <Link
            className="social-icon"
            size={10}
            onClick={() => openLink('https://tiktok.com/@moxel')}
          />
          <Linkedin
            className="social-icon"
            size={10}
            onClick={() => openLink('https://linkedin.com/company/moxel')}
          />
        </div>
      </div>
    </div>
  );
};

export default Moxel;