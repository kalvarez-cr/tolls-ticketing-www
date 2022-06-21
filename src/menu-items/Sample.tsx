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
import CanalIcon from '../components/icons/CanalIcon'
import PeajeSideIcon from '../components/icons/PeajeSideIcon'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
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
    CanalIcon,
    PeajeSideIcon,
    ContentPasteSearchIcon,
    PersonAddAltIcon,
    GroupAddIcon,
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
            icon: icons.CanalIcon,
            breadcrumbs: false,
        },
        {
            id: 'Empleados',
            title: <FormattedMessage id="Gestión de empleados" />,
            type: 'item',
            url: '/empleados',
            icon: icons.PersonAddAltIcon,
            breadcrumbs: false,
        },
        {
            id: 'Monitorización',
            title: <FormattedMessage id="Monitorización" />,
            type: 'item',
            url: '/monitoring',
            icon: icons.ContentPasteSearchIcon,
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

        {
            id: 'Gestión cuentas de usuarios',
            title: <FormattedMessage id="Gestión cuentas de usuarios" />,
            type: 'item',
            url: '/gestion-de-cuentas-usuarios',
            icon: icons.GroupAddIcon,
            breadcrumbs: false,
        },

        {
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            icon: icons.ReportIcon,

            children: [
                {
                    id: ' Reportes pot recaudación',
                    title: <FormattedMessage id="Reportes por recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'Recaudación general',
                            title: (
                                <FormattedMessage id="Recaudación general" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por métodos de pago',
                            title: (
                                <FormattedMessage id="Recaudación por métodos de pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por categorías',
                            title: (
                                <FormattedMessage id="Recaudación por categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por operadores',
                            title: (
                                <FormattedMessage id="Recaudación por operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por operador - método de pago',
                            title: (
                                <FormattedMessage id="Recaudación por operador - método de pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por operador - categoría',
                            title: (
                                <FormattedMessage id="Recaudación por operador - categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes detallados',
                    title: <FormattedMessage id="Reportes detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Detalles por canales',
                            title: (
                                <FormattedMessage id="Detalles por canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detalles por método de pago',
                            title: (
                                <FormattedMessage id="Detalles por método de pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detalles por operador',
                            title: (
                                <FormattedMessage id="Detalles por operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de tránsito',
                    title: <FormattedMessage id="Reportes de tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },

                {
                    id: ' Reportes de operaciones manuales',
                    title: <FormattedMessage id="Operaciones manuales" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Operaciones manuales',
                            title: (
                                <FormattedMessage id="Operaciones manuales" />
                            ),
                            type: 'item',
                            url: '/reportes/operaciones',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },

                {
                    id: ' Reportes de turnos de trabajo',
                    title: <FormattedMessage id="Turnos de trabajo" />,
                    type: 'collapse',
                    children: [
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
                {
                    id: ' Reportes de análisis temporal',
                    title: <FormattedMessage id="Análisis temporal" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Análisis temporal',
                            title: <FormattedMessage id="Análisis temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
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
