// material-ui
import { Grid, Typography } from '@material-ui/core'

// project imports
import MainCard from 'ui-component/cards/MainCard'
// import { gridSpacing } from 'store/constant'

// ===========================|| WIDGET STATISTICS - CUSTOMER SATISFACTION ||=========================== //

const CustomerSatisfactionCard = () => (
    <MainCard title="Tránsito">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    20%
                </Typography>
            </Grid>
        </Grid>
    </MainCard>
)

export default CustomerSatisfactionCard
