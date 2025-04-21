import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'flex items-center justify-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'w-[100px] rounded-t-lg border-b-4 border-background bg-accent text-primary'
                    : 'w-[100px] rounded-t-lg border-primary bg-accent bg-opacity-0 text-primary hover:bg-opacity-80 hover:text-primary') +
                className
            }
        >
            {children}
        </Link>
    );
}
