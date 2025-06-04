import {
  Button,
  Chip,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tab,
  Tabs,
  useDisclosure,
} from '@heroui/react';
import { Outlet, useLocation } from 'react-router';
import { useRef, useState } from 'react';

import Logo from '/booktrail-transparent-256.webp';
import { useUserName } from '@/features/user/hooks/useUserName';

export const AppLayout = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userNameQuery, updateUserName } = useUserName();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const username = userNameQuery.data ?? 'Hello';

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

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  Hello {username !== 'Hello' && username}
                </ModalHeader>
                <ModalBody>
                  <Input
                    ref={userNameRef}
                    placeholder="Change your username"
                  />
                  <div>
                    <Button
                      onPress={() =>
                        updateUserName.mutate(
                          userNameRef.current?.value || 'Hello',
                          { onSuccess: onClose }
                        )
                      }
                    >
                      Update
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
