import Icon from '@/Components/Icon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <Icon name="table-columns" className="mr-2" />

                    <p className="text-lg font-semibold">Dashboard</p>
                </>
            }
            color="accent"
            textColor="primary"
        >
            <Head title="Dashboard" />

            <div className="mx-4 mt-2 flex flex-col items-center justify-center">
                <div className="flex w-full justify-center rounded-2xl border-2 border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg">
                <Icon
                        name="heart"
                        className="mr-2 text-4xl text-primary"
                    />
                    Welcome to Keelyscope!
                    <Icon
                    name="heart"
                    className="ml-2 text-4xl text-primary"
                />
                </div>
                <div className="mt-2 flex w-full justify-center rounded-2xl border-2 border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg">
                <Icon
                        name="film"
                        className="mr-2 text-4xl text-primary"
                    />
                    Movies
                    <Icon
                    name="film"
                    className="ml-2 text-4xl text-primary"
                />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
