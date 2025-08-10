'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPlus } from 'react-icons/fa';

const navItems = [
  { label: 'List Applications', icon: <FaHome />, href: '/' },
  { label: 'Create Application', icon: <FaPlus />, href: '/apply' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-64 bg-gray-900 text-white flex flex-col px-6 py-8'>
      <h2 className='text-2xl font-bold mb-10 text-blue-400 tracking-wide'>
        MortgageApp
      </h2>

      <nav className='space-y-3 text-sm flex-1'>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${active ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}
              `}
            >
              <span className='text-lg'>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <footer className='mt-auto text-xs text-gray-500'>
        &copy; {new Date().getFullYear()} Mortgage System
      </footer>
    </aside>
  );
}
