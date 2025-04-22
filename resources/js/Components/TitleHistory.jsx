import Icon from '@/Components/Icon';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

export default function QueuedMovies() {
    const [queuedMovies, setQueuedMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWatchedMovie, setSelectedWatchedMovie] = useState(null);
    const [isWatchedModalOpen, setIsWatchedModalOpen] = useState(false);
    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeWatchedModal = () => {
        setIsWatchedModalOpen(false);
        setSelectedWatchedMovie(null);
    };

    const openWatchedModal = (movie) => {
        setSelectedWatchedMovie(movie);
        setIsWatchedModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };
    useEffect(() => {
        fetchQueuedMovies();
        fetchWatchedMovies();
    }, []);
    useEffect(() => {
        const isAnyModalOpen = isModalOpen || isWatchedModalOpen;

        if (isAnyModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen, isWatchedModalOpen]);
    const handleRemoveFromQueue = async () => {
        try {
            if (selectedMovie) {
                await axios.delete(`/queue/${selectedMovie.id}`);
                // Update the queuedMovies state
                setQueuedMovies((prevMovies) =>
                    prevMovies.filter(
                        (movie) => movie.tmdb_id !== selectedMovie.tmdb_id,
                    ),
                );
            } else if (selectedWatchedMovie) {
                await axios.delete(`/queue/${selectedWatchedMovie.id}`);
                // Update the queuedMovies state
                setWatchedMovies((prevMovies) =>
                    prevMovies.filter(
                        (movie) =>
                            movie.tmdb_id !== selectedWatchedMovie.tmdb_id,
                    ),
                );
            }

            // Close the modal
            setIsModalOpen(false);
            setIsWatchedModalOpen(false);
        } catch (error) {
            console.error('Error removing from queue:', error);
        }
    };

    const fetchQueuedMovies = async () => {
        try {
            const response = await axios.get('/queue');
            const allMovies = response.data;
            const queuedMovies = allMovies.filter((movie) => !movie.watched);
            setQueuedMovies(queuedMovies);
        } catch (error) {
            console.error('Error fetching queued movies:', error);
        }
    };

    const fetchWatchedMovies = async () => {
        try {
            const response = await axios.get('/queue');
            const allMovies = response.data;
            const watchedMovies = allMovies.filter((movie) => movie.watched);
            setWatchedMovies(watchedMovies);
        } catch (error) {
            console.error('Error fetching watched movies:', error);
        }
    };
    const handleMarkAsWatched = async () => {
        try {
            await axios.patch(`/queue/${selectedMovie.id}/watched`);
            // Move it from queuedMovies to watchedMovies
            setQueuedMovies((prev) =>
                prev.filter((movie) => movie.id !== selectedMovie.id),
            );
            setWatchedMovies((prev) => [
                ...prev,
                { ...selectedMovie, watched: true },
            ]);
            setIsWatchedModalOpen(false);
        } catch (error) {
            console.error('Error marking as watched:', error);
        }
    };

    return (
        <div className="flex flex-col justify-start px-4 pt-2">
            <h2 className="mb-2 text-2xl font-bold text-primary">
                Queued Movies
            </h2>

            {queuedMovies.length === 0 ? (
                <div className="mb-5 flex items-center justify-center">
                    <div className="flex w-full justify-center rounded-2xl border-2 border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg">
                        <Icon
                            name="exclamation-circle"
                            className="mr-2 text-4xl text-primary"
                        />
                        Queue is Empty
                    </div>
                </div>
            ) : (
                <div className="mb-5 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {queuedMovies.map((movie) => (
                        <div
                            key={movie.tmdb_id}
                            onClick={() => openModal(movie)}
                            className="cursor-pointer overflow-hidden rounded-lg border-2 border-primary bg-secondary text-background shadow transition-transform hover:scale-[1.02]"
                        >
                            <h2 className="p-2 text-center font-bold text-background">
                                {movie.title}
                            </h2>
                            <div className="h-48 overflow-hidden">
                                <LazyLoad height={192} offset={100} once>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </LazyLoad>
                            </div>
                            <div className="h-full px-2 py-1 text-center text-background">
                                <span>
                                    <strong className="underline">
                                        <Icon className="mr-1" name="heart" />
                                        Rating
                                    </strong>
                                    : {movie.rating}/10
                                </span>
                                <div className="h-2"></div>
                                <span>
                                    <strong className="underline">
                                        <Icon className="mr-1" name="film" />
                                        Released
                                    </strong>{' '}
                                    <br /> {movie.release_date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h2 className="mb-2 text-2xl font-bold text-primary">
                Watched Movies
            </h2>

            {watchedMovies.length === 0 ? (
                <div className="mb-6 flex items-center justify-center">
                    <div className="flex w-full justify-center rounded-2xl border-2 border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg">
                        <Icon
                            name="exclamation-circle"
                            className="mr-2 text-4xl text-primary"
                        />
                        History is Clear
                    </div>
                </div>
            ) : (
                <div className="mb-2 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {watchedMovies.map((movie) => (
                        <div
                            key={movie.tmdb_id}
                            onClick={() => openWatchedModal(movie)}
                            className="cursor-pointer overflow-hidden rounded-lg border-2 border-primary bg-secondary text-background shadow transition-transform hover:scale-[1.02]"
                        >
                            <h2 className="p-2 text-center font-bold text-background">
                                {movie.title}
                            </h2>
                            <div className="h-48 overflow-hidden">
                                <LazyLoad height={192} offset={100} once>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </LazyLoad>
                            </div>
                            <div className="h-full px-2 py-1 text-center text-background">
                                <span>
                                    <strong className="underline">
                                        <Icon className="mr-1" name="heart" />
                                        Rating
                                    </strong>
                                    : {movie.rating}/10
                                </span>
                                <div className="h-2"></div>
                                <span>
                                    <strong className="underline">
                                        <Icon className="mr-1" name="film" />
                                        Released
                                    </strong>{' '}
                                    <br /> {movie.release_date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && selectedMovie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
                    <div className="relative w-full max-w-2xl rounded-2xl border border-primary bg-secondary p-6 shadow-xl">
                        <button
                            onClick={closeModal}
                            className="absolute right-4 top-4 text-primary hover:text-background"
                        >
                            <Icon name="times" />
                        </button>
                        <h2 className="mb-4 text-center text-2xl font-bold text-background">
                            {selectedMovie.title}
                        </h2>

                        {/* Responsive Flex Container */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                            <LazyLoad
                                height={200}
                                offset={100}
                                className="aspect-[2/3]"
                                once
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                    alt={selectedMovie.title}
                                    className="w-40 rounded-lg object-contain shadow sm:w-auto"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                    }}
                                />
                            </LazyLoad>

                            <div className="flex w-full flex-col">
                                <div className="h-[18rem] overflow-y-auto rounded-lg bg-background p-2 text-accent">
                                    <h3 className="mb-2 text-center text-lg font-bold underline">
                                        Overview
                                    </h3>
                                    <p className="text-accent">
                                        {selectedMovie.overview}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <PrimaryButton
                                        className="mb-2 flex h-[2rem] w-full justify-center bg-primary"
                                        onClick={handleRemoveFromQueue}
                                    >
                                        <Icon className="mr-2" name="minus" />

                                        <p>Remove from Queue</p>
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="flex h-[2rem] w-full justify-center bg-primary"
                                        onClick={handleMarkAsWatched}
                                    >
                                        <Icon className="mr-2" name="eye" />

                                        <p>Watched</p>
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isWatchedModalOpen && selectedWatchedMovie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
                    <div className="relative w-full max-w-2xl rounded-2xl border border-primary bg-secondary p-6 shadow-xl">
                        <button
                            onClick={closeWatchedModal}
                            className="absolute right-4 top-4 text-primary hover:text-background"
                        >
                            <Icon name="times" />
                        </button>
                        <h2 className="mb-4 text-center text-2xl font-bold text-background">
                            {selectedWatchedMovie.title}
                        </h2>

                        {/* Responsive Flex Container */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                            <LazyLoad
                                height={200}
                                offset={100}
                                className="aspect-[2/3]"
                                once
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${selectedWatchedMovie.poster_path}`}
                                    alt={selectedWatchedMovie.title}
                                    className="w-40 rounded-lg object-contain shadow sm:w-auto"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                    }}
                                />
                            </LazyLoad>

                            <div className="flex w-full flex-col">
                                <div className="h-[18rem] overflow-y-auto rounded-lg bg-background p-2 text-accent">
                                    <h3 className="mb-2 text-center text-lg font-bold underline">
                                        Overview
                                    </h3>
                                    <p className="text-accent">
                                        {selectedWatchedMovie.overview}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <PrimaryButton
                                        className="flex h-[2rem] w-full justify-center bg-primary"
                                        onClick={handleRemoveFromQueue}
                                    >
                                        <Icon className="mr-2" name="eye" />

                                        <p>Remove from Watched</p>
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
