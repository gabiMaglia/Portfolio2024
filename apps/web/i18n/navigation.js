import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Link con `locale`: arma el href prefijado, agrega hreflang y mantiene la cookie NEXT_LOCALE
export const {Link} = createNavigation(routing);
