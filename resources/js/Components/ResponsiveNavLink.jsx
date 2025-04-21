import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center justify-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-primary bg-primary bg-opacity-20 text-primary'
                    : 'border-transparent text-primary'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
