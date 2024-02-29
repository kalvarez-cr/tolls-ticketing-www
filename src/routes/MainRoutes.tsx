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

const ReadCategorySite = Loadable(
    lazy(() => import('views/categorySite/ReadCategorySite'))
)
const CreateCategorySite = Loadable(
    lazy(() => import('views/categorySite/CreateCategorySite'))
)
const EditCategorySite = Loadable(
    lazy(() => import('views/categorySite/EditCategorySite'))
)

const ReadServices = Loadable(lazy(() => import('views/services/ReadServices')))
const CreateServices = Loadable(
    lazy(() => import('views/services/CreateServices'))
)
const EditServices = Loadable(lazy(() => import('views/services/EditServices')))

const ReadEmployee = Loadable(lazy(() => import('views/employee/ReadEmployee')))
const CreateEmployee = Loadable(
    lazy(() => import('views/employee/CreateEmployee'))
)
const EditEmployee = Loadable(lazy(() => import('views/employee/EditEmployee')))

const ReadCompany = Loadable(lazy(() => import('views/company/ReadCompany')))
const CreateCompany = Loadable(
    lazy(() => import('views/company/CreateCompany'))
)
const EditCompany = Loadable(lazy(() => import('views/company/EditCompany')))

const ReadRoads = Loadable(lazy(() => import('views/roads/ReadRoads')))
const CreateRoads = Loadable(lazy(() => import('views/roads/CreateRoads')))
const EditRoads = Loadable(lazy(() => import('views/roads/EditRoads')))

const ReadLiquidation = Loadable(
    lazy(() => import('views/liquidation/ReadLiquidation'))
)
const CreateLiquidation = Loadable(
    lazy(() => import('views/liquidation/CreateLiquidation'))
)
const EditLiquidation = Loadable(
    lazy(() => import('views/liquidation/EditLiquidation'))
)

const ReadLiquidationConcept = Loadable(
    lazy(() => import('views/liquidationConcept/ReadLiquidationConcept'))
)
const CreateLiquidationConcept = Loadable(
    lazy(() => import('views/liquidationConcept/CreateLiquidationConcept'))
)
const EditLiquidationConcept = Loadable(
    lazy(() => import('views/liquidationConcept/EditLiquidationConcept'))
)

const ReadMonitoring = Loadable(
    lazy(() => import('views/monitoring/Readmonitoring'))
)
const EditMonitoring = Loadable(
    lazy(() => import('views/monitoring/EditMonitoring'))
)

const ReadBlacklistCriterial = Loadable(
    lazy(() => import('views/blacklistCriterial/ReadBlacklistCriterial'))
)
const CreateBlacklistCriterial = Loadable(
    lazy(() => import('views/blacklistCriterial/CreateBlacklistCriterial'))
)
const EditBlacklistCriterial = Loadable(
    lazy(() => import('views/blacklistCriterial/EditBlacklistCriterial'))
)

