"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
        <path d="M12 22V12" />
        <path d="M22 7L12 12L2 7" />
        <path d="M12 12L12 2" />
        <path d="M7 4.5L17 9.5" />
        <path d="M17 14.5L7 19.5" />
      </svg>
      <span className="text-2xl font-bold text-foreground font-logo">
        OddyWears
      </span>
    </Link>
  );
}
