import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Icon({ style = 'fas', name, className = '' }) {
    return <FontAwesomeIcon icon={[style, name]} className={className} />;
}
