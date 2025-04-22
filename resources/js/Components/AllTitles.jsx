import FilterModal from '@/Components/FilterModal';
import Icon from '@/Components/Icon';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import LazyLoad from 'react-lazyload';
export default function AllTitles() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        sort: 'title_asc',
        min_rating: 1,
        max_rating: 10,
        genre: '',
        popular: false, // This flag controls whether to show popular movies
    });
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [queuedMovies, setQueuedMovies] = useState([]);
    const { auth } = usePage().props;
    const userId = auth.user?.id;
    useEffect(() => {
        const fetchQueuedMovies = async () => {
            try {
                const res = await axios.get('/queue');
                setQueuedMovies(res.data);
                console.log('Fetched queued movies:', res.data);
            } catch (err) {
                console.error('Error fetching queued movies:', err);
            }
        };

        fetchQueuedMovies();
    }, []);

    const queuedMovieIds = useMemo(() => {
        return queuedMovies.map((movie) => String(movie.tmdb_id));
    }, [queuedMovies]);

    const isQueued = useMemo(() => {
        if (!selectedMovie) return false;
        return queuedMovieIds.includes(String(selectedMovie.id));
    }, [selectedMovie, queuedMovieIds]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000); // 2 seconds

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);
    const handleRemoveFromQueue = async () => {
        try {
            await axios.delete(`/queue/${selectedMovie.id}`);
        } catch (error) {
            console.error('Error removing from queue:', error);
        }
    };

    useEffect(() => {
        fetchGenres(); // Fetch genres when the component mounts
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('tmdb/genres');
            setGenres(response.data); // Set genres data
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleApplyFilters = (newFilters) => {
        setCurrentPage(1); // Reset page to 1 when filters are applied
        setFilters(newFilters); // Apply new filters
        setFilterModalOpen(false); // Close the filter modal
    };

    useEffect(() => {
        fetchMovies(currentPage, filters, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm, filters]);

    useEffect(() => {
        if (selectedMovie) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = 'auto'; // Allow scrolling when modal is closed
        }
    }, [selectedMovie]);

    const fetchMovies = async (
        page = currentPage,
        filtersState = filters,
        term = searchTerm,
    ) => {
        try {
            setIsLoading(true); // Set loading state to true
            const currentFilters = { ...filtersState };
            if (!currentFilters.popular) {
                currentFilters.popular = null;
            }

            const response = await axios.get('tmdb/search', {
                params: {
                    ...currentFilters,
                    page,
                    search: term,
                },
            });

            const data = response.data;
            setMovies(data.data);
            setTotalPages(Math.ceil(data.total / 20));
            setTotalResults(data.total);
            console.log(data);
            // Log movie IDs
            const movieIds = data.data.map((movie) => movie.id);
            console.log('Fetched movie IDs:', movieIds);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        } finally {
            setIsLoading(false); // Set loading state to false once data is fetched
        }
    };

    const handleQueueMovie = async () => {
        try {
            const response = await axios.post('/queue', {
                tmdb_id: selectedMovie.id,
                title: selectedMovie.title,
                poster_path: selectedMovie.poster_path,
                overview: selectedMovie.overview,
                release_date: selectedMovie.release_date,
                rating: selectedMovie.vote_average.toFixed(1),
                user_id: userId, // now accessible from auth
            });

            // Only add to local queue if the request succeeded
            setQueuedMovies((prev) => [
                ...prev,
                {
                    tmdb_id: selectedMovie.id,
                    ...selectedMovie,
                },
            ]);
        } catch (error) {
            console.error('Error queuing movie:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="mt-4 flex justify-center gap-2">
                {currentPage > 3 && (
                    <PrimaryButton
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        1
                    </PrimaryButton>
                )}
                {currentPage > 3 && (
                    <span className="py-2 text-accent">...</span>
                )}
                {pageNumbers
                    .filter(
                        (page) =>
                            page >= currentPage - 2 && page <= currentPage + 2,
                    )
                    .map((page) => (
                        <PrimaryButton
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </PrimaryButton>
                    ))}
                {currentPage < totalPages - 2 && (
                    <span className="py-2 text-accent">...</span>
                )}
                {currentPage < totalPages - 2 && (
                    <PrimaryButton
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        {totalPages}
                    </PrimaryButton>
                )}
            </div>
        );
    };

    return (
        <div className="px-4 pt-2">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-secondary p-6 shadow-lg">
                        <Icon
                            name="spinner"
                            className="animate-spin text-4xl text-primary"
                        />
                        <p className="text-lg font-semibold text-background">
                            Loading...
                        </p>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="mb-4 flex items-stretch gap-4">
                <div className="relative w-full sm:w-1/2">
                    <TextInput
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search movies..."
                        className="h-10 w-full pr-10"
                    />
                    <PrimaryButton
                        type="button"
                        className="absolute right-0 top-0 h-full rounded-l-none px-3"
                        onClick={fetchMovies}
                    >
                        <Icon name="search" />
                    </PrimaryButton>
                </div>
                <PrimaryButton
                    className="h-10 bg-secondary px-4"
                    onClick={() => setFilterModalOpen(true)}
                >
                    <Icon name="filter" className="mr-2 text-primary" />
                    <p className="text-background">Filters</p>
                </PrimaryButton>
            </div>

            {/* Movie Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => openModal(movie)}
                        className="cursor-pointer overflow-hidden rounded-lg border-2 border-primary bg-secondary text-background shadow transition-transform hover:scale-[1.02]"
                    >
                        <div className="flex h-16 flex-col items-center justify-center p-2 text-center font-bold text-background">
                            <h2>{movie.title}</h2>
                        </div>
                        <div className="h-48 overflow-hidden">
                            <LazyLoad height={192} offset={100} once>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path || '/default_image.jpg'}`}
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
                                : {movie.vote_average}/10
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

            {/* Results Count */}
            <div className="mt-4 text-center text-accent">
                <p>
                    Displaying {(currentPage - 1) * 20 + 1} -{' '}
                    {Math.min(currentPage * 20, totalResults)} of {totalResults}{' '}
                    Results
                </p>
            </div>

            {/* Pagination */}
            {renderPagination()}

            {/* Modals */}

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
                                    <p>{selectedMovie.overview}</p>
                                </div>
                                <div className="mt-4">
                                    <PrimaryButton
                                        className="flex h-[2rem] w-full justify-center bg-primary"
                                        onClick={
                                            isQueued
                                                ? handleRemoveFromQueue
                                                : handleQueueMovie
                                        }
                                    >
                                        {isQueued ? (
                                            <Icon
                                                className="mr-2"
                                                name="minus"
                                            />
                                        ) : (
                                            <Icon
                                                className="mr-2"
                                                name="plus"
                                            />
                                        )}

                                        {isQueued
                                            ? 'Remove from Queue'
                                            : 'Add to Queue'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {isFilterModalOpen &&
                (() => {
                    console.log('Filter modal should render');
                    return (
                        <FilterModal
                            onApply={handleApplyFilters}
                            onClose={() => setFilterModalOpen(false)}
                            filters={filters}
                            genres={genres}
                        />
                    );
                })()}
        </div>
    );
}
