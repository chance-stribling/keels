import Icon from '@/Components/Icon';
import { useState } from 'react';

const JumpingText = ({ text }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false); // Reset the animation state after it finishes
        }, 1000); // Duration of the animation (1 second)
    };

    return (
        <div className="mb-5 flex" onClick={handleClick}>
            <Icon name="heart" className="mr-2 text-4xl text-primary" />
            {text.split('').map((char, index) => (
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

export default JumpingText;
