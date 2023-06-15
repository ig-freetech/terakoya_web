// API Route must be defined under pages/api/*.
// https://nextjs-ja-translation-docs.vercel.app/docs/api-routes/introduction

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { IS_PROD } from "@utils/config";

// Define a middleware wrapper for the handler to allow CORS.
// https://commte.net/nextjs-cors
// const allowCors =
//   (fn: (req: NextApiRequest, res: NextApiResponse) => void) =>
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization"
//     );

//     // Return response for preflight requests
//     if (req.method === "OPTIONS") {
//       res.status(200).end();
//       return;
//     }
//     return await fn(req, res);
//   };

export type RequestBody = { msg: string };

// handler is a function that has two parameters, req and res.
// https://deecode.net/?p=1811
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { msg } = req.body as RequestBody;

  const errorChannelUrl = process.env.SLACK_ERROR_CH_WEBHOOK_URL;

  if (errorChannelUrl === undefined) {
    res.status(500).json({ error: "SLACK_WEBHOOK_URL is not set" });
    return;
  }

  const payload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `⚠️Error happend! (Web) [${process.env.STAGE}]`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Error Message:*\n${msg}`,
        },
      },
    ],
  };

  if (IS_PROD) {
    payload.blocks.unshift({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "<!channel>",
      },
    });
  }

  if (req.method === "POST") {
    try {
      await axios.post(errorChannelUrl, payload);
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  } else {
    res.status(405);
  }
};

export default handler;
// export default allowCors(handler);
