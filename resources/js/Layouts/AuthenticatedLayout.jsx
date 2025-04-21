import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Icon from '@/Components/Icon';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { useState } from 'react';

export default function AuthenticatedLayout({
    header,
    children,
    color = 'accent',
    textColor = 'primary',
}) {
    // pulls user info
    const user = usePage().props.auth.user;

    // controls the visibility of mobile nav
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isHex = (value) => value.startsWith('#');

    const headerClasses = [
        'border-b-2 border-primary shadow',
        !isHex(color) && `bg-${color}`,
        !isHex(textColor) && `text-${textColor}`,
    ]
        .filter(Boolean)
        .join(' ');

    const headerStyle = {
        ...(isHex(color) ? { backgroundColor: color } : {}),
        ...(isHex(textColor) ? { color: textColor } : {}),
    };

    return (
        // Full layout container
        <div className="min-h-screen bg-background font-bold">
            {/* Container for the navbar */}
            <div className="sticky top-0 z-50">
                <nav className="border-b-2 border-primary bg-secondary">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="grid h-full grid-cols-3 items-center py-6">
                            {/* Left: Logo */}
                            <div className="flex items-center">
                                {/* Large screens */}
                                <div className="hidden shrink-0 items-center sm:flex">
                                    <Link href={route('dashboard')}>
                                        <ApplicationLogo className="h-[45px]" />
                                    </Link>
                                </div>

                                {/* Mobile */}
                                <div className="flex shrink-0 items-center sm:hidden">
                                    <Link href={route('dashboard')}>
                                        <ApplicationLogo className="h-[25px]" />
                                    </Link>
                                </div>
                            </div>

                            {/* Center: NavLinks (hide only content on mobile) */}
                            <div className="flex h-full justify-center">
                                <div className="hidden h-full space-x-2 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('shows')}
                                        active={route().current('shows')}
                                    >
                                        Shows
                                    </NavLink>
                                    <NavLink
                                        href={route('movies')}
                                        active={route().current('movies')}
                                    >
                                        Movies
                                    </NavLink>
                                    <NavLink
                                        href={route('food')}
                                        active={route().current('food')}
                                    >
                                        Food
                                    </NavLink>
                                </div>
                            </div>

                            {/* Right: User dropdown + mobile hamburger */}
                            <div className="flex items-center justify-end space-x-4">
                                {/* Desktop dropdown */}
                                <div className="hidden items-center sm:flex">
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                {({ open }) => (
                                                    <span className="flex h-[40px] rounded-md align-middle">
                                                        <button
                                                            type="button"
                                                            className={clsx(
                                                                'flex w-[130px] items-center justify-between rounded-md border border-transparent px-3 py-2 text-sm font-medium transition duration-150 ease-in-out',
                                                                open
                                                                    ? 'bg-accent text-primary'
                                                                    : 'bg-accent text-primary hover:border-background',
                                                            )}
                                                        >
                                                            <div className="flex items-center justify-evenly">
                                                                <Icon
                                                                    name="user"
                                                                    className="mr-2 text-primary"
                                                                />
                                                                <span className="overflow-hidden truncate whitespace-nowrap">
                                                                    {user.name}
                                                                </span>
                                                            </div>
                                                            <svg
                                                                className="h-4 w-4 text-primary"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                )}
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route('profile.edit')}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                {/* Mobile hamburger */}
                                <div className="flex items-center sm:hidden">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (prev) => !prev,
                                            )
                                        }
                                        className="inline-flex items-center justify-center rounded-md bg-accent p-2 text-primary transition duration-150 ease-in-out hover:bg-background"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    !showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile nav dropdown */}
                    {showingNavigationDropdown && (
                        <>
                            {/* Overlay */}
                            <div
                                className="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-50"
                                onClick={() =>
                                    setShowingNavigationDropdown(false)
                                }
                            ></div>

                            {/* Dropdown content */}
                            <div className="absolute left-1/2 z-20 w-[calc(100%-0.5rem)] -translate-x-1/2 transform border-2 border-primary bg-accent sm:hidden">
                                <div className="space-y-1 bg-accent pb-3 pt-2">
                                    <ResponsiveNavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        <Icon
                                            name="table-columns"
                                            className="mr-2 text-primary"
                                        />
                                        <div>Dashboard</div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('shows')}
                                        active={route().current('shows')}
                                    >
                                        <Icon
                                            name="tv"
                                            className="mr-2 text-primary"
                                        />
                                        <div>Shows</div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('movies')}
                                        active={route().current('movies')}
                                    >
                                        <Icon
                                            name="film"
                                            className="mr-2 text-primary"
                                        />
                                        <div>Movies</div>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('food')}
                                        active={route().current('food')}
                                    >
                                        <Icon
                                            name="burger"
                                            className="mr-2 text-primary"
                                        />
                                        <div>Food</div>
                                    </ResponsiveNavLink>
                                </div>

                                <div className="border-y-2 border-primary bg-accent px-4 py-4">
                                    <div className="text-base font-medium text-primary">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-secondary">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink
                                        href={route('profile.edit')}
                                    >
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </>
                    )}
                </nav>

                {header && (
                    <header className={clsx(headerClasses)} style={headerStyle}>
                        <div className="flex items-center justify-start bg-primary px-4 py-2 text-accent">
                            {header}
                        </div>
                    </header>
                )}
            </div>
            <main>{children}</main>
        </div>
    );
}
