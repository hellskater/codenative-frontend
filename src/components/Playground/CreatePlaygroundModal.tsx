import Modal from '@components/CustomUi/CustomModal';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    description: string;
    icon: StaticImageData;
  };
  projects: string[];
};

const CreatePlaygroundModal = ({ isOpen, onClose, data, projects }: Props) => {
  const router = useRouter();
  const [playgroundName, setPlaygroundName] = useState('');

  const handleCreatePlayground = () => {
    if (!playgroundName) {
      onClose();
      toast.error('Please enter a valid name', {
        id: 'playgroundCreateFailed'
      });
      return;
    }
    if (projects.includes(playgroundName)) {
      onClose();
      toast.error('A playground already exists with this name', {
        id: 'playgroundCreateFailed'
      });
      return;
    }
    router.push(`/playground/${playgroundName}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="w-fit h-fit text-white p-10"
      centered
    >
      <header className="w-full text-center text-2xl font-semibold">
        Create A Playground
      </header>
      <main>
        <div className="mt-5 flex flex-col gap-10 md:flex-row">
          <div className="w-fit rounded-lg bg-gray-700 p-4">
            <div className="flex gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src={data.icon}
                  fill
                  alt="playground icon"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="text-base">{data.name}</h2>
            </div>
            <p className="mt-5 w-60 text-sm text-gray-400">
              {data.description}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">Playground Name</h2>
            <input
              className="h-10 w-60 rounded-lg border-[1px] bg-transparent p-2 outline-none"
              type="text"
              placeholder="my-awesome-playground"
              value={playgroundName}
              onChange={e => setPlaygroundName(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-button mt-10 w-full py-2 text-lg font-semibold"
          onClick={handleCreatePlayground}
        >
          Create Playground
        </button>
      </main>
    </Modal>
  );
};

export default CreatePlaygroundModal;
