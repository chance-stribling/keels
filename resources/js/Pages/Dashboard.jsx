import Icon from '@/Components/Icon';
import SurpriseCard from '@/Components/SurpriseCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
const movies = () => {
    router.visit('/movies');
};
const JumpingText = () => {
    const [clicked, setClicked] = useState(false);
    const text = "Welcome to Keelyscope!";

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false); // Reset the animation state after it finishes
        }, 1000); // Duration of the animation (1 second)
    };

    return (
        <div className="mb-5 flex" onClick={handleClick}>
            <Icon name="heart" className="mr-2 text-4xl text-primary" />
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className={`inline-block ${clicked ? `animate-jump-${index + 1}` : ''}`}
                >
                    {char}
                </span>
            ))}
            <Icon name="heart" className="ml-2 text-4xl text-primary" />
        </div>
    );
};
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
                <div
                    style={{
                        background:
                            'linear-gradient(45deg, rgba(255, 0, 0, 0.2) 14.28%, rgba(255, 127, 0, 0.2) 14.28%, rgba(255, 255, 0, 0.2) 28.56%, rgba(0, 255, 0, 0.2) 42.84%, rgba(0, 0, 255, 0.2) 57.12%, rgba(75, 0, 130, 0.2) 71.4%, rgba(238, 130, 238, 0.2) 85.68%)',
                    }}
                    className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-primary bg-accent p-10 text-center text-2xl font-semibold text-accent shadow-lg"
                >
                    <div className="mb-5 flex">
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
                    <p>
                        Welcome to Keelyscope, where we explore the world of
                        movies, shows, and food together. A space to track,
                        share, and discover the things we enjoy, with plenty
                        more to come. Let’s dive into the stories and
                        experiences that make us who we are.
                    </p>
                </div>
                <SurpriseCard />
                <div
                    className="mt-2 mb-4 flex w-full cursor-pointer justify-center rounded-2xl border-2 border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg hover:scale-[102%]"
                    onClick={movies}
                >
                    <Icon name="film" className="mr-2 text-4xl text-primary" />
                    Movies
                    <Icon name="film" className="ml-2 text-4xl text-primary" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
