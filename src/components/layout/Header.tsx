import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className={`py-4 px-4 flex flex-row items-center bg-cyan-800 text-white`}>
      <h1>Header</h1>
      <div className={`ml-auto flex flex-row items-center`}>
        <Avatar className={`bg-white text-black w-10 h-10`}>
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}