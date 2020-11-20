import {useState} from 'react';

import FileBase64 from 'react-file-base64';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [fileData, setFileData] = useState();
  const [image, setImage] = useState();

  const handleImage = async () => {
    // make sure we have an image file
    if (/\.(jpe?g|png)$/i.test(fileData.name)) {
      // create our payload 
      const imageData = {
        name:fileData.name,
        image:fileData.base64
      }

      // send it to the server
      const response = await fetch('/api/image',{
        method:'POST',
        body:JSON.stringify(imageData),
          headers: new Headers({ 'Content-type': 'application/json' }),
      });

      if (response.ok){
        const data = await response.json();
        setImage(data.image);
      }
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Image upload test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


      <FileBase64 multiple={false} onDone={setFileData} />
       <input type="button" value="Submit" onClick={handleImage} />
       {image && <img src={image} />}
      </main>
    </div>
  )
}
