import Icon from '@/Components/Icon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Compliments({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <Icon name="face-kiss-wink-heart" className="mr-2" />
                    <p className="text-lg font-semibold">Compliments</p>
                </>
            }
            color="primary"
            textColor="accent"
        >
            <Head title="Compliments" />

            <div className="mx-auto max-w-7xl py-10">
                <h1 className="text-3xl font-bold text-primary">Compliments</h1>
                <p className="mt-4 text-accent">
                    Just a place to drop some sweet nothings. 💌
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
