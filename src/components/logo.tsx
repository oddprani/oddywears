"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Shirt } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Shirt className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold text-foreground font-logo">
        OddyWears
      </span>
    </Link>
  );
}