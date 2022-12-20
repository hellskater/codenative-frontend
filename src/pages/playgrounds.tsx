import CreatePlaygroundCard from '@components/Playground/CreatePlaygroundCard';
import { useGetProjects } from '@hooks/useProjects';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import HTML from '@assets/html-logo.png';
import ViewPlaygroundCard from '@components/Playground/ViewPlaygroundCard';
import CreatePlaygroundModal from '@components/Playground/CreatePlaygroundModal';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import PlaygroundCardLoader from '@components/Playground/PlaygroundCardLoader';
import Head from 'next/head';

const playgrounds = [
  {
    name: 'HTML/CSS/JS',
    icon: HTML,
    description: 'Vanillla HTML/CSS/JS playground'
  }
];

type Playground = {
  name: string;
  icon: StaticImageData;
  description: string;
};

const Playgrounds = () => {
  const router = useRouter();
  // To make sure the user is logged in to access this page
  const { data: session } = useSession({
    required: true
  });
  const [isCreatePlaygroundModalOpen, setIsCreatePlaygroundModalOpen] =
    useState(false);
  const [activePlayground, setActivePlayground] = useState<Playground | null>(
    null
  );
  const [projects, setProjects] = useState([]);
  const {
    data: projectData,
    reexecuteQuery,
    fetching
  } = useGetProjects(session?.user?.name!);

  useEffect(() => {
    if (projectData) setProjects(projectData?.getProjects);
  }, [projectData]);

  useEffect(() => {
    reexecuteQuery();
  }, []);

  // useEffect(() => {
  //   // Listen for changes to the URL
  //   const handleRouteChange = () => {
  //     // Refresh the page when the URL changes
  //     window.location.reload();
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, []);

  useEffect(() => {
    if (localStorage.getItem('leftPlayground')) {
      localStorage.removeItem('leftPlayground');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [router.pathname]);

  return (
    <div className="py-16 px-8">
      <Head>
        <title>Playgrounds</title>
        <link rel="icon" href="/codenative.ico" />
      </Head>
      {/* Header */}
      <section className="mt-14 flex flex-col items-center">
        <h1 className="mb-5 text-5xl font-semibold">Playgrounds</h1>
        <p className="text-xl text-gray-300">
          Playgrounds are free in-browser IDE environments. Code without
          downloading anything on your computer.
        </p>
      </section>
      {/* Create playgrounds */}
      <section className="mt-20">
        <h2 className="border-b-[1px] border-gray-500 pb-1 text-2xl font-semibold">
          Create Playgrounds
        </h2>
        <div className="mt-5">
          {playgrounds.map(item => (
            <CreatePlaygroundCard
              key={item.name}
              data={item}
              setModalOpen={() => setIsCreatePlaygroundModalOpen(true)}
              setActivePlayground={val => setActivePlayground(val)}
            />
          ))}
        </div>
      </section>

      {/* Existing playgrounds */}
      <section className="mt-40">
        <h2 className="border-b-[1px] border-gray-500 pb-1 text-2xl font-semibold">
          My Playgrounds
        </h2>
        {!fetching && projects.length === 0 ? (
          <p className="mt-5 text-center text-xl text-gray-500">
            You don&apos;t have any playgrounds yet. Create one by clicking on
            the appropriate template above.
          </p>
        ) : (
          <div className="mt-5 flex flex-wrap items-center gap-5">
            {projects?.map((name: string) => (
              <ViewPlaygroundCard key={name} name={name} />
            ))}
          </div>
        )}

        {fetching && (
          <div className="flex flex-wrap items-center gap-5">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <PlaygroundCardLoader key={index} />
            ))}
          </div>
        )}
      </section>

      {isCreatePlaygroundModalOpen && (
        <CreatePlaygroundModal
          isOpen={isCreatePlaygroundModalOpen}
          onClose={() => setIsCreatePlaygroundModalOpen(false)}
          data={activePlayground as Playground}
          projects={projects}
        />
      )}
    </div>
  );
};

export default Playgrounds;
