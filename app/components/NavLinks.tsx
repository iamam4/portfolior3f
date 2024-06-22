import Link from 'next/link';
import { FC } from 'react';

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: FC<NavLinkProps> = ({ href, label }) => (
  <Link href={href}>
    <div className="px-4 cursor-pointer font-medium text-slate-200 hover:text-indigo-500"></div>
      {label}
    
  </Link>
);

const NavLinks: FC = () => {
  const links = [
    {
      id: 1,
      href: '/',
      label: 'Projects',
    },
    {
      id: 2,
      href: '/about',
      label: 'About',
    },
    {
      id: 3,
      href: '/contact',
      label: 'Contact',
    },
  ];

  return (
    <div className="flex flex-row">
      {links.map(({ id, href, label }) => (
        <NavLink key={id} href={href} label={label} />
      ))}
    </div>
  );
};

export default NavLinks;
