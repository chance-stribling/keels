import Icon from '@/Components/Icon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Shows({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <Icon name="tv" className="mr-2" />

                    <p className="text-lg font-semibold">Shows</p>
                </>
            }
            color="#F0C4D2"
            textColor="#DE649E"
        >
            <Head title="Shows" />

            <div className="mx-auto max-w-7xl py-10">
                <h1 className="text-3xl font-bold text-primary">Shows</h1>
                <p className="mt-4 text-accent">
                    Just a place to drop some sweet nothings. 💌
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
