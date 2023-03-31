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
import BusinessIcon from '@mui/icons-material/Business'
import SettingsIcon from '@mui/icons-material/Settings'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
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
    BusinessIcon,
    SettingsIcon,
    PriceChangeIcon,
    PriceCheckIcon,
}

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //
const account_manager_items = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'Gestión Cuentas de Usuarios',
            title: <FormattedMessage id="Gestión cuentas de usuarios" />,
            type: 'item',
            url: '/gestion-de-cuentas-usuarios',
            icon: icons.GroupAddIcon,
            breadcrumbs: false,
        },
    ],
}
const admin_items = {
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
            id: 'Empresas',
            title: <FormattedMessage id="Gestión de Empresas" />,
            type: 'item',
            url: '/empresas',
            icon: icons.BusinessIcon,
            breadcrumbs: false,
        },
        {
            id: 'Peajes',
            title: <FormattedMessage id="Gestión de Peajes" />,
            type: 'item',
            url: '/peajes/1',
            icon: icons.CanalIcon,
            breadcrumbs: false,
            // children: [
            //     {
            //         id: 'Peajes',
            //         title: <FormattedMessage id="Gestión de Peajes" />,
            //         type: 'item',
            //         url: '/peajes/1',
            //         breadcrumbs: false,
            //     },
            //     {
            //         id: 'Criterios de discerción',
            //         title: <FormattedMessage id="Criterios de discerción" />,
            //         type: 'item',
            //         url: '/blacklist',
            //         // icon: icons.CategoriasIcon,
            //         breadcrumbs: false,
            //     },
            //     {
            //         id: 'Lista negra de tags',
            //         title: <FormattedMessage id="Lista negra de tags" />,
            //         type: 'item',
            //         url: '/taglist',
            //         // icon: icons.CategoriasIcon,
            //         breadcrumbs: false,
            //     },
            //     {
            //         id: 'Lista negra de vehículos',
            //         title: <FormattedMessage id="Lista negra de vehículos" />,
            //         type: 'item',
            //         url: '/taglist-vehicles',
            //         // icon: icons.CategoriasIcon,
            //         breadcrumbs: false,
            //     },
            //     {
            //         id: 'Liquidación',
            //         title: <FormattedMessage id="Liquidación" />,
            //         type: 'item',
            //         url: '/liquidacion',
            //         // icon: icons.CategoriasIcon,
            //         breadcrumbs: false,
            //     },
            // ],
        },

        {
            id: 'Empleados',
            title: <FormattedMessage id="Gestión de Empleados" />,
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

        // {
        //     id: 'Gestión de Soporte',
        //     title: <FormattedMessage id="Gestión de soporte" />,
        //     type: 'item',
        //     url: '/ventaTag',
        //     icon: icons.TagSaleIcon,
        //     breadcrumbs: false,
        // },
        {
            id: 'Auditoría',
            title: <FormattedMessage id="Auditoría" />,
            type: 'item',
            // url: '/audit',
            url: '#',
            icon: icons.PriceCheckIcon,
            breadcrumbs: false,
        },

        // {
        //     id: 'Gestión Cuentas de Usuarios',
        //     title: <FormattedMessage id="Gestión cuentas de usuarios" />,
        //     type: 'item',
        //     url: '/gestion-de-cuentas-usuarios',
        //     // url: '#',
        //     icon: icons.GroupAddIcon,
        //     breadcrumbs: false,
        // },

        {
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            icon: icons.ReportIcon,

            children: [
                {
                    id: ' Reportes por recaudación',
                    title: <FormattedMessage id="Reportes por Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'Recaudación General',
                            title: (
                                <FormattedMessage id="Recaudación General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Métodos de Pago',
                            title: (
                                <FormattedMessage id="Recaudación por Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Categorías',
                            title: (
                                <FormattedMessage id="Recaudación por Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Operadores',
                            title: (
                                <FormattedMessage id="Recaudación por Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Peajes',
                            title: (
                                <FormattedMessage id="Recaudación por Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Recaudación por Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Operador - Categoría',
                            title: (
                                <FormattedMessage id="Recaudación por Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes Detallados',
                    title: <FormattedMessage id="Reportes Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Detalles por Canales',
                            title: (
                                <FormattedMessage id="Detalles por Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detalles por Método de Pago',
                            title: (
                                <FormattedMessage id="Detalles por Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detalles por Operador',
                            title: (
                                <FormattedMessage id="Detalles por Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de Tránsito',
                    title: <FormattedMessage id="Reportes de Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito por Canales',
                            title: (
                                <FormattedMessage id="Tránsito por Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },

                {
                    id: ' Reportes de Operaciones Manuales',
                    title: <FormattedMessage id="Operaciones Manuales" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Operaciones manuales',
                            title: (
                                <FormattedMessage id="Operaciones Manuales" />
                            ),
                            type: 'item',
                            url: '/reportes/operaciones',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },

                {
                    id: ' Reportes de Turnos de Trabajo',
                    title: <FormattedMessage id="Turnos de Trabajo" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: <FormattedMessage id="Turnos de Trabajo" />,
                            type: 'item',
                            url: '/reportes/turnostrabajo',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por Turno de Trabajo',
                            title: (
                                <FormattedMessage id="Operador por Turno de Trabajo" />
                            ),
                            type: 'item',
                            url: '/reportes/open',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Liquidación por Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Consolidado por efectivo" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Liquidación por Peaje',
                            title: (
                                <FormattedMessage id="Liquidación por Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Análisis temporal',
                            title: <FormattedMessage id="Análisis Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Análisis por canal',
                            title: <FormattedMessage id="Análisis por Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Análisis por operador',
                            title: (
                                <FormattedMessage id="Análisis por Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Análisis por Método de Pago',
                            title: (
                                <FormattedMessage id="Análisis por Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
            ],
        },

        {
            id: 'Configuración',
            title: <FormattedMessage id="Configuración" />,
            type: 'collapse',
            // url: '/tarifas',
            icon: icons.SettingsIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'Categoría de peajes',
                    title: <FormattedMessage id="Categoría de peajes" />,
                    type: 'item',
                    url: '/categorias-de-peaje',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Servicios',
                    title: <FormattedMessage id="Servicios" />,
                    type: 'item',
                    url: '/servicios',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Vías y autopistas',
                    title: <FormattedMessage id="Vías y autopistas" />,
                    type: 'item',
                    url: '/vias',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Criterios de Liquidación" />,
                    type: 'item',
                    url: '/liquidaciones',
                    // icon: icons.PriceChangeIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Métodos de pago',
                    title: <FormattedMessage id="Métodos de pago" />,
                    type: 'item',
                    url: '/pagos',
                    // icon: icons.PriceChangeIcon,
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

const report_viewer_items = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            icon: icons.ReportIcon,

            children: [
                {
                    id: ' Reportes por recaudación',
                    title: <FormattedMessage id="Reportes por Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'Recaudación General',
                            title: (
                                <FormattedMessage id="Recaudación General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Métodos de Pago',
                            title: (
                                <FormattedMessage id="Recaudación por Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Categorías',
                            title: (
                                <FormattedMessage id="Recaudación por Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Operadores',
                            title: (
                                <FormattedMessage id="Recaudación por Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Peajes',
                            title: (
                                <FormattedMessage id="Recaudación por Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Recaudación por Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Recaudación por Operador - Categoría',
                            title: (
                                <FormattedMessage id="Recaudación por Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes Detallados',
                    title: <FormattedMessage id="Reportes Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Detalles por Canales',
                            title: (
                                <FormattedMessage id="Detalles por Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detalles por Método de Pago',
                            title: (
                                <FormattedMessage id="Detalles por Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detalles por Operador',
                            title: (
                                <FormattedMessage id="Detalles por Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de Tránsito',
                    title: <FormattedMessage id="Reportes de Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito por Canales',
                            title: (
                                <FormattedMessage id="Tránsito por Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },

                {
                    id: ' Reportes de Operaciones Manuales',
                    title: <FormattedMessage id="Operaciones Manuales" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Operaciones manuales',
                            title: (
                                <FormattedMessage id="Operaciones Manuales" />
                            ),
                            type: 'item',
                            url: '/reportes/operaciones',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },

                {
                    id: ' Reportes de Turnos de Trabajo',
                    title: <FormattedMessage id="Turnos de Trabajo" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: <FormattedMessage id="Turnos de Trabajo" />,
                            type: 'item',
                            url: '/reportes/turnostrabajo',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por Turno de Trabajo',
                            title: (
                                <FormattedMessage id="Operador por Turno de Trabajo" />
                            ),
                            type: 'item',
                            url: '/reportes/open',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Liquidación por Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Liquidación por Turnos de Trabajo" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Liquidación por Peaje',
                            title: (
                                <FormattedMessage id="Liquidación por Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: ' Reportes de Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Análisis temporal',
                            title: <FormattedMessage id="Análisis Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Análisis por canal',
                            title: <FormattedMessage id="Análisis por Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Análisis por operador',
                            title: (
                                <FormattedMessage id="Análisis por Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Análisis por Método de Pago',
                            title: (
                                <FormattedMessage id="Análisis por Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
            ],
        },
    ],
}

const monitor_viewer_items = {
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
            title: <FormattedMessage id="Gestión de Peajes" />,
            type: 'collapse',
            // url: '/peajes/1',
            icon: icons.CanalIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'Peajes',
                    title: <FormattedMessage id="Gestión de Peajes" />,
                    type: 'item',
                    url: '/peajes/1',
                    breadcrumbs: false,
                },
                //     {
                //         id: 'Criterios de discerción',
                //         title: <FormattedMessage id="Criterios de discerción" />,
                //         type: 'item',
                //         url: '/blacklist',
                //         // icon: icons.CategoriasIcon,
                //         breadcrumbs: false,
                //     },
                //     {
                //         id: 'Lista negra de tags',
                //         title: <FormattedMessage id="Lista negra de tags" />,
                //         type: 'item',
                //         url: '/taglist',
                //         // icon: icons.CategoriasIcon,
                //         breadcrumbs: false,
                //     },
                // {
                //     id: 'Liquidación',
                //     title: <FormattedMessage id="Liquidación" />,
                //     type: 'item',
                //     url: '/liquidacion',
                //     // icon: icons.CategoriasIcon,
                //     breadcrumbs: false,
                // },
            ],
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
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            icon: icons.ReportIcon,

            children: [
                {
                    id: ' Reportes de Tránsito',
                    title: <FormattedMessage id="Reportes de Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito por Canales',
                            title: (
                                <FormattedMessage id="Tránsito por Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
            ],
        },
    ],
}

export {
    admin_items,
    account_manager_items,
    report_viewer_items,
    monitor_viewer_items,
}
