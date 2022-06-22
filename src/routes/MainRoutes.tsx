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

const ReadEmployee = Loadable(lazy(() => import('views/employee/ReadEmployee')))
const CreateEmployee = Loadable(
    lazy(() => import('views/employee/CreateEmployee'))
)
const EditEmployee = Loadable(lazy(() => import('views/employee/EditEmployee')))
const ReadMonitoring = Loadable(
    lazy(() => import('views/monitoring/Readmonitoring'))
)
const EditMonitoring = Loadable(
    lazy(() => import('views/monitoring/EditMonitoring'))
)

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
const ReportConsolidateGeneric = Loadable(
    lazy(() => import('views/reports/reportConsolidateGeneric/ReportsIncome'))
)
const ReportConsolidatePay = Loadable(
    lazy(() => import('views/reports/reportConsolidatePay/ReportsIncome'))
)
const ReportConsolidateCategory = Loadable(
    lazy(() => import('views/reports/reportConsolidateCategory/ReportsIncome'))
)
const ReportConsolidateCategoryPay = Loadable(
    lazy(
        () => import('views/reports/reportConsolidateCategoryPay/ReportsIncome')
    )
)
const ReportConsolidateCategoryCategory = Loadable(
    lazy(
        () =>
            import(
                'views/reports/reportConsolidateCategoryCategory/ReportsIncome'
            )
    )
)
const ReportConsolidateOperator = Loadable(
    lazy(() => import('views/reports/reportConsolidateOperator/ReportsIncome'))
)

const ReportCollectionLane = Loadable(
    lazy(() => import('views/reports/reportCollectionLane/ReportsIncome'))
)
const ReportCollectionPay = Loadable(
    lazy(() => import('views/reports/reportCollectionPay/ReportsIncome'))
)
const ReportCollectionOperator = Loadable(
    lazy(() => import('views/reports/reportCollectionOperator/ReportsIncome'))
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

const ReportForTime = Loadable(
    lazy(() => import('views/reports/reportForTime/ReportsIncome'))
)
const ReportOpenShift = Loadable(
    lazy(() => import('views/reports/reportOpenShift/ReportsIncome'))
)
const TableCollection = Loadable(
    lazy(() => import('views/reports/reportCollectionLane/TableDetails'))
)
const TableTransit = Loadable(
    lazy(() => import('views/reports/reportTransit/TableDetails'))
)

const TableOperation = Loadable(
    lazy(() => import('views/reports/reportOperation/TableDetails'))
)

const TableWorkShift = Loadable(
    lazy(() => import('views/reports/reportWorkShift/TableDetails'))
)

const TableConsolidateGeneric = Loadable(
    lazy(() => import('views/reports/reportConsolidateGeneric/TableDetails'))
)
const TableOpenShift = Loadable(
    lazy(() => import('views/reports/reportOpenShift/TableDetails'))
)

const TimeAnalysisChart = Loadable(
    lazy(() => import('views/reports/reportForTime/ChartDetails'))
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
            path: '/empleados',
            element: <ReadEmployee />,
        },
        {
            path: '/empleados/crear',
            element: <CreateEmployee />,
        },
        {
            path: '/empleados/editar/:id',
            element: <EditEmployee />,
        },
        {
            path: '/monitoring',
            element: <ReadMonitoring />,
        },
        {
            path: '/monitoring/editar/:id',
            element: <EditMonitoring />,
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
            path: '/reportes/consolidado-general',
            element: <ReportConsolidateGeneric />,
        },
        {
            path: '/reportes/consolidado-pago',
            element: <ReportConsolidatePay />,
        },
        {
            path: '/reportes/consolidado-categorias',
            element: <ReportConsolidateCategory />,
        },
        {
            path: '/reportes/consolidado-categorias-pay',
            element: <ReportConsolidateCategoryPay />,
        },
        {
            path: '/reportes/consolidado-categoria',
            element: <ReportConsolidateCategoryCategory />,
        },
        {
            path: '/reportes/consolidado-operador',
            element: <ReportConsolidateOperator />,
        },
        {
            path: '/reportes/recaudacion-canales',
            element: <ReportCollectionLane />,
        },
        {
            path: '/reportes/recaudacion-pago',
            element: <ReportCollectionPay />,
        },
        {
            path: '/reportes/recaudacion-operador',
            element: <ReportCollectionOperator />,
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
            path: '/reportes/temporal',
            element: <ReportForTime />,
        },
        {
            path: '/reportes/open',
            element: <ReportOpenShift />,
        },
        {
            path: '/reportes/preliminar',
            element: <Preliminary />,
        },
        {
            path: '/reportes/consolidado-generico/detallado',
            element: <TableConsolidateGeneric />,
        },
        {
            path: '/reportes/recudacion/detallado',
            element: <TableCollection />,
        },
        {
            path: '/reportes/transito/detallado',
            element: <TableTransit />,
        },
        {
            path: '/reportes/operaciones/detallado',
            element: <TableOperation />,
        },
        {
            path: '/reportes/trabajo/detallado',
            element: <TableWorkShift />,
        },
        {
            path: '/reportes/open-shift/detallado',
            element: <TableOpenShift />,
        },
        {
            path: '/reportes/temporal/detallado',
            element: <TimeAnalysisChart />,
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
