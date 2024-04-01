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
import HistoryIcon from '@mui/icons-material/History';
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
    HistoryIcon,
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
        // {
        //     id: 'Auditoría',
        //     title: <FormattedMessage id="Auditoría" />,
        //     type: 'item',
        //     // url: '/audit',
        //     url: '#',
        //     icon: icons.PriceCheckIcon,
        //     breadcrumbs: false,
        // },

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
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'General',
                            title: (
                                <FormattedMessage id="General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Métodos de Pago',
                            title: (
                                <FormattedMessage id="Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Categorías',
                            title: (
                                <FormattedMessage id="Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operadores',
                            title: (
                                <FormattedMessage id=" Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peajes',
                            title: (
                                <FormattedMessage id="Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        {
                            id: 'Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: ' Operador - Categoría',
                            title: (
                                <FormattedMessage id="Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje por turno',
                            title: (
                                <FormattedMessage id="Peaje por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por turno',
                            title: (
                                <FormattedMessage id="Operador por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                      
                    ],
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        // {
                        //     id: 'Sistema Venvías',
                        //     title: (
                        //         <FormattedMessage id="Sistema Venvías" />
                        //     ),
                        //     type: 'item',
                        //     url: '/reportes/consolidado-tag',
                        //     // icon: icons.CategoriasIcon,
                        //     breadcrumbs: false,
                        // },
                        {
                            id: 'Tag',
                            title: (
                                <FormattedMessage id="Tag" />
                            ),
                            type: 'item',
                            url: '/reportes/transit-detailed',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Detallados',
                    title: <FormattedMessage id="Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito por tag',
                            title: (
                                <FormattedMessage id="Tránsito por tag" />
                            ),
                            type: 'item',
                            url: '/reportes/detalle-tag',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
               

                // {
                //     id: ' Reportes de Operaciones Manuales',
                //     title: <FormattedMessage id="Operaciones Manuales" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'Operaciones manuales',
                //             title: (
                //                 <FormattedMessage id="Operaciones Manuales" />
                //             ),
                //             type: 'item',
                //             url: '/reportes/operaciones',
                //             // icon: icons.CategoriasIcon,
                //             breadcrumbs: false,
                //         },
                //     ],
                // },

                {
                    id: 'Turnos de Trabajo',
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
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detallado por Taquilla',
                            title: (
                                <FormattedMessage id="Detallado por Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo-detallado',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje',
                            title: (
                                <FormattedMessage id="Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Temporal',
                            title: <FormattedMessage id="Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canal',
                            title: <FormattedMessage id="Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
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
        //     id: 'Histórico de cambios',
        //     title: <FormattedMessage id="Histórico de cambios" />,
        //     type: 'item',
        //     url: '/history',
        //     icon: icons.HistoryIcon,
        //     breadcrumbs: false,
        // },

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

const general_admin_items = {
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
        // {
        //     id: 'Auditoría',
        //     title: <FormattedMessage id="Auditoría" />,
        //     type: 'item',
        //     // url: '/audit',
        //     url: '#',
        //     icon: icons.PriceCheckIcon,
        //     breadcrumbs: false,
        // },

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
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'General',
                            title: (
                                <FormattedMessage id="General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Métodos de Pago',
                            title: (
                                <FormattedMessage id="Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Categorías',
                            title: (
                                <FormattedMessage id="Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operadores',
                            title: (
                                <FormattedMessage id=" Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peajes',
                            title: (
                                <FormattedMessage id="Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        {
                            id: 'Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: ' Operador - Categoría',
                            title: (
                                <FormattedMessage id="Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje por turno',
                            title: (
                                <FormattedMessage id="Peaje por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por turno',
                            title: (
                                <FormattedMessage id="Operador por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                      
                    ],
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        // {
                        //     id: 'Sistema Venvías',
                        //     title: (
                        //         <FormattedMessage id="Sistema Venvías" />
                        //     ),
                        //     type: 'item',
                        //     url: '/reportes/consolidado-tag',
                        //     // icon: icons.CategoriasIcon,
                        //     breadcrumbs: false,
                        // },
                        {
                            id: 'Tag',
                            title: (
                                <FormattedMessage id="Tag" />
                            ),
                            type: 'item',
                            url: '/reportes/transit-detailed',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Detallados',
                    title: <FormattedMessage id="Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito por tag',
                            title: (
                                <FormattedMessage id="Tránsito por tag" />
                            ),
                            type: 'item',
                            url: '/reportes/detalle-tag',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
               

                // {
                //     id: ' Reportes de Operaciones Manuales',
                //     title: <FormattedMessage id="Operaciones Manuales" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'Operaciones manuales',
                //             title: (
                //                 <FormattedMessage id="Operaciones Manuales" />
                //             ),
                //             type: 'item',
                //             url: '/reportes/operaciones',
                //             // icon: icons.CategoriasIcon,
                //             breadcrumbs: false,
                //         },
                //     ],
                // },

                {
                    id: 'Turnos de Trabajo',
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
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detallado por Taquilla',
                            title: (
                                <FormattedMessage id="Detallado por Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo-detallado',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje',
                            title: (
                                <FormattedMessage id="Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Temporal',
                            title: <FormattedMessage id="Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canal',
                            title: <FormattedMessage id="Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
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
                // {
                //     id: "Tarifas",
                //     title: <FormattedMessage id="Cambio masivo de tarifas" />,
                //     type: "item",
                //     url: "/fare-change",
                //     // icon: icons.PriceChangeIcon,
                //     breadcrumbs: false,
                //   },
            ],
        },
        // {
        //     id: 'Histórico de cambios',
        //     title: <FormattedMessage id="Histórico de cambios" />,
        //     type: 'item',
        //     url: '/history',
        //     icon: icons.HistoryIcon,
        //     breadcrumbs: false,
        // },

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

const crm_user_items = {
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
        // {
        //     id: 'Auditoría',
        //     title: <FormattedMessage id="Auditoría" />,
        //     type: 'item',
        //     // url: '/audit',
        //     url: '#',
        //     icon: icons.PriceCheckIcon,
        //     breadcrumbs: false,
        // },

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
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'General',
                            title: (
                                <FormattedMessage id="General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Métodos de Pago',
                            title: (
                                <FormattedMessage id="Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Categorías',
                            title: (
                                <FormattedMessage id="Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operadores',
                            title: (
                                <FormattedMessage id=" Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peajes',
                            title: (
                                <FormattedMessage id="Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        {
                            id: 'Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: ' Operador - Categoría',
                            title: (
                                <FormattedMessage id="Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje por turno',
                            title: (
                                <FormattedMessage id="Peaje por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por turno',
                            title: (
                                <FormattedMessage id="Operador por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                    ],
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        // {
                        //     id: 'Sistema Venvías',
                        //     title: (
                        //         <FormattedMessage id="Sistema Venvías" />
                        //     ),
                        //     type: 'item',
                        //     url: '/reportes/consolidado-tag',
                        //     // icon: icons.CategoriasIcon,
                        //     breadcrumbs: false,
                        // },
                        {
                            id: 'Tag',
                            title: (
                                <FormattedMessage id="Tag" />
                            ),
                            type: 'item',
                            url: '/reportes/transit-detailed',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Detallados',
                    title: <FormattedMessage id="Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito por tag',
                            title: (
                                <FormattedMessage id="Tránsito por tag" />
                            ),
                            type: 'item',
                            url: '/reportes/detalle-tag',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                

                // {
                //     id: ' Reportes de Operaciones Manuales',
                //     title: <FormattedMessage id="Operaciones Manuales" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'Operaciones manuales',
                //             title: (
                //                 <FormattedMessage id="Operaciones Manuales" />
                //             ),
                //             type: 'item',
                //             url: '/reportes/operaciones',
                //             // icon: icons.CategoriasIcon,
                //             breadcrumbs: false,
                //         },
                //     ],
                // },

                {
                    id: 'Turnos de Trabajo',
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
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detallado por Taquilla',
                            title: (
                                <FormattedMessage id="Detallado por Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo-detallado',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje',
                            title: (
                                <FormattedMessage id="Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Temporal',
                            title: <FormattedMessage id="Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canal',
                            title: <FormattedMessage id="Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
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
        // {
        //     id: 'Histórico de cambios',
        //     title: <FormattedMessage id="Histórico de cambios" />,
        //     type: 'item',
        //     url: '/history',
        //     icon: icons.HistoryIcon,
        //     breadcrumbs: false,
        // },

        // {
        //     id: 'Configuración',
        //     title: <FormattedMessage id="Configuración" />,
        //     type: 'collapse',
        //     // url: '/tarifas',
        //     icon: icons.SettingsIcon,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'Categoría de peajes',
        //             title: <FormattedMessage id="Categoría de peajes" />,
        //             type: 'item',
        //             url: '/categorias-de-peaje',
        //             // icon: icons.CategoriasIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Servicios',
        //             title: <FormattedMessage id="Servicios" />,
        //             type: 'item',
        //             url: '/servicios',
        //             // icon: icons.CategoriasIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Vías y autopistas',
        //             title: <FormattedMessage id="Vías y autopistas" />,
        //             type: 'item',
        //             url: '/vias',
        //             // icon: icons.CategoriasIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Liquidaciones',
        //             title: <FormattedMessage id="Criterios de Liquidación" />,
        //             type: 'item',
        //             url: '/liquidaciones',
        //             // icon: icons.PriceChangeIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Métodos de pago',
        //             title: <FormattedMessage id="Métodos de pago" />,
        //             type: 'item',
        //             url: '/pagos',
        //             // icon: icons.PriceChangeIcon,
        //             breadcrumbs: false,
        //         },
        //     ],
        // },

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

const visualizer_items = {
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
        // {
        //     id: 'Auditoría',
        //     title: <FormattedMessage id="Auditoría" />,
        //     type: 'item',
        //     // url: '/audit',
        //     url: '#',
        //     icon: icons.PriceCheckIcon,
        //     breadcrumbs: false,
        // },

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
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'General',
                            title: (
                                <FormattedMessage id="General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Métodos de Pago',
                            title: (
                                <FormattedMessage id="Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Categorías',
                            title: (
                                <FormattedMessage id="Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operadores',
                            title: (
                                <FormattedMessage id=" Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peajes',
                            title: (
                                <FormattedMessage id="Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        {
                            id: 'Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: ' Operador - Categoría',
                            title: (
                                <FormattedMessage id="Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje por turno',
                            title: (
                                <FormattedMessage id="Peaje por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por turno',
                            title: (
                                <FormattedMessage id="Operador por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                    ],
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        // {
                        //     id: 'Sistema Venvías',
                        //     title: (
                        //         <FormattedMessage id="Sistema Venvías" />
                        //     ),
                        //     type: 'item',
                        //     url: '/reportes/consolidado-tag',
                        //     // icon: icons.CategoriasIcon,
                        //     breadcrumbs: false,
                        // },
                        {
                            id: 'Tag',
                            title: (
                                <FormattedMessage id="Tag" />
                            ),
                            type: 'item',
                            url: '/reportes/transit-detailed',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Detallados',
                    title: <FormattedMessage id="Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito por tag',
                            title: (
                                <FormattedMessage id="Tránsito por tag" />
                            ),
                            type: 'item',
                            url: '/reportes/detalle-tag',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
              

                // {
                //     id: ' Reportes de Operaciones Manuales',
                //     title: <FormattedMessage id="Operaciones Manuales" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'Operaciones manuales',
                //             title: (
                //                 <FormattedMessage id="Operaciones Manuales" />
                //             ),
                //             type: 'item',
                //             url: '/reportes/operaciones',
                //             // icon: icons.CategoriasIcon,
                //             breadcrumbs: false,
                //         },
                //     ],
                // },

                {
                    id: 'Turnos de Trabajo',
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
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detallado por Taquilla',
                            title: (
                                <FormattedMessage id="Detallado por Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo-detallado',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje',
                            title: (
                                <FormattedMessage id="Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Temporal',
                            title: <FormattedMessage id="Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canal',
                            title: <FormattedMessage id="Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
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

        // {
        //     id: 'Configuración',
        //     title: <FormattedMessage id="Configuración" />,
        //     type: 'collapse',
        //     // url: '/tarifas',
        //     icon: icons.SettingsIcon,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'Categoría de peajes',
        //             title: <FormattedMessage id="Categoría de peajes" />,
        //             type: 'item',
        //             url: '/categorias-de-peaje',
        //             // icon: icons.CategoriasIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Servicios',
        //             title: <FormattedMessage id="Servicios" />,
        //             type: 'item',
        //             url: '/servicios',
        //             // icon: icons.CategoriasIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Vías y autopistas',
        //             title: <FormattedMessage id="Vías y autopistas" />,
        //             type: 'item',
        //             url: '/vias',
        //             // icon: icons.CategoriasIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Liquidaciones',
        //             title: <FormattedMessage id="Criterios de Liquidación" />,
        //             type: 'item',
        //             url: '/liquidaciones',
        //             // icon: icons.PriceChangeIcon,
        //             breadcrumbs: false,
        //         },
        //         {
        //             id: 'Métodos de pago',
        //             title: <FormattedMessage id="Métodos de pago" />,
        //             type: 'item',
        //             url: '/pagos',
        //             // icon: icons.PriceChangeIcon,
        //             breadcrumbs: false,
        //         },
        //     ],
        // },

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
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'General',
                            title: (
                                <FormattedMessage id="General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Métodos de Pago',
                            title: (
                                <FormattedMessage id="Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Categorías',
                            title: (
                                <FormattedMessage id="Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operadores',
                            title: (
                                <FormattedMessage id=" Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peajes',
                            title: (
                                <FormattedMessage id="Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        {
                            id: 'Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: ' Operador - Categoría',
                            title: (
                                <FormattedMessage id="Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje por turno',
                            title: (
                                <FormattedMessage id="Peaje por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por turno',
                            title: (
                                <FormattedMessage id="Operador por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                      
                    ],
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        // {
                        //     id: 'Sistema Venvías',
                        //     title: (
                        //         <FormattedMessage id="Sistema Venvías" />
                        //     ),
                        //     type: 'item',
                        //     url: '/reportes/consolidado-tag',
                        //     // icon: icons.CategoriasIcon,
                        //     breadcrumbs: false,
                        // },
                        {
                            id: 'Tag',
                            title: (
                                <FormattedMessage id="Tag" />
                            ),
                            type: 'item',
                            url: '/reportes/transit-detailed',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Detallados',
                    title: <FormattedMessage id="Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito por tag',
                            title: (
                                <FormattedMessage id="Tránsito por tag" />
                            ),
                            type: 'item',
                            url: '/reportes/detalle-tag',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
               

                // {
                //     id: ' Reportes de Operaciones Manuales',
                //     title: <FormattedMessage id="Operaciones Manuales" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'Operaciones manuales',
                //             title: (
                //                 <FormattedMessage id="Operaciones Manuales" />
                //             ),
                //             type: 'item',
                //             url: '/reportes/operaciones',
                //             // icon: icons.CategoriasIcon,
                //             breadcrumbs: false,
                //         },
                //     ],
                // },

                {
                    id: 'Turnos de Trabajo',
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
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detallado por Taquilla',
                            title: (
                                <FormattedMessage id="Detallado por Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo-detallado',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje',
                            title: (
                                <FormattedMessage id="Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Temporal',
                            title: <FormattedMessage id="Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canal',
                            title: <FormattedMessage id="Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
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
                    id: 'Recaudación',
                    title: <FormattedMessage id="Recaudación" />,
                    type: 'collapse',

                    children: [
                        {
                            id: 'General',
                            title: (
                                <FormattedMessage id="General" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-general',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Métodos de Pago',
                            title: (
                                <FormattedMessage id="Métodos de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Categorías',
                            title: (
                                <FormattedMessage id="Categorías" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operadores',
                            title: (
                                <FormattedMessage id=" Operadores" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peajes',
                            title: (
                                <FormattedMessage id="Peajes" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        {
                            id: 'Operador - Método de Pago',
                            title: (
                                <FormattedMessage id="Operador - Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categorias-pay',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: ' Operador - Categoría',
                            title: (
                                <FormattedMessage id="Operador - Categoría" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-categoria',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje por turno',
                            title: (
                                <FormattedMessage id="Peaje por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-peaje-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador por turno',
                            title: (
                                <FormattedMessage id="Operador por turno" />
                            ),
                            type: 'item',
                            url: '/reportes/consolidado-operador-turno',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                    ],
                },
                {
                    id: 'Tránsito',
                    title: <FormattedMessage id="Tránsito" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Tránsito2',
                            title: <FormattedMessage id="Tránsito" />,
                            type: 'item',
                            url: '/reportes/transito2',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/transito',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                       
                        // {
                        //     id: 'Sistema Venvías',
                        //     title: (
                        //         <FormattedMessage id="Sistema Venvías" />
                        //     ),
                        //     type: 'item',
                        //     url: '/reportes/consolidado-tag',
                        //     // icon: icons.CategoriasIcon,
                        //     breadcrumbs: false,
                        // },
                        {
                            id: 'Tag',
                            title: (
                                <FormattedMessage id="Tag" />
                            ),
                            type: 'item',
                            url: '/reportes/transit-detailed',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Detallados',
                    title: <FormattedMessage id="Detallados" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Canales',
                            title: (
                                <FormattedMessage id="Canales" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-canales',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-pago',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/recaudacion-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Tránsito por tag',
                            title: (
                                <FormattedMessage id="Tránsito por tag" />
                            ),
                            type: 'item',
                            url: '/reportes/detalle-tag',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                    ],
                },
                

                // {
                //     id: ' Reportes de Operaciones Manuales',
                //     title: <FormattedMessage id="Operaciones Manuales" />,
                //     type: 'collapse',
                //     children: [
                //         {
                //             id: 'Operaciones manuales',
                //             title: (
                //                 <FormattedMessage id="Operaciones Manuales" />
                //             ),
                //             type: 'item',
                //             url: '/reportes/operaciones',
                //             // icon: icons.CategoriasIcon,
                //             breadcrumbs: false,
                //         },
                //     ],
                // },

                {
                    id: 'Turnos de Trabajo',
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
                    id: 'Liquidaciones',
                    title: <FormattedMessage id="Liquidaciones" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Turnos de Trabajo',
                            title: (
                                <FormattedMessage id="Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Detallado por Taquilla',
                            title: (
                                <FormattedMessage id="Detallado por Taquilla" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-turnostrabajo-detallado',
                            breadcrumbs: false,
                        },
                        {
                            id: 'Peaje',
                            title: (
                                <FormattedMessage id="Peaje" />
                            ),
                            type: 'item',
                            url: '/reportes/liquidacion-peaje',
                            breadcrumbs: false,
                        },
                    ],
                },
                {
                    id: 'Análisis',
                    title: <FormattedMessage id="Analítica" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Temporal',
                            title: <FormattedMessage id="Temporal" />,
                            type: 'item',
                            url: '/reportes/temporal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Canal',
                            title: <FormattedMessage id="Canal" />,
                            type: 'item',
                            url: '/reportes/analisis-canal',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Operador',
                            title: (
                                <FormattedMessage id="Operador" />
                            ),
                            type: 'item',
                            url: '/reportes/analisis-operador',
                            // icon: icons.CategoriasIcon,
                            breadcrumbs: false,
                        },
                        {
                            id: 'Método de Pago',
                            title: (
                                <FormattedMessage id="Método de Pago" />
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

export {
    admin_items,
    account_manager_items,
    report_viewer_items,
    monitor_viewer_items,
    visualizer_items,
    crm_user_items,
    general_admin_items,
}
