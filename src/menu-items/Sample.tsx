// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { IconBrandChrome } from '@tabler/icons'

// constant
const icons = {
    IconBrandChrome,
}

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Sample = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'Dashboard',
            title: <FormattedMessage id="Dashboard" />,
            type: 'item',
            url: '/',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
        {
            id: 'Peajes',
            title: <FormattedMessage id="Peajes" />,
            type: 'item',
            url: '/peajes',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
        {
            id: 'Tarifas',
            title: <FormattedMessage id="Tarifas" />,
            type: 'item',
            url: '/tarifas',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
        {
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'item',
            url: '/reportes',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
        {
            id: 'Gestión de Cuentas',
            title: <FormattedMessage id="Gestión de Cuentas" />,
            type: 'item',
            url: '/gestion-de-cuentas',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
        {
            id: 'Mantenimiento',
            title: <FormattedMessage id="Mantenimiento" />,
            type: 'item',
            url: '/mantenimiento',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
    ],
}

export default Sample
