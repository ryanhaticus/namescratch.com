import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // ensure method is get
  if (req.method !== 'GET') {
    res.status(405).json({
      statusCode: 405,
      message: 'Method not allowed',
    });
    return;
  }
  // get date (?date=2020-01-01)
  const { date } = req.query;
  if (!date) {
    res.status(400).json({
      error: 'Please provide a date.',
    });
    return;
  }
  // get domains
  const response = await fetch(`https://namejet.com/download/${date}.txt`);
  const text = await response.text();
  // send 'em
  res.status(200).send(text);
};

export default handler;
