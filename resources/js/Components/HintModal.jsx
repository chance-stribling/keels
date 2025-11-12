import { useEffect, useRef } from 'react';

export default function HintModal({ onClose }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="relative w-full max-w-md rounded-2xl border-2 border-primary bg-secondary p-6 shadow-xl"
            >
                {/* Title */}
                <h2 className="mb-4 text-xl font-bold text-primary underline">
                    Need a Hint?
                </h2>

                {/* Body */}
                <div className="mt-2 text-lg font-semibold text-primary">
                    Where was our first date?
                </div>

                {/* Footer with close button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-background hover:text-primary"
                    >
                        Got It
                    </button>
                </div>
            </div>
        </div>
    );
}
