import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tab,
  Tabs,
} from '@heroui/react';
import { Outlet, useLocation } from 'react-router';

import Logo from '/booktrail-transparent-256.webp';
import { useState } from 'react';

export const AppLayout = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/', nav: true },
    { label: 'Books', href: '/books', nav: true },
    { label: 'Collections', href: '/collections', nav: true },
  ];

  return (
    <>
      <div className="container mx-auto">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* LOGO and MENU icon */}
          <NavbarContent>
            {/* <NavbarMenuToggle
              className="sm:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            /> */}
            <NavbarBrand>
              <Link
                href="/"
                className="flex gap-2"
              >
                <Image
                  src={Logo}
                  height={80}
                />
              </Link>
            </NavbarBrand>
          </NavbarContent>

          {/* PHONE MENU */}
          {/* <Tabs
            as={NavbarMenu}
            selectedKey={`/${pathname.split('/')[1]}`}
            isVertical
          >
            {menuItems.map((item) => (
              <Tab
                onTouchEnd={() => setIsMenuOpen(false)}
                onMouseDown={() => setIsMenuOpen(false)}
                as={Link}
                key={item.href}
                title={item.label}
                href={item.href}
              />
            ))}
          </Tabs> */}

          {/* PC NAV */}
          <Tabs
            className="flex"
            size="sm"
            selectedKey={`/${pathname.split('/')[1]}`}
          >
            {menuItems
              .filter((item) => item.nav)
              .map((item) => (
                <Tab
                  as={Link}
                  href={item.href}
                  title={item.label}
                  key={item.href}
                />
              ))}
          </Tabs>

          {/* <NavbarContent justify="end">
            <NavbarItem>
              <Chip
                variant="flat"
                onClick={onOpen}
              >
                {username}
              </Chip>
            </NavbarItem>
          </NavbarContent> */}
        </Navbar>

        <main className="px-6 py-8 max-w-5xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