const ReadVehicleBlacklistCriterial = Loadable(
    lazy(() => import('views/vehicleBlacklist/ReadVehicleBlacklistCriterial'))
)
const CreateVehicleBlacklistCriterial = Loadable(
    lazy(() => import('views/vehicleBlacklist/CreateVehicleBlacklistCriterial'))
)
const EditVehicleBlacklistCriterial = Loadable(
    lazy(() => import('views/vehicleBlacklist/EditVehicleBlacklistCriterial'))
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
const ReportConsolidateToll = Loadable(
    lazy(() => import('views/reports/reportConsolidateToll/ReportsIncome'))
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

const ReportConsolidateTag = Loadable(
    lazy(
        () => import('views/reports/reportConsolidateTag/ReportsIncome')
    )
)
const ReportDetailTag = Loadable(
    lazy(
        () => import('views/reports/reportDetailsTag/ReportsIncome')
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
const ReportTransit2 = Loadable(
    lazy(() => import('views/reports/reportTransit2/ReportsIncome'))
)

const ReportOperation = Loadable(
    lazy(() => import('views/reports/reportOperation/ReportsIncome'))
)

const ReportWorkShift = Loadable(
    lazy(() => import('views/reports/reportWorkShift/ReportsIncome'))
)
const ReportLiquidationWorkShift = Loadable(
    lazy(() => import('views/reports/reportLiquidationWorkShift/ReportsIncome'))
)

const ReportLiquidationDetailWorkShift = Loadable(
    lazy(() => import('views/reports/reportLiquidationDetailWorkShift/ReportsIncome'))
)

const ReportLiquidationSite = Loadable(
    lazy(() => import('views/reports/reportLiquidationSite/ReportsIncome'))
)
const ReportForTime = Loadable(
    lazy(() => import('views/reports/reportForTime/ReportsIncome'))
)
const ReportOpenShift = Loadable(
    lazy(() => import('views/reports/reportOpenShift/ReportsIncome'))
)
const ReportPerChannel = Loadable(
    lazy(() => import('views/reports/reportPerChannel/ReportsIncome'))
)
const ReportPerOperator = Loadable(
    lazy(() => import('views/reports/reportPerOperator/ReportsIncome'))
)
const ReportPerPaymentMethod = Loadable(
    lazy(() => import('views/reports/reportPerPaymentMethod/ReportsIncome'))
)
const TableCollection = Loadable(
    lazy(() => import('views/reports/reportCollectionLane/TableDetails'))
)
const TableTransit = Loadable(
    lazy(() => import('views/reports/reportTransit/TableDetails'))
)
const TableTransit2 = Loadable(
    lazy(() => import('views/reports/reportTransit2/TableDetails'))
)

const TableOperation = Loadable(
    lazy(() => import('views/reports/reportOperation/TableDetails'))
)

const TableWorkShift = Loadable(
    lazy(() => import('views/reports/reportWorkShift/TableDetails'))
)

const TableDetailWorkShift = Loadable(
    lazy(() => import('views/reports/reportLiquidationDetailWorkShift/TableDetails'))
)

const TableLiquidationWorkShift = Loadable(
    lazy(() => import('views/reports/reportLiquidationWorkShift/TableDetails'))
)

const TableConsolidateGeneric = Loadable(
    lazy(() => import('views/reports/reportConsolidateGeneric/TableDetails'))
)
const TableConsolidateToll = Loadable(
    lazy(() => import('views/reports/reportConsolidateToll/TableDetails'))
)

const TableConsolidateTag = Loadable(
    lazy(() => import('views/reports/reportConsolidateTag/TableDetails'))
)
const TableDetailTag = Loadable(
    lazy(() => import('views/reports/reportDetailsTag/TableDetails'))
)
const TableOpenShift = Loadable(
    lazy(() => import('views/reports/reportOpenShift/TableDetails'))
)
const TableLiquidationSite = Loadable(
    lazy(() => import('views/reports/reportLiquidationSite/TableDetails'))
)

const TimeAnalysisChart = Loadable(
    lazy(() => import('views/reports/reportForTime/ChartDetails'))
)

const ChannelChart = Loadable(
    lazy(() => import('views/reports/reportPerChannel/ChartDetails'))
)
const OperatorChart = Loadable(
    lazy(() => import('views/reports/reportPerOperator/ChartDetails'))
)
const PaymentMethodChart = Loadable(
    lazy(() => import('views/reports/reportPerPaymentMethod/ChartDetails'))
)

const Preliminary = Loadable(lazy(() => import('views/Preliminary/index')))
const CreateAccount = Loadable(
    lazy(() => import('views/account/CreateAccount'))
)

const ReadTagList = Loadable(lazy(() => import('views/taglist/ReadTagList')))
const CreateTagList = Loadable(
    lazy(() => import('views/taglist/CreateTagList'))
)
const EditTagList = Loadable(lazy(() => import('views/taglist/EditTagList')))

const ReadPayments = Loadable(lazy(() => import('views/payments/ReadPayments')))
const CreatePayments = Loadable(
    lazy(() => import('views/payments/CreatePayments'))
)
const EditPayments = Loadable(lazy(() => import('views/payments/EditPayments')))

// const ReadHistory = Loadable(lazy(() => import('views/history/ReadHistory')))

const ReportTransitDetailed = Loadable(
    lazy(() => import('views/reports/reportTransitConsolidate/ReportsIncome'))
)
const TableTransitDetailed = Loadable(
    lazy(() => import('views/reports/reportTransitConsolidate/TableDetails'))
)

const ReportConsolidatedOperatorTurn = Loadable(
    lazy(() => import('views/reports/reportConsolidateOperatorTurn/ReportsIncome'))
)
const TableConsolidatedOperatorTurn = Loadable(
    lazy(() => import('views/reports/reportConsolidateOperatorTurn/TableDetails'))
)

const ReportConsolidatedTollTurn = Loadable(
    lazy(() => import('views/reports/reportConsolidateTollTurn/ReportsIncome'))
)
const TableConsolidatedTollTurn = Loadable(
    lazy(() => import('views/reports/reportConsolidateTollTurn/TableDetails'))
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
const ReadAudit = Loadable(lazy(() => import('views/audit/ReadAudit')))
const EditAudit = Loadable(lazy(() => import('views/audit/EditAudit')))

const FareChange = Loadable(lazy(() => import('views/fareChange/EditFareChange')))

// ==============================|| MAIN ROUTING ||============================== //
export const defaultRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [],
}
export const accountManagerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
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
            path: '/profile',
            element: <ProfileForm />,
        },
    ],
}

export const adminRoutes = {
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
            path: '/empresas',
            element: <ReadCompany />,
        },
        {
            path: '/empresas/crear',
            element: <CreateCompany />,
        },
        {
            path: '/empresas/editar/:id',
            element: <EditCompany />,
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
            path: '/reportes/consolidado-peaje',
            element: <ReportConsolidateToll />,
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
            path: '/reportes/consolidado-tag',
            element: <ReportConsolidateTag />,
        },
        {
            path: '/reportes/detalle-tag',
            element: <ReportDetailTag />,
        },
        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
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
            path: '/reportes/liquidacion-turnostrabajo',
            element: <ReportLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-turnostrabajo-detallado',
            element: <ReportLiquidationDetailWorkShift />,
        }, 
        {
            path: '/reportes/liquidacion-peaje',
            element: <ReportLiquidationSite />,
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
            path: '/reportes/analisis-canal',
            element: <ReportPerChannel />,
        },
        {
            path: '/reportes/analisis-operador',
            element: <ReportPerOperator />,
        },
        {
            path: '/reportes/analisis-pago',
            element: <ReportPerPaymentMethod />,
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
            path: '/reportes/consolidado-peaje/detallado',
            element: <TableConsolidateToll />,
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
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
        },
        {
            path: '/reportes/operaciones/detallado',
            element: <TableOperation />,
        },
        {
            path: '/reportes/consolidado/tag',
            element: <TableConsolidateTag />,
        },
        {
            path: '/reportes/detallado/tag',
            element: <TableDetailTag />,
        },
        {
            path: '/reportes/trabajo/detallado',
            element: <TableWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo/detallado',
            element: <TableLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reporte/liquidacionpeaje/detallado',
            element: <TableLiquidationSite />,
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
            path: '/reportes/analisis-canal/detallado',
            element: <ChannelChart />,
        },
        {
            path: '/reportes/analisis-operador/detallado',
            element: <OperatorChart />,
        },
        {
            path: '/reportes/analisis-pago/detallado',
            element: <PaymentMethodChart />,
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
        {
            path: '/categorias-de-peaje',
            element: <ReadCategorySite />,
        },
        {
            path: '/categorias-de-peaje/crear',
            element: <CreateCategorySite />,
        },
        {
            path: '/categorias-de-peaje/editar/:id',
            element: <EditCategorySite />,
        },
        {
            path: '/servicios',
            element: <ReadServices />,
        },
        {
            path: '/servicios/crear',
            element: <CreateServices />,
        },
        {
            path: '/servicios/editar/:id',
            element: <EditServices />,
        },
        {
            path: '/vias',
            element: <ReadRoads />,
        },
        {
            path: '/vias/crear',
            element: <CreateRoads />,
        },
        {
            path: '/vias/editar/:id',
            element: <EditRoads />,
        },
        {
            path: '/taglist',
            element: <ReadTagList />,
        },
        {
            path: '/taglist/crear',
            element: <CreateTagList />,
        },
        {
            path: '/taglist/editar/:id',
            element: <EditTagList />,
        },
        {
            path: '/taglist-vehicles',
            element: <ReadVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/crear',
            element: <CreateVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/editar/:id',
            element: <EditVehicleBlacklistCriterial />,
        },
        {
            path: '/blacklist',
            element: <ReadBlacklistCriterial />,
        },
        {
            path: '/blacklist/crear',
            element: <CreateBlacklistCriterial />,
        },
        {
            path: '/blacklist/editar/:id',
            element: <EditBlacklistCriterial />,
        },
        {
            path: '/liquidacion',
            element: <ReadLiquidation />,
        },
        {
            path: '/liquidacion/crear',
            element: <CreateLiquidation />,
        },
        {
            path: '/liquidacion/editar/:id',
            element: <EditLiquidation />,
        },
        {
            path: '/pagos',
            element: <ReadPayments />,
        },
        {
            path: '/pagos/crear',
            element: <CreatePayments />,
        },
        {
            path: '/pagos/editar/:id',
            element: <EditPayments />,
        },
        {
            path: '/liquidaciones',
            element: <ReadLiquidationConcept />,
        },
        {
            path: '/liquidaciones/crear',
            element: <CreateLiquidationConcept />,
        },
        {
            path: '/liquidaciones/editar/:id',
            element: <EditLiquidationConcept />,
        },
        {
            path: '/audit',
            element: <ReadAudit />,
        },
        {
            path: '/audit/:id',
            element: <EditAudit />,
        },
        // {
        //     path: '/history',
        //     element: <ReadHistory />,
        // },
        {
            path: '/reportes/transit-detailed',
            element: <ReportTransitDetailed />,
        },
        {
            path: '/reportes/transit-detailed/tabla',
            element: <TableTransitDetailed />,
        },
        {
            path: '/reportes/consolidado-operador-turno',
            element: <ReportConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-operador-turno/tabla',
            element: <TableConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno',
            element: <ReportConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno/tabla',
            element: <TableConsolidatedTollTurn />,
        },


        
    ],
}
export const adminGeneralRoutes = {
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
            path: '/empresas',
            element: <ReadCompany />,
        },
        {
            path: '/empresas/crear',
            element: <CreateCompany />,
        },
        {
            path: '/empresas/editar/:id',
            element: <EditCompany />,
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
            path: '/reportes/consolidado-peaje',
            element: <ReportConsolidateToll />,
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
            path: '/reportes/consolidado-tag',
            element: <ReportConsolidateTag />,
        },
        {
            path: '/reportes/detalle-tag',
            element: <ReportDetailTag />,
        },
        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
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
            path: '/reportes/liquidacion-turnostrabajo',
            element: <ReportLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-turnostrabajo-detallado',
            element: <ReportLiquidationDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-peaje',
            element: <ReportLiquidationSite />,
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
            path: '/reportes/analisis-canal',
            element: <ReportPerChannel />,
        },
        {
            path: '/reportes/analisis-operador',
            element: <ReportPerOperator />,
        },
        {
            path: '/reportes/analisis-pago',
            element: <ReportPerPaymentMethod />,
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
            path: '/reportes/consolidado-peaje/detallado',
            element: <TableConsolidateToll />,
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
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
        },
        {
            path: '/reportes/operaciones/detallado',
            element: <TableOperation />,
        },
        {
            path: '/reportes/consolidado/tag',
            element: <TableConsolidateTag />,
        },
        {
            path: '/reportes/detallado/tag',
            element: <TableDetailTag />,
        },
        {
            path: '/reportes/trabajo/detallado',
            element: <TableWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo/detallado',
            element: <TableLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidacionpeaje/detallado',
            element: <TableLiquidationSite />,
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
            path: '/reportes/analisis-canal/detallado',
            element: <ChannelChart />,
        },
        {
            path: '/reportes/analisis-operador/detallado',
            element: <OperatorChart />,
        },
        {
            path: '/reportes/analisis-pago/detallado',
            element: <PaymentMethodChart />,
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
        {
            path: '/categorias-de-peaje',
            element: <ReadCategorySite />,
        },
        {
            path: '/categorias-de-peaje/crear',
            element: <CreateCategorySite />,
        },
        {
            path: '/categorias-de-peaje/editar/:id',
            element: <EditCategorySite />,
        },
        {
            path: '/servicios',
            element: <ReadServices />,
        },
        {
            path: '/servicios/crear',
            element: <CreateServices />,
        },
        {
            path: '/servicios/editar/:id',
            element: <EditServices />,
        },
        {
            path: '/vias',
            element: <ReadRoads />,
        },
        {
            path: '/vias/crear',
            element: <CreateRoads />,
        },
        {
            path: '/vias/editar/:id',
            element: <EditRoads />,
        },
        {
            path: '/taglist',
            element: <ReadTagList />,
        },
        {
            path: '/taglist/crear',
            element: <CreateTagList />,
        },
        {
            path: '/taglist/editar/:id',
            element: <EditTagList />,
        },
        {
            path: '/taglist-vehicles',
            element: <ReadVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/crear',
            element: <CreateVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/editar/:id',
            element: <EditVehicleBlacklistCriterial />,
        },
        {
            path: '/blacklist',
            element: <ReadBlacklistCriterial />,
        },
        {
            path: '/blacklist/crear',
            element: <CreateBlacklistCriterial />,
        },
        {
            path: '/blacklist/editar/:id',
            element: <EditBlacklistCriterial />,
        },
        {
            path: '/liquidacion',
            element: <ReadLiquidation />,
        },
        {
            path: '/liquidacion/crear',
            element: <CreateLiquidation />,
        },
        {
            path: '/liquidacion/editar/:id',
            element: <EditLiquidation />,
        },
        {
            path: '/pagos',
            element: <ReadPayments />,
        },
        {
            path: '/pagos/crear',
            element: <CreatePayments />,
        },
        {
            path: '/pagos/editar/:id',
            element: <EditPayments />,
        },
        {
            path: '/liquidaciones',
            element: <ReadLiquidationConcept />,
        },
        {
            path: '/liquidaciones/crear',
            element: <CreateLiquidationConcept />,
        },
        {
            path: '/liquidaciones/editar/:id',
            element: <EditLiquidationConcept />,
        },
        {
            path: '/audit',
            element: <ReadAudit />,
        },
        {
            path: '/audit/:id',
            element: <EditAudit />,
        },
        // {
        //     path: '/history',
        //     element: <ReadHistory />,
        // },
        {
            path: '/reportes/transit-detailed',
            element: <ReportTransitDetailed />,
        },
        {
            path: '/reportes/transit-detailed/tabla',
            element: <TableTransitDetailed />,
        },
        {
            path: '/reportes/consolidado-operador-turno',
            element: <ReportConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-operador-turno/tabla',
            element: <TableConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno',
            element: <ReportConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno/tabla',
            element: <TableConsolidatedTollTurn />,
        },
        {
            path: '/fare-change',
            element: <FareChange />,
        },


       
        
    ],
}

