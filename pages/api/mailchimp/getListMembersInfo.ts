import { NextApiRequest, NextApiResponse } from 'next';

const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  try {
    const response = await mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_AUDIENCE_ID);

    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
