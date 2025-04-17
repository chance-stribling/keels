import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 font-bold sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="mb-5 w-[300px]" />
                </Link>
            </div>

            <div className="rounded-lg bg-primary px-6 py-4">{children}</div>
        </div>
    );
}
