import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={`flex flex-row items-center border-b-2 p-4 border-slate-600`}>
      <h1>VA Dashboard</h1>
      <div className={`ml-auto flex flex-row gap-2`}>
        <Link href={`/signin`}><Button className={`cursor-pointer`} variant={`outline`}>Sign In</Button></Link>
        
        <Button className={`cursor-pointer`}>Sign Up</Button>
      </div>
    </header>
  )
}