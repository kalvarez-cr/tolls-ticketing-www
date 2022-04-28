// material-ui

import { useTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

// project imports
import TotalRevenueCard from './TotalRevenueCard'
import LatestCustomerTableCard from './LatestCustomerTableCard'

import RevenueCard from 'ui-component/cards/RevenueCard'
import { gridSpacing } from 'store/constant'

// assets

import ErrorIcon from '@mui/icons-material/Error'
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone'
import CustomerSatisfactionCard from './CustomerSatisfactionCard'

// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = () => {
    const theme = useTheme()

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={8} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={6}>
                        <RevenueCard
                            primary="Recolectado"
                            secondary="50.03"
                            content="52.03 último mes"
                            iconPrimary={ErrorIcon}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <RevenueCard
                            primary="Operaciones"
                            secondary="48"
                            content="70 último mes"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LatestCustomerTableCard title="Resumen" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} md={8}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CustomerSatisfactionCard />
                    </Grid>
                    <Grid item xs={12}>
                        <TotalRevenueCard title="Categorías" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Analytics
