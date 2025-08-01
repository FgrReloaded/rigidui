import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
      </>
    ),
  },
  githubUrl: "https://github.com/fgrreloaded/rigidui"
};