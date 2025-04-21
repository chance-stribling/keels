import Icon from '@/Components/Icon';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';

export default function FilterModal({ onClose, onApply, genres, filters }) {
    const [sort, setSort] = useState('title_asc');
    const [minRating, setMinRating] = useState(1);
    const [maxRating, setMaxRating] = useState(10);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [popularOnly, setPopularOnly] = useState(false);

    useEffect(() => {
        setSort(filters.sort || 'title_asc');
        setMinRating(filters.min_rating ?? 1);
        setMaxRating(filters.max_rating ?? 10);
        setSelectedGenre(filters.genre || '');
        setPopularOnly(filters.popular || false);
    }, [filters]);

    const handleApply = () => {
        onApply({
            sort,
            min_rating: minRating,
            max_rating: maxRating,
            genre: selectedGenre,
            popular: popularOnly,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
            <div className="relative w-full max-w-2xl rounded-2xl border border-primary bg-secondary p-6 shadow-xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-background hover:text-background"
                >
                    <Icon name="times" />
                </button>

                {/* Header */}
                <h2 className="mb-4 text-center text-2xl font-bold text-background">
                    Filter Movies
                </h2>

                {/* Filter Form */}
                <div className="flex flex-col gap-4 text-background">
                    {/* Sort Order */}
                    <div>
                        <label className="mb-1 block font-semibold text-background">
                            Sort
                        </label>
                        <select
                            className="w-full rounded-lg border border-primary bg-accent p-2"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="title_asc">Title (A–Z)</option>
                            <option value="title_desc">Title (Z–A)</option>
                            <option value="release_desc">
                                Release Date (New → Old)
                            </option>
                            <option value="release_asc">
                                Release Date (Old → New)
                            </option>
                        </select>
                    </div>

                    {/* Rating Slider */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex-1">
                            <label className="mb-1 block font-semibold text-background">
                                Min Rating
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={minRating}
                                onChange={(e) =>
                                    setMinRating(Number(e.target.value))
                                }
                                className="h-2 w-full appearance-none rounded-lg bg-primary"
                            />
                            <p className="mt-1 text-sm">{minRating}</p>
                        </div>
                        <div className="flex-1">
                            <label className="mb-1 block font-semibold text-background">
                                Max Rating
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={maxRating}
                                onChange={(e) =>
                                    setMaxRating(Number(e.target.value))
                                }
                                className="h-2 w-full appearance-none rounded-lg bg-primary"
                            />
                            <p className="mt-1 text-sm">{maxRating}</p>
                        </div>
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="mb-1 block font-semibold">
                            Genre
                        </label>
                        <select
                            className="w-full rounded-lg border border-primary bg-accent p-2"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <PrimaryButton onClick={handleApply}>Apply</PrimaryButton>
                    <PrimaryButton
                        onClick={() => {
                            setSort('title_asc');
                            setMinRating(1);
                            setMaxRating(10);
                            setSelectedGenre('');
                            setPopularOnly(false);
                        }}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Reset
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
