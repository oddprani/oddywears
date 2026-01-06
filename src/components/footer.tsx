import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {

  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              connect
              <br />
              with us!
            </h2>
          </div>
          <div className="space-y-4">
            <form className="flex flex-col gap-3">
              <Input type="text" placeholder="name" className="bg-transparent rounded-none border-b focus:ring-0 focus:border-primary-foreground" />
              <Input type="email" placeholder="e-mail" className="bg-transparent rounded-none border-b focus:ring-0 focus:border-primary-foreground" />
              <Button type="submit" variant="secondary" className="rounded-none w-full">submit</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} oddywears.com. all rights reserved</p>
          <div className="flex gap-4">
             <Link href="#" className="hover:text-primary transition-colors">
                  terms and policies
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
