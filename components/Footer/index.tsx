import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h6>Nicu Barbaros</h6>

      <div>
        <a href="https://twitter.com/nicubarbaros" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://youtube.com/c/WebUnlocked" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
        <a href="https://github.com/nicubarbaros" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>

      <h6>({year}), all rights reserved</h6>
    </footer>
  );
}
