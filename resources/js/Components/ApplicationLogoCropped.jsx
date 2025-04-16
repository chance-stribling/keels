// import logo from '../../../public/assets/images/logos/logo-cropped.png';
import logo from '../../../public/assets/images/logos/placeholder.webp';

export default function ApplicationLogo({className=''}) {
    return <img className={className} src={logo} alt="Tab Logo" />;
}
