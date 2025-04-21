import Icon from '@/Components/Icon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <Icon name="user" className="mr-2" />

                    <p className="text-lg font-semibold">Profile</p>
                </>
            }
        >
            <Head title="Profile" />

            <div className="flex flex-wrap justify-evenly gap-2 px-2 pb-4 pt-2">
                <div className="w-full flex-grow rounded-lg bg-accent p-4 shadow sm:basis-[calc(50%-0.5rem)]">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="w-full flex-grow rounded-lg bg-accent p-4 shadow sm:basis-[calc(50%-0.5rem)]">
                    <UpdatePasswordForm />
                </div>

                <div className="w-full flex-grow rounded-lg bg-accent p-4 shadow sm:basis-[calc(50%-0.5rem)]">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
