"use client"
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';

interface TerminalCommandProps {
  packageManager?: string;
  command?: string;
  component?: string;
  className?: string;
}

const TerminalCommand = ({
  packageManager = 'npm',
  command = 'shadcn@latest add',
  component = 'button',
  className,
}: TerminalCommandProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className={cn('relative rounded-md bg-gray-800 dark:bg-zinc-950 ', className)}>
      <div className="flex items-center space-x-1 p-4 overflow-x-auto md:text-sm text-xs whitespace-nowrap font-mono text-slate-200">
        <span className="text-cyan-400">{packageManager}</span>
        <span>{command}</span>
        <span className="text-amber-300">{component}</span>
        <button
          className="absolute right-2 top-3 text-slate-100 hover:text-slate-200 bg-slate-800 hover:bg-slate-800/60 transition p-1 rounded-md"
          onClick={() => {
            navigator.clipboard.writeText(`${packageManager} ${command} ${component}`);
            setCopied(true);
          }}
          aria-label="Copy to clipboard"
        >
          <CopyIcon className="h-4 w-4" />
        </button>
      </div>
      {copied && (
        <div className="absolute bottom-2 right-4 text-xs font-medium text-green-400 bg-slate-900 px-2 py-1 rounded">
          Copied!
        </div>
      )}
    </div>
  );
};

export default TerminalCommand;