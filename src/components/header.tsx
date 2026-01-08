"use client";

import Link from 'next/link';
import {
  Menu,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories } from '@/lib/data';
import Image from 'next/image';

export function Header() {
  const { state } = useCart();
  const cartItemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: '/products', label: 'All Products' },
    ...categories.map(category => ({ href: category.href, label: category.name })),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center justify-center">
                <Image src="/main white logo.png" alt="OddyWears Logo" width={64} height={64} className="h-16 w-16" />
            </Link>
        </div>
        
        <div className="hidden md:flex">
             <span className="text-2xl font-bold text-foreground font-logo">
                OddyWears
            </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0">
                {cartItemCount}
              </Badge>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <div className="flex flex-col gap-6 p-6">
                    <span className="text-2xl font-bold text-foreground font-logo">
                        OddyWears
                    </span>
                    <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/80 hover:text-foreground">
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
