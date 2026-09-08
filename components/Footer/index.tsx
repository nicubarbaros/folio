import React from 'react';

const links = [
  { label: 'X', href: 'https://x.com/nicubarbaros' },
  { label: 'YouTube', href: 'https://youtube.com/c/WebUnlocked' },
  { label: 'GitHub', href: 'https://github.com/nicubarbaros' }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="home-footer">
      <span>© {year} Nicu Barbaros</span>

      <div className="home-footer-links">
        {links.map(link => (
          <a key={link.label} className="home-footer-link" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
