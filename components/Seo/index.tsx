import React from 'react';
import Head from 'next/head';
import settings from '../../settings';

type Props = {
  type: 'article' | 'website';
  url: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
};

const socialTags = ({ type, url, title, description, image, createdAt }: Props) => {
  const metaTags = [
    { name: 'twitter:card', content: 'summary_large_image', type: 'twitter' },
    { name: 'twitter:title', content: title, type: 'twitter' },
    { name: 'twitter:description', content: description, type: 'twitter' },

    { name: 'twitter:image', content: image, type: 'twitter' },
    {
      name: 'twitter:creator',
      content: settings && settings.meta && settings.meta.social && settings.meta.social.twitter,
      type: 'twitter'
    },
    {
      name: 'twitter:site',
      content: settings && settings.meta && settings.meta.social && settings.meta.social.twitter,
      type: 'twitter'
    },

    { name: 'og:title', content: title, type: 'og' },
    { name: 'og:type', content: type, type: 'og' },
    { name: 'og:url', content: url, type: 'og' },
    { name: 'og:image', content: image, type: 'og' },
    { name: 'og:description', content: description, type: 'og' },
    {
      name: 'og:site_name',
      content: settings && settings.meta && settings.meta.title,
      type: 'og'
    },
    {
      name: 'og:published_time',
      content: createdAt || new Date().toISOString(),
      type: 'og'
    }
    // {
    //   name: 'og:modified_time',
    //   content: updatedAt || new Date().toISOString()
    // }
  ];

  return metaTags;
};

const SEO = (props: Props) => {
  const { title, description, image } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      {/* <meta name="keywords" content="video streaming, the rock" /> */}
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      {socialTags(props).map(element => {
        if (element.type === 'twitter') {
          return <meta key={element.name} name={element.name} content={element.content} />;
        }
        return <meta key={element.name} property={element.name} content={element.content} />;
      })}
    </Head>
  );
};

export default SEO;
