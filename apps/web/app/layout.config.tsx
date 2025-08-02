import RigidLogo from '@/components/logo';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2 scale-[0.75]">
        <RigidLogo /> <span className="text-gray-700 dark:text-gray-300 text-lg">Rigid UI</span>
      </div>
    ),
  },
  githubUrl: "https://github.com/fgrreloaded/rigidui"
};