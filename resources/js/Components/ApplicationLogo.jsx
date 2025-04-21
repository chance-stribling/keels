// START_TOGGLE
import logo from '../../../public/assets/images/logos/logo-no-background.png';
//import logo from '../../../public/assets/images/logos/tab-color-trans.png';
// END_TOGGLE

export default function ApplicationLogo({ className = '' }) {
    return <img className={className} src={logo} alt="Tab Logo" />;
}
