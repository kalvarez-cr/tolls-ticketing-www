import { lazy } from 'react'

// project imports
import MainLayout from 'layout/MainLayout'
import Loadable from 'ui-component/Loadable'
import AuthGuard from 'utils/route-guard/AuthGuard'

//Empresas operadoras
const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')))
const ReadCategory = Loadable(lazy(() => import('views/category/ReadCategory')))
const CreateCategory = Loadable(
    lazy(() => import('views/category/CreateCategory'))
)
const EditCategory = Loadable(lazy(() => import('views/category/EditCategory')))
const ReadTags = Loadable(lazy(() => import('views/TagsSale/ReadTags')))
const CreateTag = Loadable(lazy(() => import('views/TagsSale/CreateTag')))
const EditTag = Loadable(lazy(() => import('views/TagsSale/EditTag')))
const ReadUserAccount = Loadable(
    lazy(() => import('views/userAccount/ReadUserAccount'))
)
const CreateUserAccount = Loadable(
    lazy(() => import('views/userAccount/CreateUserAccount'))
)
const EditUserAccount = Loadable(
    lazy(() => import('views/userAccount/EditUserAccount'))
)
const ViewReports = Loadable(
    lazy(() => import('views/reports/reportCollection/ReportsIncome'))
)
const ReportTransit = Loadable(
    lazy(() => import('views/reports/reportTransit/ReportsIncome'))
)

const ReportOperation = Loadable(
    lazy(() => import('views/reports/reportOperation/ReportsIncome'))
)

const ReportWorkShift = Loadable(
    lazy(() => import('views/reports/reportWorkShift/ReportsIncome'))
)

const TableStickyHead = Loadable(
    lazy(() => import('components/reports/reportsIncome/TableStickyHead'))
)

const Preliminary = Loadable(lazy(() => import('views/Preliminary/index')))
const CreateAccount = Loadable(
    lazy(() => import('views/account/CreateAccount'))
)
const ReadFares = Loadable(lazy(() => import('views/fares/ReadFares')))
const CreateFares = Loadable(lazy(() => import('views/fares/CreateFares')))
const EditFares = Loadable(lazy(() => import('views/fares/EditFares')))
const ReadAccount = Loadable(lazy(() => import('views/account/ReadAccount')))
const EditAccount = Loadable(lazy(() => import('views/account/EditAccount')))
const Maintenance = Loadable(lazy(() => import('views/mantenance/Maintenance')))
const ReadTolls = Loadable(lazy(() => import('views/tollSite/ReadTolls')))
const CreateToll = Loadable(lazy(() => import('views/tollSite/CreateToll')))
const EditToll = Loadable(lazy(() => import('views/tollSite/EditToll')))
const ProfileForm = Loadable(lazy(() => import('views/profile/CreateProfile')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: '/peajes/:id',
            element: <ReadTolls />,
        },
        {
            path: '/peajes/crear',
            element: <CreateToll />,
        },
        {
            path: '/peajes/editar/:id',
            element: <EditToll />,
        },
        {
            path: '/categorias',
            element: <ReadCategory />,
        },
        {
            path: '/categorias/crear',
            element: <CreateCategory />,
        },
        {
            path: '/categorias/editar/:id',
            element: <EditCategory />,
        },
        {
            path: '/tarifas',
            element: <ReadFares />,
        },
        {
            path: '/tarifas/crear',
            element: <CreateFares />,
        },
        {
            path: '/tarifas/editar/:id',
            element: <EditFares />,
        },
        {
            path: '/ventaTag',
            element: <ReadTags />,
        },
        {
            path: '/ventaTag/crear',
            element: <CreateTag />,
        },
        {
            path: '/ventaTag/editar/:id',
            element: <EditTag />,
        },
        {
            path: '/gestion-de-cuentas-usuarios',
            element: <ReadUserAccount />,
        },
        {
            path: '/gestion-de-cuentas-usuarios/crear',
            element: <CreateUserAccount />,
        },
        {
            path: '/gestion-de-cuentas-usuarios/editar/:id',
            element: <EditUserAccount />,
        },
        {
            path: '/reportes',
            element: <ViewReports />,
        },
        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/operaciones',
            element: <ReportOperation />,
        },
        {
            path: '/reportes/turnostrabajo',
            element: <ReportWorkShift />,
        },
        {
            path: '/reportes/preliminar',
            element: <Preliminary />,
        },
        {
            path: '/reportes/detallado',
            element: <TableStickyHead />,
        },
        {
            path: '/gestion-de-cuentas',
            element: <ReadAccount />,
        },
        {
            path: '/gestion-de-cuentas/crear',
            element: <CreateAccount />,
        },
        {
            path: '/gestion-de-cuentas/editar/:id',
            element: <EditAccount />,
        },

        {
            path: '/mantenimiento',
            element: <Maintenance />,
        },
        {
            path: '/profile',
            element: <ProfileForm />,
        },
    ],
}

export default MainRoutes
