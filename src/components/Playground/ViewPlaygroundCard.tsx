import Link from 'next/link';

type Props = {
  name: string;
};

const ViewPlaygroundCard = ({ name }: Props) => {
  return (
    <Link href={`/playground/${name}`}>
      <div className="flex w-40 cursor-pointer justify-center rounded-lg border-indigo-400 bg-gray-800 p-4 hover:border-[1px]">
        {name}
      </div>
    </Link>
  );
};

export default ViewPlaygroundCard;
