import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
  const { data: session } = useSession(); // User data
  const router = useRouter();

  const handleLogin = () => {
    signIn('github');
  };

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  return (
    <header className="bg-header fixed top-0 left-0 z-[99] flex h-10 w-full items-center justify-between py-8 px-4 md:px-10 lg:px-14">
      <Link href="/">
        <div className="cursor-pointer font-mono text-2xl font-semibold tracking-widest text-gray-200">
          CodeNative
        </div>
      </Link>

      {/* If user is not logged in then show login button other wise user profile and logout button */}

      {!session ? (
        <button className="bg-button" onClick={handleLogin}>
          Login
        </button>
      ) : (
        <div className="flex items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={session.user?.image!}
              fill
              className="h-full w-full object-contain"
              alt="user profile"
            />
          </div>
          <p className="ml-2 text-sm">{session.user?.name}</p>
          <button className="bg-button ml-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
