import Icon from '@/Components/Icon';
import { useState } from 'react';

const compliments = [
    'You are so beautiful!',
    'Your smile lights up the room!',
    'You have a heart of gold!',
    "You're absolutely stunning!",
    'Your presence is magnetic!',
    "You're more beautiful than the stars!",
    'Your laughter is contagious!',
    'You are a masterpiece!',
    'Your kindness is so inspiring!',
    'You have the best energy!',
    "You're a ray of sunshine!",
    'You have the most beautiful soul!',
    "You're incredibly graceful!",
    "You're perfect just the way you are!",
    "You're a true work of art!",
    'You brighten up my day!',
    "You're so strong and powerful!",
    'You make everything better!',
    "You're one of a kind!",
    'Your eyes are mesmerizing!',
    'You have a beautiful mind!',
    'You light up every room you enter!',
    "You're a natural beauty!",
    "You're stunning inside and out!",
    'Your energy is simply amazing!',
    'You are so elegant!',
    "You're incredibly inspiring!",
    'You radiate beauty!',
    'You are a true gem!',
    'Your confidence is inspiring!',
    "You're absolutely breathtaking!",
    'Your smile makes the world a better place!',
    'You are so charming!',
    "You're a dream come true!",
    'You have a beautiful spirit!',
    'You make life so much better!',
    'You have such a sweet soul!',
    "You have a glow that can't be matched!",
    'You have the most beautiful laugh!',
    "You're truly unforgettable!",
    'You are so unique and special!',
    'Your beauty is timeless!',
    'You light up the world!',
    "You're so graceful and elegant!",
    "You're effortlessly beautiful!",
    'You make everything feel better!',
    "You're simply enchanting!",
    "You're perfect just as you are!",
    'You have an incredible personality!',
    "You're always so thoughtful!",
    'You are a true inspiration!',
    'You bring so much happiness!',
    "You're a breath of fresh air!",
    "You're so vibrant!",
    "You're a beacon of positivity!",
    'You have such a warm heart!',
    "You're a rare gem!",
    'You brighten the world with your smile!',
    "You're incredibly thoughtful!",
    'You make the world more beautiful!',
    "You're so genuine!",
    "You're an absolute delight!",
    "You're an incredible person!",
    "You're pure perfection!",
    "You're a true angel!",
    'You have an infectious energy!',
    "You're everything I could ever want!",
    "You're so wise and insightful!",
    'You are simply extraordinary!',
    'You bring out the best in everyone!',
    "You're so down to earth!",
    'You make people feel special!',
    'You have the most beautiful heart!',
    'You radiate positivity!',
    'You have a beautiful spirit!',
    'You are simply magnetic!',
    'You’re a vision of beauty!',
    "You're absolutely captivating!",
    'You light up my life!',
    "You're incredibly intelligent!",
    'You make everything around you shine!',
    'You’re beautiful in so many ways!',
    "You're so full of life!",
    'You have such a pure soul!',
    "You're incredibly charming!",
    'You make the world brighter!',
    "You're an inspiration to all!",
    'You always know how to brighten a room!',
    "You're a true beauty inside and out!",
    "You're effortlessly perfect!",
    'You make life more beautiful!',
    "You're a ray of hope!",
    "You're simply mesmerizing!",
    'You have a contagious smile!',
    'You bring joy everywhere you go!',
    "You're so easy to talk to!",
    "You're so beautiful, it’s breathtaking!",
    'You’re absolutely radiant!',
    "You're a true star!",
    'You make every moment better!',
    'You are a true angel on earth!',
    'You have the most beautiful eyes!',
    'You light up the darkest days!',
    'You make everything more fun!',
    "You're a truly beautiful person!",
    'You are gorgeous inside and out!',
    'You make the world a better place!',
    "You're so thoughtful and caring!",
    "You're an incredible listener!",
    "You're a true treasure!",
    'You are full of grace!',
    "You're truly amazing!",
    "You're such a beautiful person, inside and out!",
    'You have a cute butt!',
    'You have the most amazing butt!',
    'Your butt is goals!',
    'You’ve got the cutest little booty!',
    'Your butt is perfection!',
    'You have the most amazing figure!',
    'You’ve got the perfect curves!',
    'Your body is stunning!',
    'That butt is out of this world!',
    'You have a killer body!',
    'Your curves are everything!',
    'You have the most incredible booty!',
    'You’ve got a bum that’s hard to miss!',
    'That ass is incredible!',
    'Your body is absolutely amazing!',
    'You have the best curves!',
    'Your butt is definitely one to admire!',
    'You have the cutest booty!',
    'You’ve got an amazing shape!',
    'You have a butt worth showing off!',
];

export default function SurpriseCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [compliment, setCompliment] = useState('');
    const [usedCompliments, setUsedCompliments] = useState(new Set());
    const [icon, setIcon] = useState('kiss'); // Set initial icon to 'kiss'
    const fetchCompliment = () => {
        let remainingCompliments = compliments.filter(
            (compliment) => !usedCompliments.has(compliment),
        );

        if (remainingCompliments.length === 0) {
            setUsedCompliments(new Set()); // Reset if all compliments have been used
            remainingCompliments = compliments;
        }

        const randomCompliment =
            remainingCompliments[
                Math.floor(Math.random() * remainingCompliments.length)
            ];
            setIcon((prevIcon) =>
            prevIcon === 'kiss' ? 'face-smile-wink' : 'kiss'
        );
        setCompliment(randomCompliment);
        setUsedCompliments((prev) => new Set(prev).add(randomCompliment)); // Mark this compliment as used
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Prevent click event from propagating when clicking the icon
    const handleIconClick = (e) => {
        e.stopPropagation();
        toggleModal();
    };

    return (
        <div
            className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-secondary bg-primary p-10 text-center text-2xl font-semibold text-background shadow-lg"
            onClick={fetchCompliment} // Trigger the compliment fetch on div click
        >
            <div className="mb-5 flex items-center justify-center">
                <Icon
                    name="face-smile-beam"
                    className="mr-2 text-xl text-secondary"
                />
                <h2>Sweet Nothings</h2>
                <Icon
                    name="face-smile-beam"
                    className="ml-2 text-xl text-secondary"
                />
            </div>

            {compliment ? (
                <div className='w-full'>
                    <div className="mt-4 flex w-full items-center justify-center rounded-lg bg-accent p-4 text-background">
                        <p>{compliment}</p>
                        <Icon
                            name={icon}
                            className="ml-2 text-primary"
                        />
                    </div>
                </div>
            ) : <h2>Tap Here</h2>}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
                    <div className="relative w-full max-w-md rounded-2xl border border-primary bg-secondary p-6 shadow-xl">
                        <button
                            onClick={toggleModal}
                            className="absolute right-4 top-4 text-primary hover:text-background"
                        >
                            <Icon name="times" />
                        </button>
                        <h2 className="text-center text-2xl font-bold text-background">
                            Lol, just a compliment generator.
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
}
