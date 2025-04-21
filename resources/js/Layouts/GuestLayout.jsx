import ApplicationLogo from '@/Components/ApplicationLogo';
import Icon from '@/Components/Icon';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background pt-6 align-middle font-bold">
            <div className="absolute right-0 top-0">
                <nav className="flex justify-end">
                    <Link
                        href={route('login')}
                        className="flex items-center rounded-md px-3 py-2 text-accent ring-1 ring-transparent transition hover:text-primary max-sm:text-primary"
                    >
                        <Icon name="home" className="mr-2 text-primary" />
                        <p>Home</p>
                    </Link>
                </nav>
            </div>
            <div>
                <Link href="/">
                    <ApplicationLogo className="mb-5 w-[350px]" />
                </Link>
            </div>

            <div className="w-[350px] rounded-lg bg-secondary px-6 py-4">
                {children}
            </div>
        </div>
    );
}
