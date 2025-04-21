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
    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };
    useEffect(() => {
        fetchQueuedMovies();
        fetchWatchedMovies();
    }, []);

    const fetchQueuedMovies = async () => {
        try {
            const response = await axios.get('/queue');
            setQueuedMovies(response.data);
        } catch (error) {
            console.error('Error fetching queued movies:', error);
        }
    };
    const fetchWatchedMovies = async () => {
        // try {
        //     const response = await axios.get('/watched');
        //     setQueuedMovies(response.data);
        // } catch (error) {
        //     console.error('Error fetching watched movies:', error);
        // }
    };

    return (
        <div className="flex min-h-screen flex-col justify-start px-4 pt-2">
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
                    <div className="flex justify-center rounded-2xl border-2 w-full border-primary bg-secondary p-10 text-center text-2xl font-semibold text-background shadow-lg">
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
                   <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                       <LazyLoad
                           height={200}
                           offset={100}
                           className="aspect-[2/3]"
                           once
                       >
                           <img
                               src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                               alt={selectedMovie.title}
                               className="w-40 sm:w-auto rounded-lg object-contain shadow"
                               onError={(e) => {
                                   e.target.onerror = null;
                               }}
                           />
                       </LazyLoad>
           
                       <div className="flex flex-col w-full">
                           <div className="h-[22rem] overflow-y-auto rounded-lg bg-background p-2 text-accent">
                               <h3 className="text-center text-lg font-bold underline mb-2">Overview</h3>
                               <p className='text-accent'>{selectedMovie.overview}</p>
                           </div>
                           <div className="mt-4">
                               <PrimaryButton
                                   className="w-full h-[2rem] bg-primary flex justify-center"
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
        </div>
    );
}
