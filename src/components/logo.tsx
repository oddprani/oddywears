"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <svg
        className="h-7 w-7 text-primary"
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62.5 12.5C51.5 12.5 44 21.5 44 32C44 42.5 51.5 51.5 62.5 51.5C73.5 51.5 81 42.5 81 32C81 21.5 73.5 12.5 62.5 12.5ZM57.5 32C57.5 35 60 37.5 62.5 37.5C65 37.5 67.5 35 67.5 32C67.5 29 65 26.5 62.5 26.5C60 26.5 57.5 29 57.5 32Z"
          opacity="0.8"
        />
        <path
          d="M87.5 62.5C87.5 73.5 78.5 81 67.5 81C56.5 81 49 73.5 49 62.5C49 51.5 56.5 44 67.5 44C78.5 44 87.5 51.5 87.5 62.5ZM62.5 62.5C62.5 65.5 65 68 67.5 68C70 68 72.5 65.5 72.5 62.5C72.5 59.5 70 57 67.5 57C65 57 62.5 59.5 62.5 62.5Z"
          opacity="0.8"
        />
        <path
          d="M37.5 87.5C26.5 87.5 19 78.5 19 67.5C19 56.5 26.5 49 37.5 49C48.5 49 56 56.5 56 67.5C56 78.5 48.5 87.5 37.5 87.5ZM32.5 67.5C32.5 70.5 35 73 37.5 73C40 73 42.5 70.5 42.5 67.5C42.5 64.5 40 62 37.5 62C35 62 32.5 64.5 32.5 67.5Z"
          opacity="0.8"
        />
        <path
          d="M12.5 37.5C12.5 26.5 21.5 19 32 19C42.5 19 51.5 26.5 51.5 37.5C51.5 48.5 42.5 56 32 56C21.5 56 12.5 48.5 12.5 37.5ZM32 42.5C35 42.5 37.5 40 37.5 37.5C37.5 35 35 32.5 32 32.5C29 32.5 26.5 35 26.5 37.5C26.5 40 29 42.5 32 42.5Z"
          opacity="0.8"
        />
      </svg>
      <span className="text-2xl font-bold text-foreground font-logo">
        OddyWears
      </span>
    </Link>
  );
}
