import nc from 'next-connect';
import fs from "fs";
import path from "path";


function saveImageFile(name, base64Data){

  // the data comes with a head like:
  // data:image/jpeg;base64
  // which is separated from the actual data by a comma
  const [header, body] = base64Data.split(",");
  const data = Buffer.from(body, "base64");
  const suffix = header.slice(11,header.indexOf(';'));
  fs.writeFileSync(path.join('./uploads', `${Date.now()}.${suffix}`), data);
}


export function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({onError})
  .post( (req, res) => {
    const name = req.body.name;
    const image = req.body.image;

    // at this point you could save the material in a database
    // or you could save the image somewhere and just store the path in the database
    saveImageFile(name, image);

    res.status(200).json({image});
  }
);

export default handler;