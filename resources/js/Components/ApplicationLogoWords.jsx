import logo from '../../../public/assets/images/logos/logo-words-color-trans.png';
// import logo from '../../../public/assets/images/logos/placeholder.webp';

export default function ApplicationLogo({ className = '' }) {
    return <img className={className} src={logo} alt="Tab Logo" />;
}
