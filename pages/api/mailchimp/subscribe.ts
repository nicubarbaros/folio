const mailchimp = require('@mailchimp/mailchimp_marketing');

const APIKEY = 'e005fc6885aa8a69d79df72f6cd498ae-us14';
const LISTID = '6e70fc0664';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER
});

export default async function handler(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  console.log(process.env.MAILCHIMP_AUDIENCE_ID);
  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed'
    });

    console.log(response);
    return res.status(201).json({ error: '' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.toString() });
  }
}