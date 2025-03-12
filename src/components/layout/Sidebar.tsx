import { FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className={`pt-10 flex flex-col items-center w-16 px-2 bg-cyan-800 text-white`}>
      <FaHome className={`w-6 h-6`} />
    </div>
  )
}