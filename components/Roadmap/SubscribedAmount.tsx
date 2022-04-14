import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Head1 from '../Icons/Head1';
import Head2 from '../Icons/Head2';
import Head3 from '../Icons/Head3';

const fetcher = (apiURL: string) => fetch(apiURL).then(res => res.json());

function numberFormatter(counter: number) {
  if (counter === 0) return counter;
  if (counter >= 1000000000) {
    return '+' + (counter / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (counter >= 1000000) {
    return '+' + (counter / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (counter >= 1000) {
    return '+' + (counter / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return '+' + counter;
}

function SubscribedAmount() {
  const { data, error } = useSWR('/api/mailchimp/getListMembersInfo', fetcher);

  const totalSubscribers = numberFormatter(data?.total_items ?? 0);

  return (
    <div className="subscribers-container">
      <div className="subscribers-avatars">
        <Head3 size={50} />
        <Head1 size={50} />
        <Head2 size={50} />
      </div>
      <p className="subscribers-text">
        <span className="subscribers-counter">{totalSubscribers}</span> people have already subscribed
      </p>
    </div>
  );
}

export default SubscribedAmount;
