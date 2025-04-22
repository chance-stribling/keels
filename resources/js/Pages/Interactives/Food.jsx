import Icon from '@/Components/Icon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Food({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <Icon name="hamburger" className="mr-2" />

                    <p className="text-lg font-semibold">Food</p>
                </>
            }
            color="#DE649E"
            textColor="#F0C4D2"
        >
            <Head title="Food" />

            <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-2">
                <div className="flex justify-center rounded-2xl border-2 border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg">
                    <Icon name="heart" className="mr-2 text-4xl text-primary" />
                    Coming Soon!
                    <Icon name="heart" className="ml-2 text-4xl text-primary" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