export const crmUserRoutes = {
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
            path: '/empresas',
            element: <ReadCompany />,
        },
        {
            path: '/empresas/crear',
            element: <CreateCompany />,
        },
        {
            path: '/empresas/editar/:id',
            element: <EditCompany />,
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
            path: '/reportes/consolidado-peaje',
            element: <ReportConsolidateToll />,
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
            path: '/reportes/consolidado-tag',
            element: <ReportConsolidateTag />,
        },
        {
            path: '/reportes/detalle-tag',
            element: <ReportDetailTag />,
        },
        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
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
            path: '/reportes/liquidacion-turnostrabajo',
            element: <ReportLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-turnostrabajo-detallado',
            element: <ReportLiquidationDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-peaje',
            element: <ReportLiquidationSite />,
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
            path: '/reportes/analisis-canal',
            element: <ReportPerChannel />,
        },
        {
            path: '/reportes/analisis-operador',
            element: <ReportPerOperator />,
        },
        {
            path: '/reportes/analisis-pago',
            element: <ReportPerPaymentMethod />,
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
            path: '/reportes/consolidado-peaje/detallado',
            element: <TableConsolidateToll />,
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
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
        },
        {
            path: '/reportes/operaciones/detallado',
            element: <TableOperation />,
        },
        {
            path: '/reportes/consolidado/tag',
            element: <TableConsolidateTag />,
        },
        {
            path: '/reportes/detallado/tag',
            element: <TableDetailTag />,
        },
        {
            path: '/reportes/trabajo/detallado',
            element: <TableWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo/detallado',
            element: <TableLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidacionpeaje/detallado',
            element: <TableLiquidationSite />,
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
            path: '/reportes/analisis-canal/detallado',
            element: <ChannelChart />,
        },
        {
            path: '/reportes/analisis-operador/detallado',
            element: <OperatorChart />,
        },
        {
            path: '/reportes/analisis-pago/detallado',
            element: <PaymentMethodChart />,
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
        // {
        //     path: '/categorias-de-peaje',
        //     element: <ReadCategorySite />,
        // },
        // {
        //     path: '/categorias-de-peaje/crear',
        //     element: <CreateCategorySite />,
        // },
        // {
        //     path: '/categorias-de-peaje/editar/:id',
        //     element: <EditCategorySite />,
        // },
        // {
        //     path: '/servicios',
        //     element: <ReadServices />,
        // },
        // {
        //     path: '/servicios/crear',
        //     element: <CreateServices />,
        // },
        // {
        //     path: '/servicios/editar/:id',
        //     element: <EditServices />,
        // },
        // {
        //     path: '/vias',
        //     element: <ReadRoads />,
        // },
        // {
        //     path: '/vias/crear',
        //     element: <CreateRoads />,
        // },
        // {
        //     path: '/vias/editar/:id',
        //     element: <EditRoads />,
        // },
        {
            path: '/taglist',
            element: <ReadTagList />,
        },
        {
            path: '/taglist/crear',
            element: <CreateTagList />,
        },
        {
            path: '/taglist/editar/:id',
            element: <EditTagList />,
        },
        {
            path: '/taglist-vehicles',
            element: <ReadVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/crear',
            element: <CreateVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/editar/:id',
            element: <EditVehicleBlacklistCriterial />,
        },
        {
            path: '/blacklist',
            element: <ReadBlacklistCriterial />,
        },
        {
            path: '/blacklist/crear',
            element: <CreateBlacklistCriterial />,
        },
        {
            path: '/blacklist/editar/:id',
            element: <EditBlacklistCriterial />,
        },
        {
            path: '/liquidacion',
            element: <ReadLiquidation />,
        },
        {
            path: '/liquidacion/crear',
            element: <CreateLiquidation />,
        },
        {
            path: '/liquidacion/editar/:id',
            element: <EditLiquidation />,
        },
        // {
        //     path: '/pagos',
        //     element: <ReadPayments />,
        // },
        // {
        //     path: '/pagos/crear',
        //     element: <CreatePayments />,
        // },
        // {
        //     path: '/pagos/editar/:id',
        //     element: <EditPayments />,
        // },
        // {
        //     path: '/liquidaciones',
        //     element: <ReadLiquidationConcept />,
        // },
        // {
        //     path: '/liquidaciones/crear',
        //     element: <CreateLiquidationConcept />,
        // },
        // {
        //     path: '/liquidaciones/editar/:id',
        //     element: <EditLiquidationConcept />,
        // },
        {
            path: '/audit',
            element: <ReadAudit />,
        },
        {
            path: '/audit/:id',
            element: <EditAudit />,
        },
        // {
        //     path: '/history',
        //     element: <ReadHistory />,
        // },
        {
            path: '/reportes/transit-detailed',
            element: <ReportTransitDetailed />,
        },
        {
            path: '/reportes/transit-detailed/tabla',
            element: <TableTransitDetailed />,
        },
        {
            path: '/reportes/consolidado-operador-turno',
            element: <ReportConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-operador-turno/tabla',
            element: <TableConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno',
            element: <ReportConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno/tabla',
            element: <TableConsolidatedTollTurn />,
        },
    ],
}


