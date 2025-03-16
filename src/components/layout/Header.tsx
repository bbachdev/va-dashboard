'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authClient } from "@/lib/auth-client";
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Header() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className={`py-4 px-4 flex flex-row items-center bg-cyan-800 text-white`}>
      <Link href={(session) ? '/dashboard' : '/'}><h1>Header</h1></Link>
      <div className={`ml-auto flex flex-row items-center`}>

        { !isPending && session && (
            <Avatar className={`bg-white text-black w-10 h-10`}>
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
        )}
        
        { !isPending && !session && (
          <div className={`flex flex-row items-center gap-4`}>
            <Link href="/signin"><Button className={`bg-cyan-950`}>Sign In</Button></Link>
            <Link href="/signup"><Button className={`bg-white text-black hover:bg-white/80`}>Sign Up</Button></Link>
          </div>
        )}
      </div>
    </header>
  )
}