import { Logo } from '@/components/logo';
import { categories } from '@/lib/data';
import Link from 'next/link';

export function Footer() {
  const navLinks = [
    { href: '/products', label: 'All Products' },
    ...categories.map(category => ({ href: category.href, label: category.name })),
    { href: '/orders', label: 'My Orders' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">Unique T-Shirts for Cars, Anime, and Music lovers.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OddyWears. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
