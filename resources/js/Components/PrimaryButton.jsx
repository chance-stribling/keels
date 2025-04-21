import { usePage } from '@inertiajs/react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    const { url } = usePage();
    const isProfile = url === '/profile';

    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out ${
                    isProfile
                        ? 'hover:border-background'
                        : 'hover:border-accent'
                } hover:border hover:text-accent ${
                    disabled ? 'opacity-25' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