export const visualizerRoutes = {
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
            path: '/empresas',
            element: <ReadCompany />,
        },
        {
            path: '/empresas/crear',
            element: <CreateCompany />,
        },
        {
            path: '/empresas/editar/:id',
            element: <EditCompany />,
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
            path: '/reportes/consolidado-peaje',
            element: <ReportConsolidateToll />,
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
            path: '/reportes/consolidado-tag',
            element: <ReportConsolidateTag />,
        },
        {
            path: '/reportes/detalle-tag',
            element: <ReportDetailTag />,
        },
        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
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
            path: '/reportes/liquidacion-turnostrabajo',
            element: <ReportLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-turnostrabajo-detallado',
            element: <ReportLiquidationDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-peaje',
            element: <ReportLiquidationSite />,
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
            path: '/reportes/analisis-canal',
            element: <ReportPerChannel />,
        },
        {
            path: '/reportes/analisis-operador',
            element: <ReportPerOperator />,
        },
        {
            path: '/reportes/analisis-pago',
            element: <ReportPerPaymentMethod />,
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
            path: '/reportes/consolidado-peaje/detallado',
            element: <TableConsolidateToll />,
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
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
        },
        {
            path: '/reportes/operaciones/detallado',
            element: <TableOperation />,
        },
        {
            path: '/reportes/consolidado/tag',
            element: <TableConsolidateTag />,
        },
        {
            path: '/reportes/detallado/tag',
            element: <TableDetailTag />,
        },
        {
            path: '/reportes/trabajo/detallado',
            element: <TableWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo/detallado',
            element: <TableLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidacionpeaje/detallado',
            element: <TableLiquidationSite />,
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
            path: '/reportes/analisis-canal/detallado',
            element: <ChannelChart />,
        },
        {
            path: '/reportes/analisis-operador/detallado',
            element: <OperatorChart />,
        },
        {
            path: '/reportes/analisis-pago/detallado',
            element: <PaymentMethodChart />,
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
        {
            path: '/categorias-de-peaje',
            element: <ReadCategorySite />,
        },
        {
            path: '/categorias-de-peaje/crear',
            element: <CreateCategorySite />,
        },
        {
            path: '/categorias-de-peaje/editar/:id',
            element: <EditCategorySite />,
        },
        {
            path: '/servicios',
            element: <ReadServices />,
        },
        {
            path: '/servicios/crear',
            element: <CreateServices />,
        },
        {
            path: '/servicios/editar/:id',
            element: <EditServices />,
        },
        {
            path: '/vias',
            element: <ReadRoads />,
        },
        {
            path: '/vias/crear',
            element: <CreateRoads />,
        },
        {
            path: '/vias/editar/:id',
            element: <EditRoads />,
        },
        {
            path: '/taglist',
            element: <ReadTagList />,
        },
        {
            path: '/taglist/crear',
            element: <CreateTagList />,
        },
        {
            path: '/taglist/editar/:id',
            element: <EditTagList />,
        },
        {
            path: '/taglist-vehicles',
            element: <ReadVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/crear',
            element: <CreateVehicleBlacklistCriterial />,
        },
        {
            path: '/taglist-vehicles/editar/:id',
            element: <EditVehicleBlacklistCriterial />,
        },
        {
            path: '/blacklist',
            element: <ReadBlacklistCriterial />,
        },
        {
            path: '/blacklist/crear',
            element: <CreateBlacklistCriterial />,
        },
        {
            path: '/blacklist/editar/:id',
            element: <EditBlacklistCriterial />,
        },
        {
            path: '/liquidacion',
            element: <ReadLiquidation />,
        },
        {
            path: '/liquidacion/crear',
            element: <CreateLiquidation />,
        },
        {
            path: '/liquidacion/editar/:id',
            element: <EditLiquidation />,
        },
        {
            path: '/pagos',
            element: <ReadPayments />,
        },
        {
            path: '/pagos/crear',
            element: <CreatePayments />,
        },
        {
            path: '/pagos/editar/:id',
            element: <EditPayments />,
        },
        {
            path: '/liquidaciones',
            element: <ReadLiquidationConcept />,
        },
        {
            path: '/liquidaciones/crear',
            element: <CreateLiquidationConcept />,
        },
        {
            path: '/liquidaciones/editar/:id',
            element: <EditLiquidationConcept />,
        },
        {
            path: '/audit',
            element: <ReadAudit />,
        },
        {
            path: '/audit/:id',
            element: <EditAudit />,
        },
        {
            path: '/reportes/transit-detailed',
            element: <ReportTransitDetailed />,
        },
        {
            path: '/reportes/transit-detailed/tabla',
            element: <TableTransitDetailed />,
        },
        {
            path: '/reportes/consolidado-operador-turno',
            element: <ReportConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-operador-turno/tabla',
            element: <TableConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno',
            element: <ReportConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno/tabla',
            element: <TableConsolidatedTollTurn />,
        },
    ],
}

