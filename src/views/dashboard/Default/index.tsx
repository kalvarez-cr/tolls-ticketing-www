import { useEffect, useState } from 'react'

// material-ui
import { Grid } from '@material-ui/core'

// project imports
import TotalRevenueCard from './TotalRevenueCard'
import TransitPerChannelCard from './TransitPerChannelCard'
import ReportCard from './ReportCard'
import PopularCard from './PopularCard'
// import TotalIncomeDarkCard from './TotalIncomeDarkCard'
// import TotalIncomeLightCard from './TotalIncomeLightCard'
import TotalGrowthBarChart from './TotalGrowthBarChart'
import { gridSpacing } from 'store/constant'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            {/* <div className="flex flex-row gap-6 grid-cols-3 mb-4">
                <div className="base-4/9">
                    <TotalRevenueCard isLoading={isLoading} />
                </div>
                <div className="base-4/9">
                    <TransitPerChannelCard isLoading={isLoading} />
                </div>
                <div className="base-1/9">
                    <ReportCard isLoading={isLoading} />
                </div>
            </div> */}
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <TotalRevenueCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <TransitPerChannelCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <ReportCard isLoading={isLoading} />
                        </Grid>
                        {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard
                                        isLoading={isLoading}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            <TotalGrowthBarChart isLoading={isLoading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PopularCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
