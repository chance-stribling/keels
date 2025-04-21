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

            <div className="mx-auto max-w-7xl py-10">
                <h1 className="text-3xl font-bold text-primary">Food</h1>
                <p className="mt-4 text-accent">
                    Just a place to drop some sweet nothings. 💌
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
