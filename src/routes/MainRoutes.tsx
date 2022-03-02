import { lazy } from 'react'

// project imports
import MainLayout from 'layout/MainLayout'
import Loadable from 'ui-component/Loadable'
import AuthGuard from 'utils/route-guard/AuthGuard'

//Empresas operadoras
const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')))
const ViewTollSite = Loadable(lazy(() => import('views/tollSite/ViewTollSite')))
const ViewFares = Loadable(lazy(() => import('views/fares/ViewFares')))
const ViewReports = Loadable(lazy(() => import('views/reports/ViewReports')))
const ViewUsers = Loadable(lazy(() => import('views/users/ViewUsers')))
const Maintenance = Loadable(lazy(() => import('views/mantenance/Maintenance')))

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
            path: '/peajes',
            element: <ViewTollSite />,
        },
        {
            path: '/tarifas',
            element: <ViewFares />,
        },
        {
            path: '/reportes',
            element: <ViewReports />,
        },
        {
            path: '/gestion-de-cuentas',
            element: <ViewUsers />,
        },
        {
            path: '/mantenimiento',
            element: <Maintenance />,
        },
    ],
}

export default MainRoutes
