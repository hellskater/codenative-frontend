import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// LANDING PAGE

const IndexPage: NextPage = () => {
  const { status } = useSession();

  const router = useRouter();

  const redirectToPlaygroundPage = () => {
    if (status !== 'authenticated') {
      toast.error('Please login to create your playground', {
        id: 'playgroundRedirectFailed'
      });
      return;
    }
    router.push('/playgrounds');
  };

  return (
    <div className="relative min-h-screen w-full p-14 pt-16">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>

      {/* Hero section */}
      <section className="mt-32 flex items-center justify-between lg:mt-14">
        <header className="flex flex-col items-center text-4xl font-semibold lg:items-start lg:text-7xl">
          <p className="text-gradient-hero text-center leading-[0.8] lg:text-start">
            Code Native
          </p>
          {/* <p className="mt-5 text-center lg:text-start ">on the web.</p> */}
          <p className="mt-12 text-center text-base leading-[1.9] lg:text-start">
            Your local dev environment right in your favourite browser, faster
            and smoother.
          </p>

          <button
            className="bg-button mt-14 flex h-12 w-fit items-center justify-center gap-5 text-lg "
            onClick={redirectToPlaygroundPage}
          >
            Playgrounds
          </button>
        </header>

        {/* Hero image */}
        <div className="relative hidden h-[30rem] w-[29rem] lg:flex">
          {/* <Image
            src={Thunder}
            layout="fill"
            className="h-full w-full object-cover brightness-150"
          /> */}
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