export const ReportViewerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        
        {
            path: '/monitoring',
            element: <ReadMonitoring />,
        },
        {
            path: '/monitoring/editar/:id',
            element: <EditMonitoring />,
        },
        {
            path: '/reportes/consolidado-general',
            element: <ReportConsolidateGeneric />,
        },
        {
            path: '/reportes/consolidado-peaje',
            element: <ReportConsolidateToll />,
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
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
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
            path: '/reportes/liquidacion-turnostrabajo',
            element: <ReportLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-turnostrabajo-detallado',
            element: <ReportLiquidationDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-peaje',
            element: <ReportLiquidationSite />,
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
            path: '/reportes/analisis-canal',
            element: <ReportPerChannel />,
        },
        {
            path: '/reportes/analisis-operador',
            element: <ReportPerOperator />,
        },
        {
            path: '/reportes/analisis-pago',
            element: <ReportPerPaymentMethod />,
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
            path: '/reportes/consolidado-peaje/detallado',
            element: <TableConsolidateToll />,
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
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
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
            path: '/reporte/liquidaciontrabajo/detallado',
            element: <TableLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidacionpeaje/detallado',
            element: <TableLiquidationSite />,
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
            path: '/reportes/analisis-canal/detallado',
            element: <ChannelChart />,
        },
        {
            path: '/reportes/analisis-operador/detallado',
            element: <OperatorChart />,
        },
        {
            path: '/reportes/analisis-pago/detallado',
            element: <PaymentMethodChart />,
        },
        {
            path: '/profile',
            element: <ProfileForm />,
        },
        {
            path: '/reportes/transit-detailed',
            element: <ReportTransitDetailed />,
        },
        {
            path: '/reportes/transit-detailed/tabla',
            element: <TableTransitDetailed />,
        },
        {
            path: '/reportes/consolidado-operador-turno',
            element: <ReportConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-operador-turno/tabla',
            element: <TableConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno',
            element: <ReportConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno/tabla',
            element: <TableConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-general',
            element: <ReportConsolidateGeneric />,
        },
        {
            path: '/reportes/consolidado-peaje',
            element: <ReportConsolidateToll />,
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
            path: '/reportes/consolidado-tag',
            element: <ReportConsolidateTag />,
        },
        {
            path: '/reportes/detalle-tag',
            element: <ReportDetailTag />,
        },
        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
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
            path: '/reportes/liquidacion-turnostrabajo',
            element: <ReportLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo-horas/detallado',
            element: <TableDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-turnostrabajo-detallado',
            element: <ReportLiquidationDetailWorkShift />,
        },
        {
            path: '/reportes/liquidacion-peaje',
            element: <ReportLiquidationSite />,
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
            path: '/reportes/analisis-canal',
            element: <ReportPerChannel />,
        },
        {
            path: '/reportes/analisis-operador',
            element: <ReportPerOperator />,
        },
        {
            path: '/reportes/analisis-pago',
            element: <ReportPerPaymentMethod />,
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
            path: '/reportes/consolidado-peaje/detallado',
            element: <TableConsolidateToll />,
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
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
        },
        {
            path: '/reportes/operaciones/detallado',
            element: <TableOperation />,
        },
        {
            path: '/reportes/consolidado/tag',
            element: <TableConsolidateTag />,
        },
        {
            path: '/reportes/detallado/tag',
            element: <TableDetailTag />,
        },
        {
            path: '/reportes/trabajo/detallado',
            element: <TableWorkShift />,
        },
        {
            path: '/reporte/liquidaciontrabajo/detallado',
            element: <TableLiquidationWorkShift />,
        },
        {
            path: '/reporte/liquidacionpeaje/detallado',
            element: <TableLiquidationSite />,
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
            path: '/reportes/analisis-canal/detallado',
            element: <ChannelChart />,
        },
        {
            path: '/reportes/analisis-operador/detallado',
            element: <OperatorChart />,
        },
        {
            path: '/reportes/analisis-pago/detallado',
            element: <PaymentMethodChart />,
        },
        {
            path: '/reportes/transit-detailed',
            element: <ReportTransitDetailed />,
        },
        {
            path: '/reportes/transit-detailed/tabla',
            element: <TableTransitDetailed />,
        },
        {
            path: '/reportes/consolidado-operador-turno',
            element: <ReportConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-operador-turno/tabla',
            element: <TableConsolidatedOperatorTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno',
            element: <ReportConsolidatedTollTurn />,
        },
        {
            path: '/reportes/consolidado-peaje-turno/tabla',
            element: <TableConsolidatedTollTurn />,
        },

    ],
}

export const MonitorViewerRoutes = {
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
            path: '/monitoring',
            element: <ReadMonitoring />,
        },
        {
            path: '/monitoring/editar/:id',
            element: <EditMonitoring />,
        },

        {
            path: '/reportes/transito',
            element: <ReportTransit />,
        },
        {
            path: '/reportes/transito2',
            element: <ReportTransit2 />,
        },

        {
            path: '/reportes/transito/detallado',
            element: <TableTransit />,
        },
        {
            path: '/reportes/transito2/detallado',
            element: <TableTransit2 />,
        },

        {
            path: '/profile',
            element: <ProfileForm />,
        },
    ],
}
