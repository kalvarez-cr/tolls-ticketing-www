import { lazy } from 'react'

// project imports
import MainLayout from 'layout/MainLayout'
import Loadable from 'ui-component/Loadable'
import AuthGuard from 'utils/route-guard/AuthGuard'

//Empresas operadoras
const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')))
const ViewFares = Loadable(lazy(() => import('views/fares/ViewFares')))
const ViewReports = Loadable(lazy(() => import('views/reports/reportsIncome/ReportsIncome')))
const ViewUsers = Loadable(lazy(() => import('views/users/ViewUsers')))
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
            path: '/peajes',
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
        {
            path: '/profile',
            element: <ProfileForm />,
        },
    ],
}

export default MainRoutes
