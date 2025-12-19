"use client";

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image 
        src="/main black logo.png" 
        alt="OddyWears Logo" 
        width={32} 
        height={32} 
        className="h-8 w-8"
      />
      <span className="text-2xl font-bold text-foreground font-logo">
        OddyWears
      </span>
    </Link>
  );
}
