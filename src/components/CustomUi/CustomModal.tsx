import { Modal } from '@mantine/core';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  centered?: boolean;
  size: string;
};

const CustomModal = ({
  children,
  className,
  isOpen,
  onClose,
  centered,
  size
}: Props) => {
  const modalClassNames = {
    root: 'z-[9999]',
    modal: `bg-gray-800 ${size} rounded-2xl p-0 overflow-hidden`,
    header: 'hidden',
    body: 'h-full w-full overflow-hidden',
    overlay: 'z-[0]'
  };

  return (
    <Modal
      className={className || ''}
      opened={isOpen}
      onClose={onClose}
      centered={centered || false}
      classNames={modalClassNames}
      overlayOpacity={0.25}
      overlayBlur={6}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
