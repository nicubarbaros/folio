import React, { useState } from 'react';
import HomeLoader from '../components/HomeLoader';
import SubscribedAmount from '../components/Roadmap/SubscribedAmount';
import SEO from '../components/Seo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as gtag from '../utils/gtag';

export default function Roadmap() {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(true);

  const [message, setMessage] = useState('');

  const [subscribed, setSubscribed] = useLocalStorage('subscribed', false);

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

    gtag.event({
      action: 'submit_form',
      category: 'Roadmap',
      label: 'email',
      value: email
    });

    setEmail('');
    setMessage('Thank you 💜. You are cool 🤘🏽');
    setSubscribed(true);
  };
  return (
    <>
      <HomeLoader setLoader={setLoader} title="hey" />

      <SEO
        title="Roadmap to becoming a Creative Developer"
        description="Level up your professional knowledge."
        type="website"
        url="https://nicubarbaros.com/roadmap"
        image="https://nicubarbaros.com/images/roadmap_new2.jpeg"
      />

      {!loader && (
        <div className="roadmap-container">
          <h1 className="roadmap-title">Roadmap to becoming a Creative Developer</h1>

          <div>
            <p className="roadmap-paragraph">
              Level up your professional knowledge. <br />
              Join the waitlist to get early access.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="roadmap-form">
            <input
              className="roadmap-input"
              type="text"
              value={email}
              onChange={handleChange}
              placeholder="Notify me on release"
            />
            <input type="submit" className="roadmap-button" value="Send" />
          </form>

          {message && <div>{message}</div>}

          <SubscribedAmount />
        </div>
      )}
    </>
  );
}
