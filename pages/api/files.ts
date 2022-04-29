import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.IMAGE_ID}/images/v2/direct_upload`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.IMAGE_TOKEN}`,
    },
  });
  const result = await response.json();

  if (result.success) {
    res.json({ success: true, url: result.result });
  } else {
    res.json({ success: false });
  }
};

export default withCookie(withMethod({ methods: ["GET"], handler }));
