import nc from 'next-connect';
import fs from "fs";
import path from "path";

export function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({onError})
  .post( (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const data = Buffer.from(image.slice(image.indexOf(",")), "base64");
    fs.writeFileSync(path.join('./uploads', name), data);
    res.status(200).end();
  }
);

export default handler;