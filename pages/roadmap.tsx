import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import SubscribedAmount from '../components/Roadmap/SubscribedAmount';
import SEO from '../components/Seo';

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
    <>
      {/* <SEO
        title="Roadmap to becoming a Creative Developer"
        description="Level up your professional knowledge."
        type="website"
        url="https://nicubarbaros.com/roadmap"
        image="https://nicubarbaros.com/images/roadmap.png"
      /> */}

      <NextSeo
        title="Roadmap to becoming a Creative Developer"
        description="Level up your professional knowledge."
        canonical="https://nicubarbaros.com"
        openGraph={{
          url: 'https://nicubarbaros.com/roadmap',
          title: 'Roadmap to becoming a Creative Developer',
          description: 'Level up your professional knowledge.',
          images: [{ url: 'https://nicubarbaros.com/images/roadmap.png' }],
          site_name: 'nicubarbaros'
        }}
        twitter={{
          handle: '@handle',
          site: '@nicubarbaros',
          cardType: 'summary_large_image'
        }}
      />
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
    </>
  );
}
