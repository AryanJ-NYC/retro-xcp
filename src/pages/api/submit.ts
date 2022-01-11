import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import TelegramBot from 'node-telegram-bot-api';
import type { Union } from 'ts-toolbelt';

const token = process.env.TELEGRAM_SUBMISSION_CHANNEL_TOKEN;
const bot = new TelegramBot(token);

const upload = multer();
const middleware = upload.single('file');

const apiRouter = nextConnect<NextApiRequest & { file: Express.Multer.File }, NextApiResponse>({
  onNoMatch(_, res) {
    res.status(405).end();
  },
})
  .use(middleware)
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    const { assetName } = req.body;
    const resp = await fetch(`https://xchain.io/api/asset/${assetName}`);
    const xchainAsset: XchainAsset = await resp.json();
    console.log({ xchainAsset });
    if (typeof xchainAsset.error === 'string') {
      return res.status(400).json({ error: 'This asset not found on xchain.' });
    }
    if (xchainAsset.divisible) {
      return res.status(400).json({ error: `Asset must not be divisible` });
    }
    if (!xchainAsset.locked) {
      return res.status(400).json({ error: `Asset must be locked` });
    }
    next();
  })
  .post(async (req, res) => {
    const isGif = req.file.mimetype === 'image/gif';
    const send = isGif ? bot.sendAnimation.bind(bot) : bot.sendPhoto.bind(bot);
    try {
      const { assetName, contact } = req.body;
      await Promise.all([
        send(process.env.TELEGRAM_SUBMISSION_CHANNEL_ID, req.file.buffer, {
          caption: `${contact} has submitted ${assetName}`,
        }),
        // fetch('https://hook.integromat.com/8mix5hofy439qpeozryd6megg1edasni', {
        //   body: JSON.stringify({ apeName, contact }),
        //   headers: { 'content-type': 'application/json' },
        //   method: 'POST',
        // }),
      ]);
      return res.status(200).end();
    } catch (e) {
      console.error(e);
      return res.status(400).end();
    }
  });

export const config = { api: { bodyParser: false } };

export default apiRouter;

type XchainAsset = Union.Strict<
  | { error: string }
  | { asset: string; asset_id: string; divisible: boolean; locked: true; supply: number }
>;
