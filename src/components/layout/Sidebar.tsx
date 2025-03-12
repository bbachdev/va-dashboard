'use client';
import { useState } from 'react';

import { FaHome } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaArrowsAltH } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaShareAltSquare } from "react-icons/fa";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`pt-10 gap-10 flex flex-col ${(isExpanded ? 'w-auto' : 'w-16 items-center')} px-2 bg-cyan-800 text-white`}>
      <a className={`flex flex-row items-center gap-2 cursor-pointer`}>
        <FaHome className={`w-8 h-8`} />
        {isExpanded && <p>Dashboard</p>}
      </a>
      <a className={`flex flex-row items-center gap-2 cursor-pointer`}>
        <FaCalendar className={`w-8 h-8`} />
        {isExpanded && <p>Calendar</p>}
      </a>
      <a className={`flex flex-row items-center gap-2 cursor-pointer`}>
        <HiSpeakerphone className={`w-8 h-8`} />
        {isExpanded && <p>Auditions</p>}
      </a>
      <a className={`flex flex-row items-center gap-2 cursor-pointer`}>
        <FaFileInvoiceDollar className={`w-8 h-8`} />
        {isExpanded && <p>Billing</p>}
      </a>
      <a className={`flex flex-row items-center gap-2 cursor-pointer`}>
        <FaShareAltSquare className={`w-8 h-8`} />
        {isExpanded && <p>Socials</p>}
      </a>
      <a className={`flex flex-row items-center gap-2 cursor-pointer`}>
        <FaGear className={`w-8 h-8`} />
        {isExpanded && <p>Settings</p>}
      </a>

      <div className={`mt-auto mb-16 flex flex-row items-center gap-2 cursor-pointer`} onClick={() => setIsExpanded(!isExpanded)}>
        <FaArrowsAltH className={`w-6 h-6`} />
        {isExpanded && <p>Collapse</p>}
      </div>
    </div>
  )
}