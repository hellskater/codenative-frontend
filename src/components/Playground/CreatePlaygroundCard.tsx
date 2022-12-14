import Image, { StaticImageData } from 'next/image';

type Playground = {
  icon: StaticImageData;
  name: string;
  description: string;
};

type Props = {
  data: Playground;
  setModalOpen: () => void;
  setActivePlayground: (val: Playground) => void;
};

const CreatePlaygroundCard = ({
  data,
  setModalOpen,
  setActivePlayground
}: Props) => {
  const handleClick = () => {
    setActivePlayground(data);
    setModalOpen();
  };
  return (
    <div
      className="flex w-fit cursor-pointer items-center gap-5 rounded-lg border-indigo-400 bg-gray-800 p-4 hover:border-[1px]"
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-10 w-10">
        <Image
          src={data.icon}
          fill
          alt="playground icon"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="w-36 overflow-hidden">
        <h2>{data.name}</h2>
        <p className="whitespace-nowrap text-xs text-gray-400">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default CreatePlaygroundCard;
