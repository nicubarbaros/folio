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
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:site',
      content: settings && settings.meta && settings.meta.social && settings.meta.social.twitter
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:creator',
      content: settings && settings.meta && settings.meta.social && settings.meta.social.twitter
    },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: title },
    { name: 'og:type', content: type },
    { name: 'og:url', content: url },
    { name: 'og:image', content: image },
    { name: 'og:description', content: description },
    {
      name: 'og:site_name',
      content: settings && settings.meta && settings.meta.title
    },
    {
      name: 'og:published_time',
      content: createdAt || new Date().toISOString()
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
      {socialTags(props).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}
    </Head>
  );
};

export default SEO;
