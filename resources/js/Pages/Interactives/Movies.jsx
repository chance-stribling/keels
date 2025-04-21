import AllTitles from '@/Components/AllTitles.jsx';
import Icon from '@/Components/Icon';
import TitleHistory from '@/Components/TitleHistory.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Movies({ auth }) {
    const [activeTab, setActiveTab] = useState('history'); // 'search' or 'history'

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex w-full justify-between">
                    <div className="flex items-center">
                        <Icon name="film" className="mr-2" />
                        <p className="text-lg font-semibold">Movies</p>
                    </div>

                    <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() =>
                            setActiveTab(
                                activeTab === 'history' ? 'search' : 'history',
                            )
                        }
                    >
                        <span className="text font-semibold">Search</span>

                        <button
                            className={`relative h-6 w-12 rounded-full border border-primary bg-background transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary`}
                        >
                            <span
                                className={`absolute left-0 top-0 h-full w-1/2 transform rounded-full bg-secondary transition-transform duration-300 ${activeTab === 'history' ? 'translate-x-0' : 'translate-x-full'} `}
                            />
                        </button>

                        <span className="text font-semibold">History</span>
                    </div>
                </div>
            }
        >
            <Head title="Movies" />

            <div className="p-0">
                {activeTab === 'search' ? <TitleHistory /> : <AllTitles />}
            </div>
        </AuthenticatedLayout>
    );
}
