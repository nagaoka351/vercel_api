import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';

// type DictType = Record<
//   string,
//   (user?: string, password?: string) => Promise<unknown>
// >;
const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSd-MdK69QUOnqf1IDqZ6NIDc4ZLhcJpaUfnFGcQUn1oKtuaYA/';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await fetch(googleFormUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body).toString(),
    });

    return res
      .status(response.ok ? 200 : response.status)
      .json({ success: response.ok });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. ' + error });
  }
}
// const getDict = {};

// const postDict = {
//   proxy: async () => {},
// };

// const dictAction = async (
//   req: Request,
//   context: { params: { action: string } },
//   dict: DictType
// ) => {
//   const { action } = await context.params;
//   return await dict[action]();
// };

// const GET = async (req: Request, context: { params: { action: string } }) =>
//   dictAction(req, context, getDict);

// const POST = async (req: Request, context: { params: { action: string } }) =>
//   dictAction(req, context, postDict);

// export { GET, POST };
