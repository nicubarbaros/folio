import React, { useState } from 'react';

export default function Roadmap() {
  const [email, setEmail] = useState('');

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
  };
  return (
    <div className="roadmap-container">
      <h1 className="roadmap-title">Roadmap to becoming a Creative Developer</h1>
      <div>
        <p className="roadmap-paragraph">
          Level up your professional knowledge. <br />
          Join the waitlist to get early access.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="roadmap-form">
        <input className="roadmap-input" type="text" value={email} onChange={handleChange} placeholder="Your email" />
        <input type="submit" className="roadmap-button" value="Subscribe" />
      </form>
    </div>
  );
}
