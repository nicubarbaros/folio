import React, { useState } from 'react';
import SubscribedAmount from '../components/Roadmap/SubscribedAmount';

export default function Roadmap() {
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/mailchimp/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const { error } = await response.json();
    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);
      return;
    }

    setEmail('');
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
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

      {message && <div>{message}</div>}

      <SubscribedAmount />
    </div>
  );
}
