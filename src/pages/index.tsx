import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="bg-red-500 min-h-screen">
      <Head>
        <title>CodeNative</title>
        <meta
          name="description"
          content="Faster than VSCode, right in your browser"
        />
        <link rel="icon" href="/codenative.ico" />
      </Head>
      <div className='text-green-400'>Hello</div>
    </div>
  );
}
