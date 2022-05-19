// third-party
import { FormattedMessage } from 'react-intl'

// assets
import gestiondecuentasvehiculos from '../components/icons/gestiondecuentasvehiculos'
import ResumenIcon from '../components/icons/ResumenIcon'
import CategoriasIcon from '../components/icons/CategoriasIcon'
import PeajesIcon from '../components/icons/PeajesIcon'
import TagSaleIcon from '../components/icons/TagSaleIcon'
import cuentasIcon from '../components/icons/cuentasIcon'
import ReportIcon from '../components/icons/ReportIcon'
import MantenimientoIcon from '../components/icons/MantenimientoIcon'
// constant
const icons = {
    ResumenIcon,
    CategoriasIcon,
    PeajesIcon,
    TagSaleIcon,
    cuentasIcon,
    ReportIcon,
    MantenimientoIcon,
    gestiondecuentasvehiculos,
}

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Sample = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'Resumen',
            title: <FormattedMessage id="Resumen" />,
            type: 'item',
            url: '/',
            icon: icons.ResumenIcon,
            breadcrumbs: false,
        },
        {
            id: 'Peajes',
            title: <FormattedMessage id="Gestión de peajes" />,
            type: 'item',
            url: '/peajes/1',
            icon: icons.PeajesIcon,
            breadcrumbs: false,
        },
        {
            id: 'Gestión de Tarifas',
            title: <FormattedMessage id="Gestión de Tarifas" />,
            type: 'collapse',
            // url: '/tarifas',
            icon: icons.CategoriasIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'Gestión de Categoría',
                    title: <FormattedMessage id="Gestión de Categoría" />,
                    type: 'item',
                    url: '/categorias',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Gestión de Tarifas',
                    title: <FormattedMessage id="Gestión de Tarifa" />,
                    type: 'item',
                    url: '/tarifas',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
            ],
        },

        {
            id: 'Gestión de soporte',
            title: <FormattedMessage id="Gestión de soporte" />,
            type: 'item',
            url: '/ventaTag',
            icon: icons.TagSaleIcon,
            breadcrumbs: false,
        },

        // {
        //     id: 'Gestión cuentas de usuarios',
        //     title: <FormattedMessage id="Gestión cuentas de usuarios" />,
        //     type: 'item',
        //     url: '/gestion-de-cuentas-usuarios',
        //     icon: icons.gestiondecuentasvehiculos,
        //     breadcrumbs: false,
        // },

        {
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            // url: '/reportes',
            icon: icons.ReportIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'item',
                    url: '/reportes/recaudacion',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'item',
                    url: '/reportes/transito',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Operaciones manuales',
                    title: <FormattedMessage id="Operaciones manuales" />,
                    type: 'item',
                    url: '/reportes/operaciones',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Turnos de trabajo',
                    title: <FormattedMessage id="Turnos de trabajo" />,
                    type: 'item',
                    url: '/reportes/turnostrabajo',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
            ],
        },

        // {
        //     id: 'Mantenimiento',
        //     title: <FormattedMessage id="Mantenimiento" />,
        //     type: 'item',
        //     url: '/mantenimiento',
        //     icon: icons.MantenimientoIcon,
        //     breadcrumbs: false,
        // },
    ],
}

export default Sample
